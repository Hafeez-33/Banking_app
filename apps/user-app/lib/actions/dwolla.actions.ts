"use server";

import { Client } from "dwolla-v2";

const getEnvironment = (): "production" | "sandbox" => {
  const environment = process.env.DWOLLA_ENV as string;

  switch (environment) {
    case "sandbox":
      return "sandbox";
    case "production":
      return "production";
    default:
      // throw new Error(
      //   "Dwolla environment should either be set to `sandbox` or `production`"
      // );
      return "sandbox";
  }
};

const dwollaClient = new Client({
  environment: getEnvironment(),
  key: process.env.DWOLLA_KEY as string,
  secret: process.env.DWOLLA_SECRET as string,
});

// Create a Dwolla Funding Source using a Plaid Processor Token
export const createFundingSource = async (
  options: CreateFundingSourceOptions
) => {
  try {
    return await dwollaClient
      .post(`customers/${options.customerId}/funding-sources`, {
        name: options.fundingSourceName,
        plaidToken: options.plaidToken,
      })
      .then((res) => res.headers.get("location"));
  } catch (err) {
    console.error("Creating a Funding Source Failed: ", err);
  }
};

export const createOnDemandAuthorization = async () => {
  try {
    const onDemandAuthorization = await dwollaClient.post(
      "on-demand-authorizations"
    );
    const authLink = onDemandAuthorization.body._links;
    return authLink;
  } catch (err) {
    console.error("Creating an On Demand Authorization Failed: ", err);
  }
};

// export const createDwollaCustomer = async (
//   newCustomer: NewDwollaCustomerParams
// ) => {
//   try {
//     return await dwollaClient
//       .post("customers", newCustomer)
//       .then((res) => res.headers.get("location"));
//   } catch (err) {
//     console.error("Creating a Dwolla Customer Failed: ", err);
//   }
// };

export const createDwollaCustomer = async (
  newCustomer: NewDwollaCustomerParams
) => {
  try {
    const res = await dwollaClient.post("customers", newCustomer);
    return res.headers.get("location");
  } catch (err: any) {
    const body = err?.body;

    // ✅ HANDLE DUPLICATE CUSTOMER (IMPORTANT)
    if (
      body?.code === "ValidationError" &&
      body?._embedded?.errors?.[0]?.code === "Duplicate"
    ) {
      const existingCustomerUrl =
        body._embedded.errors[0]._links.about.href;

      console.log(
        "Dwolla customer already exists. Reusing:",
        existingCustomerUrl
      );

      return existingCustomerUrl; // 👈 KEY FIX
    }

    console.error("Creating a Dwolla Customer Failed: ", err);
    throw new Error("Dwolla customer creation failed");
  }
};


// export const createTransfer = async ({
//   sourceFundingSourceUrl,
//   destinationFundingSourceUrl,
//   amount,
// }: TransferParams) => {
//   try {
//     const requestBody = {
//       _links: {
//         source: {
//           href: sourceFundingSourceUrl,
//         },
//         destination: {
//           href: destinationFundingSourceUrl,
//         },
//       },
//       amount: {
//         currency: "USD",
//         value: amount,
//       },
//     };
//     return await dwollaClient
//       .post("transfers", requestBody)
//       .then((res) => res.headers.get("location"));
//   } catch (err) {
//     console.error("Transfer fund failed: ", err);
//   }
// };

// export const addFundingSource = async ({
//   dwollaCustomerId,
//   processorToken,
//   bankName,
// }: AddFundingSourceParams) => {
//   try {
//     // create dwolla auth link
//     const dwollaAuthLinks = await createOnDemandAuthorization();

//     // add funding source to the dwolla customer & get the funding source url
//     const fundingSourceOptions = {
//       customerId: dwollaCustomerId,
//       fundingSourceName: bankName,
//       plaidToken: processorToken,
//       _links: dwollaAuthLinks,
//     };
//     return await createFundingSource(fundingSourceOptions);
//   } catch (err) {
//     console.error("Transfer fund failed: ", err);
//   }
// };

export const createTransfer = async ({
  sourceFundingSourceUrl,
  destinationFundingSourceUrl,
  amount,
}: TransferParams) => {
  try {
    return await dwollaClient
      .post("transfers", {
        _links: {
          source: { href: sourceFundingSourceUrl },
          destination: { href: destinationFundingSourceUrl },
        },
        amount: {
          currency: "USD",
          value: amount,
        },
      })
      .then((res) => res.headers.get("location"));
  } catch (err) {
    console.error("Transfer fund failed:", err);
    throw err;
  }
};



export const addFundingSource = async ({
  dwollaCustomerId,
  processorToken,
  bankName,
}: AddFundingSourceParams) => {
  try {
    // 1️⃣ Check existing funding sources
    const existingSources = await getFundingSources(dwollaCustomerId);

    const alreadyExists = existingSources.find(
      (source: any) => source.name === bankName
    );

    if (alreadyExists) {
      console.log("Funding source already exists. Reusing it.");
      return alreadyExists._links.self.href;
    }

    // 2️⃣ Create on-demand authorization
    const dwollaAuthLinks = await createOnDemandAuthorization();

    // 3️⃣ Create new funding source
    const fundingSourceOptions = {
      customerId: dwollaCustomerId,
      fundingSourceName: bankName,
      plaidToken: processorToken,
      _links: dwollaAuthLinks,
    };

    return await createFundingSource(fundingSourceOptions);
  } catch (err) {
    console.error("Adding funding source failed:", err);
    throw err;
  }
};


// i added
export const getFundingSources = async (customerId: string) => {
  try {
    const response = await dwollaClient.get(
      `customers/${customerId}/funding-sources`
    );

    return response.body._embedded["funding-sources"];
  } catch (err) {
    console.error("Fetching funding sources failed:", err);
    return [];
  }
};
