"use server";
import { ID, Query } from "node-appwrite";
import { createAdminClient, createSessionClient } from "../appwrite";
import { cookies } from "next/headers";
import { encryptId, extractCustomerIdFromUrl, parseStringify } from "../utils";
import {
  CountryCode,
  ProcessorTokenCreateRequest,
  ProcessorTokenCreateRequestProcessorEnum,
  Products,
} from "plaid";
import { plaidClient } from "../plaid";
import { revalidatePath } from "next/cache";
import { addFundingSource, createDwollaCustomer } from "./dwolla.actions";
import { createOpeningBalance } from "./balance.actions";
import { getInstitution } from "./bank.actions";

const {
  APPWRITE_DATABASE_ID: DATABASE_ID,
  APPWRITE_USER_COLLECTION_ID: USER_COLLECTION_ID,
  APPWRITE_BANK_COLLECTION_ID: BANK_COLLECTION_ID,
} = process.env;

// declare type SignUpParams = {
//   firstName: string;
//   lastName: string;
//   address: string;
//   //   city: string;
//   //   state: string;
//   //   postalCode: string;
//   dateOfBirth: string;
//   //   ssn: string;
//   email: string;
//   password: string;
// };

interface signInProps {
  email: string;
  password: string;
}
interface getUserInfoProps {
  userId: string;
}

export const getUserInfo = async ({ userId }: getUserInfoProps) => {
  try {
    const { database } = await createAdminClient();

    const user = await database.listDocuments(
      DATABASE_ID!,
      USER_COLLECTION_ID!,
      // [Query.equal("userId", [userId])],
      //i made changes
      [Query.equal("userId", userId)],
    );

    return parseStringify(user.documents[0]);
  } catch (error) {
    console.log(error);
  }
};

export const signIn = async ({ email, password }: signInProps) => {
  try {
    const { account } = await createAdminClient();

    const session = await account.createEmailPasswordSession(email, password);

    (await cookies()).set("appwrite-session", session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });

    const user = await getUserInfo({ userId: session.userId });

    return parseStringify(user);
  } catch (error) {
    console.log("Error", error);
  }
};

export const signUp = async ({ password, ...userData }: SignUpParams) => {
  const { email, firstName, lastName } = userData;

  let newUserAccount;
  try {
    // use appwrite to create user account
    const { account, database } = await createAdminClient();

    newUserAccount = await account.create(
      ID.unique(),
      email,
      password,
      `${firstName} ${lastName}`,
    );

    if (!newUserAccount) throw new Error("Error creating user");

    const dwollaCustomerUrl = await createDwollaCustomer({
      ...userData,
      type: "personal",
      postalCode: String(userData.postalCode).trim(),
    });

    if (!dwollaCustomerUrl) throw new Error("Error creating Dwolla customer");

    const dwollaCustomerId = extractCustomerIdFromUrl(dwollaCustomerUrl);

    const newUser = await database.createDocument(
      DATABASE_ID!,
      USER_COLLECTION_ID!,
      ID.unique(),
      {
        ...userData,
        userId: newUserAccount.$id,
        dwollaCustomerId,
        dwollaCustomerUrl,
      },
    );

    const session = await account.createEmailPasswordSession(email, password);

    (await cookies()).set("appwrite-session", session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });

    return parseStringify(newUser);
  } catch (error) {
    console.log("Error", error);
  }
};

export async function getLoggedInUser() {
  try {
    //i made changes
    const sessionClient = await createSessionClient();
    if (!sessionClient) return null;

    const { account } = sessionClient;
    const result = await account.get();

    const user = await getUserInfo({ userId: result.$id });

    return parseStringify(user);
  } catch (error) {
    console.log(error);
    return null;
  }
}

export const logoutAccount = async () => {
  try {
    const { account } = await createSessionClient();

    (await cookies()).delete("appwrite-session");
    await account.deleteSession("current");
  } catch (error) {
    return null;
  }
};

export const createLinkToken = async (user: User) => {
  try {
    const tokenParams = {
      user: {
        client_user_id: user.$id,
      },
      client_name: `${user.firstName} ${user.lastName}`,
      // products: ["auth"] as Products[],
      //i made changes
      products: ["auth", "transactions"] as Products[],
      language: "en",
      country_codes: ["US"] as CountryCode[],
    };
    const response = await plaidClient.linkTokenCreate(tokenParams);

    return parseStringify({ linkToken: response.data.link_token });
  } catch (error) {
    console.log(error);
  }
};

