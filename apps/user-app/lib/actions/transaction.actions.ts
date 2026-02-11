"use server";

import { ID, Query } from "node-appwrite";
import { createAdminClient } from "../appwrite";
import { parseStringify } from "../utils";

import { createTransfer } from "./dwolla.actions";

import { getUserByEmail, getPrimaryBankByUserId } from "./user.actions";

import { getBanks } from "./user.actions";
const {
  APPWRITE_DATABASE_ID: DATABASE_ID,
  APPWRITE_TRANSACTION_COLLECTION_ID: TRANSACTION_COLLECTION_ID,
} = process.env;

export const createTransaction = async (
  transaction: CreateTransactionProps,
) => {
  try {
    const { database } = await createAdminClient();

    const newTransaction = await database.createDocument(
      DATABASE_ID!,
      TRANSACTION_COLLECTION_ID!,
      ID.unique(),
      {
        channel: "online",
        category: "Transfer",
        ...transaction,
      },
    );

    return parseStringify(newTransaction);
  } catch (error) {
    console.log(error);
  }
};

export const getTransactionsByBankId = async ({
  bankId,
}: getTransactionsByBankIdProps) => {
  try {
    const { database } = await createAdminClient();

    const senderTransactions = await database.listDocuments(
      DATABASE_ID!,
      TRANSACTION_COLLECTION_ID!,
      [Query.equal("senderBankId", bankId)],
    );

    const receiverTransactions = await database.listDocuments(
      DATABASE_ID!,
      TRANSACTION_COLLECTION_ID!,
      [Query.equal("receiverBankId", bankId)],
    );

    const transactions = {
      total: senderTransactions.total + receiverTransactions.total,
      documents: [
        ...senderTransactions.documents,
        ...receiverTransactions.documents,
      ],
    };

    return parseStringify(transactions);
  } catch (error) {
    console.log(error);
  }
};

//i am making new transfer functions

// interface TransferFundsParams {
//   // senderFundingSourceUrl: string;
//   senderBankId:string,
//   receiverEmail: string;
//   amount: string;
// }

// export const transferFunds = async ({
//   // senderFundingSourceUrl,
//   senderBankId,
//   receiverEmail,
//   amount,
// }: TransferFundsParams) => {
//   // 1️⃣ Find receiver
//   const receiver = await getUserByEmail(receiverEmail);
//   if (!receiver) {
//     throw new Error("Receiver not found");
//   }

//   // 2️⃣ Get receiver bank
//   const receiverBank = await getPrimaryBankByUserId(receiver.userId);
//   if (!receiverBank?.fundingSourceUrl) {
//     throw new Error("Receiver has no linked bank");
//   }

//   // 3️⃣ Create Dwolla transfer
//   return await createTransfer({
//     sourceFundingSourceUrl: senderFundingSourceUrl,
//     destinationFundingSourceUrl: receiverBank.fundingSourceUrl,
//     amount,
//   });
// };

import { getBank } from "./user.actions";
import { getBankBalance } from "./balance.actions";

interface TransferFundsParams {
  senderBankId: string;
  receiverEmail: string;
  amount: string;
}

