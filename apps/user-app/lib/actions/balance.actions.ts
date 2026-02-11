"use server";

import { ID, Query } from "node-appwrite";
import { createAdminClient } from "../appwrite";

const {
  APPWRITE_DATABASE_ID: DATABASE_ID,
  APPWRITE_TRANSACTION_COLLECTION_ID: TRANSACTION_COLLECTION_ID,
} = process.env;

const SYSTEM_BANK_ID = "SYSTEM";

export const getBankBalance = async (bankId: string) => {
  if (!bankId) return 0;

  const { database } = await createAdminClient();

  const txs = await database.listDocuments(
    DATABASE_ID!,
    TRANSACTION_COLLECTION_ID!,
    [
      Query.or([
        Query.equal("senderBankId", bankId),
        Query.equal("receiverBankId", bankId),
      ]),
    ],
  );

  let balance = 0;

  for (const tx of txs.documents) {
    const amount = Number(tx.amount || 0);

    if (tx.type === "credit" && tx.receiverBankId === bankId) {
      balance += amount;
    }

    if (tx.type === "debit" && tx.senderBankId === bankId) {
      balance -= amount;
    }
  }
  // console.log("Calculating balance for:", bankId);
  // console.log("Transactions found:", txs.documents.length);

  return balance;
};

// export const getBankBalance = async (bankId: string) => {
//   if (!bankId) return 0;
//   const { database } = await createAdminClient();

//   const txs = await database.listDocuments(
//     DATABASE_ID!,
//     TRANSACTION_COLLECTION_ID!,
//     [
//       Query.or([
//         Query.equal("senderBankId", bankId),
//         Query.equal("receiverBankId", bankId),
//       ]),
//       Query.equal("status", "success"),
//     ],
//   );

//   let balance = 0;

//   txs.documents.forEach((tx: any) => {
//     const amount = Number(tx.amount);

//     if (tx.type === "credit") balance += amount;
//     if (tx.type === "debit") balance -= amount;
//   });

//   return balance;
// };

export const createOpeningBalance = async ({
  bankId,
  amount,
}: {
  bankId: string;
  amount: number;
}) => {
  const { database } = await createAdminClient();

  // 🔒 1️⃣ Check if opening balance already exists
  const existing = await database.listDocuments(
    process.env.APPWRITE_DATABASE_ID!,
    process.env.APPWRITE_TRANSACTION_COLLECTION_ID!,
    [
      Query.equal("receiverBankId", bankId),
      Query.equal("category", "Opening Balance"),
    ],
  );

  // ⛔ Prevent duplicate opening balance
  if (existing.total > 0) {
    console.log("Opening balance already exists for bank:", bankId);
    return;
  }

  await database.createDocument(
    process.env.APPWRITE_DATABASE_ID!,
    process.env.APPWRITE_TRANSACTION_COLLECTION_ID!,
    ID.unique(),
    {
      // senderBankId: null,
      senderBankId: "SYSTEM",
      receiverBankId: bankId,
      amount: Number(Number(amount).toFixed(2)),
      type: "credit",
      status: "success",
      channel: "system",
      category: "Opening Balance",
    },
  );
};