interface exchangePublicTokenProps {
  publicToken: string;
  user: User;
}
interface createBankAccountProps {
  accessToken: string;
  userId: string;
  accountId: string;
  bankId: string;
  fundingSourceUrl: string;
  shareableId: string;
  isPrimary?: Boolean;
  balance: number;
  //production
  accountData: any,
  institution: any
}

export const createBankAccount = async ({
  userId,
  bankId,
  accountId,
  accessToken,
  fundingSourceUrl,
  shareableId,
  isPrimary,
  accountData,
  institution
}: createBankAccountProps) => {
  try {
    const { database } = await createAdminClient();

    //production
    // const bankAccount = await database.createDocument(
    //   DATABASE_ID!,
    //   BANK_COLLECTION_ID!,
    //   ID.unique(),
    //   {
    //     userId,
    //     bankId,
    //     accountId,
    //     accessToken,
    //     fundingSourceUrl,
    //     shareableId,
    //     //i make changes
    //     isPrimary: isPrimary ?? false,
    //     balance:0
    //   },
    // );

    const bankAccount = await database.createDocument(
      DATABASE_ID!,
      BANK_COLLECTION_ID!,
      ID.unique(),
      {
        userId,
        bankId,
        accountId,
        accessToken,
        fundingSourceUrl,
        shareableId,
        balance: 0,
        name: accountData.name,
        officialName: accountData.official_name,
        mask: accountData.mask,
        type: accountData.type,
        subtype: accountData.subtype,
        institutionName: institution.name,
        isPrimary: isPrimary ?? false,
      },
    );

    return parseStringify(bankAccount);
  } catch (error) {
    console.log(error);
  }
};

export const exchangePublicToken = async ({
  publicToken,
  user,
}: exchangePublicTokenProps) => {
  try {
    // Exchange public token for access token and item ID
    const response = await plaidClient.itemPublicTokenExchange({
      public_token: publicToken,
    });

    const accessToken = response.data.access_token;
    const itemId = response.data.item_id;

    // Get account information from Plaid using the access token
    const accountsResponse = await plaidClient.accountsGet({
      access_token: accessToken,
    });

    const accountData = accountsResponse.data.accounts[0];

    //production
    const institution = await getInstitution({
  institutionId: accountsResponse.data.item.institution_id!,
});


    if (!accountData) {
      throw new Error("No account data found.");
    }

    // Create a processor token for Dwolla using the access token and account ID
    const request: ProcessorTokenCreateRequest = {
      access_token: accessToken,
      account_id: accountData.account_id,
      processor: "dwolla" as ProcessorTokenCreateRequestProcessorEnum,
    };

    const processorTokenResponse =
      await plaidClient.processorTokenCreate(request);
    const processorToken = processorTokenResponse.data.processor_token;

    // Create a funding source URL for the account using the Dwolla customer ID, processor token, and bank name
    const fundingSourceUrl = await addFundingSource({
      dwollaCustomerId: user.dwollaCustomerId,
      processorToken,
      bankName: accountData.name,
    });

    // If the funding source URL is not created, throw an error
    if (!fundingSourceUrl) throw Error;

    // Create a bank account using the user ID, item ID, account ID, access token, funding source URL, and shareableId ID
    // await createBankAccount({
    //   userId: user.$id,
    //   bankId: itemId,
    //   accountId: accountData.account_id,
    //   accessToken,
    //   fundingSourceUrl,
    //   shareableId: encryptId(accountData.account_id),
    //   //i make changes
    //   isPrimary: true,
    // });

    //production
    // Check if user already has banks
    const { database } = await createAdminClient();

    const existingBanks = await database.listDocuments(
      DATABASE_ID!,
      BANK_COLLECTION_ID!,
      [Query.equal("userId", user.$id)],
    );
    const isFirstBank = existingBanks.total === 0;

    // 1️⃣ Create bank account
    const bank = await createBankAccount({
      userId: user.$id,
      bankId: itemId,
      accountId: accountData.account_id,
      accessToken,
      fundingSourceUrl,
      shareableId: encryptId(accountData.account_id),
      isPrimary: true,
      balance: 0,
      accountData,
      institution
    });

    // 2️⃣ CREATE OPENING BALANCE (ONE TIME ONLY)
    // await createOpeningBalance({
    //   bankId: bank.$id,
    //   amount: accountData.balances.current ?? 0,
    // });
    const baseBalance = accountData.balances.current ?? 0;

    // 🎁 Add bonus only if first bank
    const bonus = isFirstBank ? 100 : 0;

    await createOpeningBalance({
      bankId: bank.$id,
      amount: baseBalance + bonus,
    });

    // Revalidate the path to reflect the changes
    revalidatePath("/");

    // Return a success message
    return parseStringify({
      publicTokenExchange: "complete",
    });
  } catch (error) {
    console.error("An error occurred while creating exchanging token:", error);
  }
};