export const transferFunds = async ({
  senderBankId,
  receiverEmail,
  amount,
}: TransferFundsParams) => {
  const numericAmount = Number(amount);

  if (Number.isNaN(numericAmount) || numericAmount <= 0) {
    throw new Error("Invalid transfer amount");
  }

  // 1️⃣ Sender bank
  const senderBank = await getBank({ documentId: senderBankId });
  if (!senderBank?.fundingSourceUrl) {
    throw new Error("Sender bank not found");
  }

  // 2️⃣ Receiver
  const receiver = await getUserByEmail(receiverEmail);
  if (!receiver) {
    throw new Error("Receiver not found");
  }

  // 3️⃣ Receiver banks (robust logic)
  const banks = await getBanks({ userId: receiver.id });

  // console.log("Receiver email:", receiverEmail);
  // console.log("Receiver userId:", receiver.userId);
  // console.log("Banks found:", banks);

  if (!banks || banks.length === 0) {
    throw new Error("Receiver has no banks");
  }

  const receiverBank = banks.find((b: any) => b.isPrimary === true) ?? banks[0];

  if (!receiverBank?.fundingSourceUrl) {
    throw new Error("Receiver has no linked bank");
  }

  console.log("SOURCE:", senderBank.fundingSourceUrl);
  console.log("DEST:", receiverBank.fundingSourceUrl);

  // 1️⃣ Get sender balance
  const senderBalance = await getBankBalance(senderBank.$id);

  // 2️⃣ Prevent overdraft
  if (senderBalance < numericAmount) {
    throw new Error("INSUFFICIENT_BALANCE");
  }

  // 4️⃣ Dwolla transfer
  // return await createTransfer({
  //   sourceFundingSourceUrl: senderBank.fundingSourceUrl,
  //   destinationFundingSourceUrl: receiverBank.fundingSourceUrl,
  //   amount,
  // });
  const transfer = await createTransfer({
    sourceFundingSourceUrl: senderBank.fundingSourceUrl,
    destinationFundingSourceUrl: receiverBank.fundingSourceUrl,
    amount: numericAmount.toFixed(2),
  });

  // 5️⃣ Save transaction in Appwrite
  const { database } = await createAdminClient();

  // Save sender transaction (debit)
  await database.createDocument(
    DATABASE_ID!,
    TRANSACTION_COLLECTION_ID!,
    ID.unique(),
    {
      senderBankId: senderBank.$id,
      receiverBankId: receiverBank.$id,
      amount: numericAmount,
      type: "debit",
      status: "success",
      channel: "Dwolla",
      category: "Transfer",
      dwollaTransferId: transfer,
      // date: new Date(),
    },
  );

  // Save receiver transaction (credit)
  await database.createDocument(
    DATABASE_ID!,
    TRANSACTION_COLLECTION_ID!,
    ID.unique(),
    {
      senderBankId: senderBank.$id,
      receiverBankId: receiverBank.$id,
      amount: numericAmount,
      type: "credit",
      status: "success",
      channel: "Dwolla",
      category: "Transfer",
      dwollaTransferId: transfer,
      // date: new Date(),
    },
  );

  return { success: true };
};

// export const transferFunds = async ({
//   senderBankId,
//   receiverEmail,
//   amount,
// }: TransferFundsParams) => {
//   // 1️⃣ Get sender bank (from DB)
//   const senderBank = await getBank({ documentId: senderBankId });
//   if (!senderBank?.fundingSourceUrl) {
//     throw new Error("Sender bank not found");
//   }

//   // 2️⃣ Get receiver
//   const receiver = await getUserByEmail(receiverEmail);
//   if (!receiver) {
//     throw new Error("Receiver not found");
//   }

//   // 3️⃣ Get receiver bank
//   let receiverBank = await getPrimaryBankByUserId(receiver.userId);

// // fallback if primary missing
// if (!receiverBank) {
//   const banks = await getBanks({ userId: receiver.userId });
//   receiverBank = banks?.[0];
// }

//   if (!receiverBank?.fundingSourceUrl) {
//     throw new Error("Receiver has no linked bank");
//   }

//   console.log("SOURCE:", senderBank.fundingSourceUrl);
//   console.log("DEST:", receiverBank.fundingSourceUrl);

//   // 4️⃣ Create Dwolla transfer
//   return await createTransfer({
//     sourceFundingSourceUrl: senderBank.fundingSourceUrl,
//     destinationFundingSourceUrl: receiverBank.fundingSourceUrl,
//     amount,
//   });
// };


export const handleTransfer = async (payload: TransferFundsParams) => {
  try {
    await transferFunds(payload);
    return { success: true };
  } catch (error: any) {
    return {
      success: false,
      error: error.message,
    };
  }
};



const SYSTEM_BANK_ID = "SYSTEM";

//adding amount
export const depositFunds = async ({
  bankId,
  amount,
}: {
  bankId: string;
  amount: number;
}) => {
  const numericAmount = Number(amount);

  if (numericAmount <= 0) {
    throw new Error("Invalid amount");
  }

  const bank = await getBank({ documentId: bankId });

  if (!bank) {
    throw new Error("Bank not found");
  }

  const { database } = await createAdminClient();

  // Save deposit transaction
  await database.createDocument(
    DATABASE_ID!,
    TRANSACTION_COLLECTION_ID!,
    ID.unique(),
    {
      senderBankId: SYSTEM_BANK_ID,
      receiverBankId: bank.$id,
      amount: numericAmount,
      type: "credit",
      status: "success",
      channel: "System",
      category: "Deposited",
    }
  );

  

  return { success: true };
};
