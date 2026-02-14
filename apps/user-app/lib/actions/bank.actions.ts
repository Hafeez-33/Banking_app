"use server";

import {
  ACHClass,
  CountryCode,
  TransferAuthorizationCreateRequest,
  TransferCreateRequest,
  TransferNetwork,
  TransferType,
} from "plaid";

import { plaidClient } from "../plaid";
import { parseStringify } from "../utils";

import { getTransactionsByBankId } from "./transaction.actions";
import { getBanks, getBank } from "./user.actions";

import { getBankBalance } from "./balance.actions";

import { unstable_cache } from "next/cache";

// Get multiple bank accounts
// export const getAccounts = async ({ userId }: getAccountsProps) => {
//   try {
//     // get banks from db
//     const banks = await getBanks({ userId });

//     const accounts = await Promise.all(
//       banks
//         ?.map(async (bank: Bank) => {
//           //i made changes
//           if (!bank.accessToken) return null;
//           // get each account info from plaid
//           const accountsResponse = await plaidClient.accountsGet({
//             access_token: bank.accessToken,
//           });
//           const accountData = accountsResponse.data.accounts[0];

//           // get institution info from plaid
//           const institution = await getInstitution({
//             institutionId: accountsResponse.data.item.institution_id!,
//           });

//           if (!accountData) {
//             throw new Error("Account data not found.");
//           }

//           // const balance = await getBankBalance(bank.$id);
//           const balance = bank.balance ?? 0;
//           const account = {
//             id: accountData.account_id,
//             //i make changes
//             // availableBalance: accountData.balances.available!,
//             // currentBalance: accountData.balances.current!,
//             currentBalance: bank.balance,
//             institutionId: institution.institution_id,
//             name: accountData.name,
//             officialName: accountData.official_name,
//             mask: accountData.mask!,
//             type: accountData.type as string,
//             subtype: accountData.subtype! as string,
//             appwriteItemId: bank.$id,
//             // sharaebleId: bank.shareableId,
//             shareableId: bank.shareableId, //i made changes
//           };

//           return account;
//           //i made changes
//         })
//         .filter(Boolean),
//     );

//     const totalBanks = accounts.length;
//     // const totalCurrentBalance = accounts.reduce((total, account) => {
//     //   return total + account.currentBalance;
//     // }, 0);
//     const totalCurrentBalance = accounts.reduce(
//       (total, account) => total + account.currentBalance,
//       0,
//     );

//     return parseStringify({ data: accounts, totalBanks, totalCurrentBalance });
//   } catch (error) {
//     console.error("An error occurred while getting the accounts:", error);
//   }
// };
//production


// export const getAccounts = async ({ userId }: getAccountsProps) => {
//   try {
//     const banks = await getBanks({ userId });

//     if (!banks || banks.length === 0) {
//       return parseStringify({
//         data: [],
//         totalBanks: 0,
//         totalCurrentBalance: 0,
//       });
//     }

//     const accounts = banks.map((bank: Bank) => ({
//       id: bank.accountId,
//       currentBalance: bank.balance ?? 0,
//       institutionId: bank.bankId,
//       name: bank.name,
//       officialName: bank.officialName,
//       mask: bank.mask,
//       type: bank.type,
//       subtype: bank.subtype,
//       appwriteItemId: bank.$id,
//       shareableId: bank.shareableId,
//     }));

//     const totalBanks = accounts.length;

//     const totalCurrentBalance = accounts.reduce(
//       (total:any, account:any) => total + (account.currentBalance ?? 0),
//       0
//     );

//     return parseStringify({
//       data: accounts,
//       totalBanks,
//       totalCurrentBalance,
//     });
//   } catch (error) {
//     console.error("Error getting accounts:", error);
//   }
// };


// Get one bank account
// export const getAccount = async ({ appwriteItemId }: getAccountProps) => {
//   try {
//     console.log("getAccount called with appwriteItemId:", appwriteItemId);
//     // get bank from db
//     const bank = await getBank({ documentId: appwriteItemId });

//     if (!bank || !bank.accessToken) {
//       return parseStringify({
//         data: null,
//         transactions: [],
//       });
//     }

//     // get account info from plaid
//     // const accountsResponse = await plaidClient.accountsGet({
//     //   access_token: bank.accessToken,
//     // });
//     // const accountData = accountsResponse.data.accounts[0];