interface getBanksProps {
  userId: string;
}

export const getBanks = async ({ userId }: getBanksProps) => {
  try {
    //i made changes
    // if (!userId) return [];

    const { database } = await createAdminClient();

    const banks = await database.listDocuments(
      DATABASE_ID!,
      BANK_COLLECTION_ID!,
      [Query.equal("userId", userId)],
    );

    return parseStringify(banks.documents);
  } catch (error) {
    console.log(error);
    //i made changes
    return [];
  }
};

interface getBankProps {
  documentId: string;
}

export const getBank = async ({ documentId }: getBankProps) => {
  try {
    // i have made change here in [documentId]
    if (!documentId) {
      throw new Error("Document ID is required");
    }

    const { database } = await createAdminClient();

    const bank = await database.getDocument(
      DATABASE_ID!,
      BANK_COLLECTION_ID!,
      //i made changes
      // [Query.equal("$id", documentId)],
      documentId
      // i have made change here in [documentId]
    );

    //i have made change here
    // if (!bank.documents.length) {
    //   throw new Error("Bank document not found");
    // }

    // return parseStringify(bank.documents[0]);
    return parseStringify(bank);
  } catch (error) {
    console.log(error);
    return null;
  }
};

interface getBankByAccountIdProps {
  accountId: string;
}
export const getBankByAccountId = async ({
  accountId,
}: getBankByAccountIdProps) => {
  try {
    const { database } = await createAdminClient();

    const bank = await database.listDocuments(
      DATABASE_ID!,
      BANK_COLLECTION_ID!,
      [Query.equal("accountId", [accountId])],
    );

    if (bank.total !== 1) return null;

    return parseStringify(bank.documents[0]);
  } catch (error) {
    console.log(error);
  }
};

//i have making changes

export const getUserByEmail = async (email: string) => {
  try {
    const { database } = await createAdminClient();

    const users = await database.listDocuments(
      DATABASE_ID!,
      USER_COLLECTION_ID!,
      [Query.equal("email", email)],
    );

    if (!users.documents.length) return null;

    const user = users.documents[0]!;

    return parseStringify({ ...user, id: user.$id });
    // return parseStringify({
    //   ...user,
    //   authUserId: user.userId, // ✅ EXPLICIT auth user id
    // });
  } catch (error) {
    console.log(error);
    return null;
  }
};

// export const getUserByEmail = async (email: string) => {
//   try {
//     const { database } = await createAdminClient();

//     const users = await database.listDocuments(
//       DATABASE_ID!,
//       USER_COLLECTION_ID!,
//       [Query.equal("email", email)],
//     );

//     if (!users.documents.length) return null;

//     return parseStringify({...users,authUserId:users.userId});
//   } catch (error) {
//     console.log(error);
//     return null;
//   }
// };

export const getPrimaryBankByUserId = async (userId: string) => {
  try {
    const { database } = await createAdminClient();

    const banks = await database.listDocuments(
      DATABASE_ID!,
      BANK_COLLECTION_ID!,
      [Query.equal("userId", userId), Query.equal("isPrimary", true)],
    );

    if (!banks.documents.length) return null;

    return parseStringify(banks.documents[0]);
  } catch (error) {
    console.log(error);
    return null;
  }
};