//     // i have made this change
//     // if (!accountData) {
//     //   throw new Error("Account data not found.");
//     // }

//     // get transfer transactions from appwrite
//     const transferTransactionsData = await getTransactionsByBankId({
//       bankId: bank.$id,
//     });

//     const transferTransactions = transferTransactionsData.documents
//       .filter((tx: Transaction) => {
        
//         if (tx.senderBankId === bank.$id && tx.type === "debit") return true;
//         if (tx.receiverBankId === bank.$id && tx.type === "credit") return true;
//         return false;
//       })
//       .map((tx: Transaction) => {
//         const displayCategory =
//           tx.category === "opening balance"
//             ? "Opening Balance"
//             : tx.type === "debit"
//               ? "Debited"
//               : "Credited";

//         //adding amount
//         let transactionType: "debit" | "credit";
//         if (tx.senderBankId === bank.$id && tx.receiverBankId === bank.$id) {
//           // Deposit case
//           transactionType = "credit";
//         } else if (tx.senderBankId === bank.$id) {
//           transactionType = "debit";
//         } else {
//           transactionType = "credit";
//         }

//         return {
//           id: tx.$id,
//           name: tx.category === "opening balance" ? "Bank" : "Bank Transfer",
//           amount: tx.amount,
//           date: tx.$createdAt,
//           paymentChannel: tx.channel ?? "Internal",
//           // category: tx.category,
//           category: displayCategory,
//           // type: tx.senderBankId === bank.$id ? "debit" : "credit",
//           //adding amount
//           type: transactionType,
//           status: tx.status ?? "success",
//         };
//       });

//     // const transferTransactions = transferTransactionsData.documents.map(
//     //   (transferData: Transaction) => ({
//     //     id: transferData.$id,
//     //     name: transferData.name!,
//     //     amount: transferData.amount!,
//     //     date: transferData.$createdAt,
//     //     paymentChannel: transferData.channel,
//     //     category: transferData.category,
//     //     type: transferData.senderBankId === bank.$id ? "debit" : "credit",
//     //   }),
//     // );

//     // get institution info from plaid
//     // const institution = await getInstitution({
//     //   institutionId: accountsResponse.data.item.institution_id!,
//     // });

//     //i made changes
//     const transactions =
//       (await getTransactions({
//         accessToken: bank.accessToken,
//       })) ?? [];

//     // ⛔ Remove Dwolla / transfer-like transactions from Plaid
//     // const plaidTransactions = transactions.filter(
//     //   (tx: any) => tx.paymentChannel !== "dwolla",
//     // );

//     //   const plaidTransactions = transactions
//     // .filter((tx: any) => tx.paymentChannel !== "dwolla")
//     // .map((tx: any) => ({
//     //   id: tx.id,
//     //   name: tx.name,
//     //   amount: tx.amount,
//     //   date: tx.date,
//     //   paymentChannel: tx.paymentChannel ,
//     //   type: tx.type,
//     //   status: tx.status ?? "success",

//     //   // ✅ VERY IMPORTANT FIX
//     //   category:
//     //     tx.category ??
//     //     tx.personal_finance_category?.primary ??
//     //     "Other",
//     // }));

//     // const plaidTransactions = transactions
//     // .filter((tx: any) => tx.paymentChannel !== "dwolla")
//     // .map((tx: any) => ({
//     //   id: tx.id,
//     //   name: tx.name,
//     //   amount: tx.amount,
//     //   date: tx.date,
//     //   paymentChannel: tx.paymentChannel ?? "Bank",
//     //   type: tx.amount < 0 ? "debit" : "credit",
//     //   status: tx.pending ? "processing" : "success",

//     //   // ⭐⭐⭐ THIS FIXES EVERYTHING
//     //   category:
//     //     tx.personal_finance_category?.primary ||
//     //     tx.category ||
//     //     "Other",
//     // }));

//     // const plaidTransactions = transactions
//     //   .filter((tx: any) => tx.paymentChannel !== "dwolla")
//     //   .map((tx: any) => {
//     //     let derivedCategory = "Other";

//     //     if (tx.paymentChannel === "online") {
//     //       derivedCategory = "Online";
//     //     } else if (tx.paymentChannel === "in store") {
//     //       derivedCategory = "Shopping";
//     //     } else if (tx.paymentChannel === "other") {
//     //       derivedCategory = "Other";
//     //     }

//     //     return {
//     //       id: tx.id,
//     //       name: tx.name,
//     //       amount: tx.amount,
//     //       date: tx.date,
//     //       paymentChannel: tx.paymentChannel ?? "Bank",
//     //       type: tx.amount < 0 ? "debit" : "credit",
//     //       status: tx.pending ? "processing" : "success",
//     //       category: derivedCategory,
//     //     };
//     //   });

//     // const plaidTransactions = transactions
//     //   .filter((tx: any) => tx.paymentChannel !== "dwolla")
//     //   .map((tx: any) => {
//     //     let channel = "Bank";

//     //     if (tx.paymentChannel === "in store") {
//     //       channel = "Card";
//     //     } else if (tx.paymentChannel === "online") {
//     //       channel = "Online";
//     //     } else if (tx.paymentChannel === "other") {
//     //       channel = "Other";
//     //     }

//     //     let derivedCategory = "Other";

//     //     if (tx.personal_finance_category?.primary) {
//     //       derivedCategory = tx.personal_finance_category.primary;
//     //     }

//     //     return {
//     //       id: tx.id,
//     //       name: tx.name,
//     //       amount: tx.amount,
//     //       date: tx.date,
//     //       paymentChannel: channel, // ✅ normalized
//     //       type: tx.amount < 0 ? "debit" : "credit",
//     //       status: tx.pending ? "processing" : "success",
//     //       category: derivedCategory,
//     //     };
//     //   });

//     // if (!accountData) {
//     //   throw new Error("Account data not found.");
//     // }

//     //production
//     // const balance = await getBankBalance(bank.$id);
//     const balance = bank.balance ?? 0;

//     const account = {
//       id: accountData.account_id,
//       //i make changes
//       // availableBalance: accountData.balances.available!,
//       // currentBalance: accountData.balances.current!,
//       currentBalance: balance,
//       institutionId: institution.institution_id,
//       name: accountData.name,
//       officialName: accountData.official_name,
//       mask: accountData.mask!,
//       type: accountData.type as string,
//       subtype: accountData.subtype! as string,
//       appwriteItemId: bank.$id,
//     };

//     //i made changes
//     const safeTransactions = Array.isArray(plaidTransactions)
//       ? plaidTransactions
//       : [];
//     const safeTransfers = Array.isArray(transferTransactions)
//       ? transferTransactions
//       : [];

//     const allTransactions = [...safeTransactions, ...safeTransfers].sort(
//       (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
//     );

//     return parseStringify({
//       data: account,
//       transactions: allTransactions,
//     });
//   } catch (error) {
//     console.error("An error occurred while getting the account:", error);
//   }
// };

//production


export const getAccounts = unstable_cache(
  async ({ userId }: getAccountsProps) => {
    try {
      const banks = await getBanks({ userId });

      if (!banks || banks.length === 0) {
        return parseStringify({
          data: [],
          totalBanks: 0,
          totalCurrentBalance: 0,
        });
      }

      const accounts = banks.map((bank: Bank) => ({
        id: bank.accountId,
        name: bank.name ?? "Bank Account",
        officialName: bank.officialName ?? "Checking Account",
        mask: bank.mask ?? "0000",
        currentBalance: bank.balance ?? 0,
        appwriteItemId: bank.$id,
        shareableId: bank.shareableId,
      }));

      const totalCurrentBalance = accounts.reduce(
        (total:any, account:any) => total + (account.currentBalance ?? 0),
        0
      );

      return parseStringify({
        data: accounts,
        totalBanks: accounts.length,
        totalCurrentBalance,
      });

    } catch (error) {
      console.error("Error in getAccounts:", error);
    }
  },
  ["accounts"],   // cache key
  {
    revalidate: 60,   // cache for 60 seconds
  }
);


export const getAccount = async ({ appwriteItemId }: getAccountProps) => {
  try {
    console.log("getAccount called with:", appwriteItemId);

    const bank = await getBank({ documentId: appwriteItemId });

    if (!bank) {
      return parseStringify({
        data: null,
        transactions: [],
      });
    }

    // ✅ Get transfer transactions (Appwrite only)
    const transferTransactionsData = await getTransactionsByBankId({
      bankId: bank.$id,
    });

    const transferTransactions = transferTransactionsData.documents
      .filter((tx: Transaction) => {
        if (tx.senderBankId === bank.$id && tx.type === "debit") return true;
        if (tx.receiverBankId === bank.$id && tx.type === "credit") return true;
        return false;
      })
      .map((tx: Transaction) => {
        const displayCategory =
          tx.category === "opening balance"
            ? "Opening Balance"
            : tx.type === "debit"
            ? "Debited"
            : "Credited";
        //adding amount
        let transactionType: "debit" | "credit";
        if (tx.senderBankId === bank.$id && tx.receiverBankId === bank.$id) {
          // Deposit case
          transactionType = "credit";
        } else if (tx.senderBankId === bank.$id) {
          transactionType = "debit";
        } else {
          transactionType = "credit";
        }
        return {
          id: tx.$id,
          name: tx.category === "opening balance" ? "Bank" : "Bank Transfer",
          amount: tx.amount,
          date: tx.$createdAt,
          paymentChannel: tx.channel ?? "Internal",
          category: displayCategory,
          // type: tx.type,
          type:transactionType,
          status: tx.status ?? "success",
        };
      });

    // ❌ REMOVE PLAID COMPLETELY FOR HOME
    // (we can re-add later only for transaction history page if needed)

    const account = {
      id: bank.accountId,
      currentBalance: bank.balance ?? 0,
      institutionId: bank.bankId,
      name: bank.name,
      officialName: bank.officialName,
      mask: bank.mask,
      type: bank.type,
      subtype: bank.subtype,
      appwriteItemId: bank.$id,
    };

    const allTransactions = transferTransactions.sort(
      (a:any, b:any) =>
        new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    return parseStringify({
      data: account,
      transactions: allTransactions,
    });

  } catch (error) {
    console.error("Error in getAccount:", error);
  }
};


// Get bank info
export const getInstitution = async ({
  institutionId,
}: getInstitutionProps) => {
  try {
    const institutionResponse = await plaidClient.institutionsGetById({
      institution_id: institutionId,
      country_codes: ["US"] as CountryCode[],
    });

    const intitution = institutionResponse.data.institution;

    return parseStringify(intitution);
  } catch (error) {
    console.error("An error occurred while getting the accounts:", error);
  }
};

// Get transactions
// export const getTransactions = async ({
//   accessToken,
// }: getTransactionsProps) => {
//   let hasMore = true;
//   let transactions: any = [];
//   // i have made this change
//   // let cursor: string | null = null;

//   try {
//     // Iterate through each page of new transaction updates for item
//     while (hasMore) {
//       const response = await plaidClient.transactionsSync({
//         access_token: accessToken,
//         // i have made this change
//         // cursor: cursor || undefined,
//       });

//       const data = response.data;

//       transactions = response.data.added.map((transaction) => ({
//         id: transaction.transaction_id,
//         name: transaction.name,
//         paymentChannel: transaction.payment_channel,
//         type: transaction.payment_channel,
//         accountId: transaction.account_id,
//         amount: transaction.amount,
//         pending: transaction.pending,
//         category: transaction.category ? transaction.category[0] : "",
//         date: transaction.date,
//         image: transaction.logo_url,
//       }));

//       // i have made this change
//       // transactions = [...transactions,...data.added];
//       // cursor = data.next_cursor || null;

//       // i have made this change
//       hasMore = data.has_more;
//     }

//     return parseStringify(transactions);
//   } catch (error) {
//     console.error("An error occurred while getting the accounts:", error);
//     // i have made this change
//     // return parseStringify([]);
//   }
// };

export const getTransactions = async ({
  accessToken,
}: getTransactionsProps) => {
  if (!accessToken) return [];

  let hasMore = true;
  let cursor: string | null = null;
  let allTransactions: any[] = [];

  try {
    while (hasMore) {
      const request: any = { access_token: accessToken };
      if (cursor) request.cursor = cursor;

      const response = await plaidClient.transactionsSync(request);
      const data = response.data;

      const added = data.added.map((transaction) => ({
        id: transaction.transaction_id,
        name: transaction.name,
        paymentChannel: transaction.payment_channel,
        type: transaction.payment_channel,
        accountId: transaction.account_id,
        amount: transaction.amount,
        pending: transaction.pending,
        category: transaction.category ? transaction.category[0] : "",
        date: transaction.date,
        image: transaction.logo_url,
      }));

      allTransactions.push(...added);

      cursor = data.next_cursor;
      hasMore = data.has_more;
    }

    return parseStringify(allTransactions);
  } catch (error) {
    console.error("Transactions sync failed:", error);
    return [];
  }
};
