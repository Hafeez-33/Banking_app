
//production
export const dynamic = "force-dynamic";

import TotalBalanceBox from "@/components/ui/TotalBalanceBox";
import HeaderBox from "@/components/ui/HeaderBox";
import React from "react";
import RightSidebat from "@/components/ui/RightSidebat";
import { getLoggedInUser } from "@/lib/actions/user.actions";
import { getAccount, getAccounts } from "@/lib/actions/bank.actions";
import RecentTransaction from "@/components/ui/RecentTransaction";

import { redirect } from "next/navigation";
// import { getLoggedInUser } from "@/lib/actions/user.actions";
//i make changes
// import { getBankBalance } from "@/lib/actions/balance.actions";

// declare type SearchParamProps = {
//   // params: { [key: string]: string };
//   searchParams: { [key: string]: string | string[] | undefined };
// };

// type BankAccount = {
//   currentBalance: number;
// };


// const Home = async ({ searchParams }:{ searchParams?: {[key:string]: string | string[] | undefined} => {
export default async function Home({
  searchParams
}: any
) {
  const params = searchParams || {};
  const { id, page } = params;
  const currentPage = Number(page as string) || 1;
  const loggedIn = await getLoggedInUser();

  const accounts = await getAccounts({
    userId: loggedIn?.$id,
  });

  //production
  if(!loggedIn){
    redirect("/sign-in");
  }
  if (!accounts) return null;

  const accountsData = accounts?.data;
  // const appwriteItemId = (id as string) = accountsData[0]?.appwriteItemId;
  // const appwriteItemId = accountsData[0]?.appwriteItemId as string;

  // const account = await getAccount({ appwriteItemId });
  
  //i made changes
  const selectedBank =
  accountsData.find(
    (account: { appwriteItemId: string | string[] | undefined; }) => account.appwriteItemId === id
  ) || accountsData[0];

const appwriteItemId = selectedBank?.appwriteItemId as string;

const account = await getAccount({ appwriteItemId });

//production
//i make changes
// const balances = await Promise.all(
//   accountsData.map(async (bank: Account) => ({
//     ...bank,
//     balance: await getBankBalance(bank.appwriteItemId),
//   }))
// );

// const balances = accountsData;
// production
// const balances = accountsData;
// const totalBalance = balances.reduce(
//   (sum:number, bank:any) => sum + (bank.currentBalance ?? 0),
//   0
// );

const totalBalance = accounts?.totalCurrentBalance ?? 0;


  return (
    // <section className="no-scrollbar flex w-full flex-row max-xl:max-h-screen max-xl:overflow-y-scroll">
    <section className="flex w-full">
      <div className="no-scrollbar flex w-full flex-1 flex-col gap-8 px-3 sm:px-8 py-5 lg:py-6 xl:max-h-screen xl:overflow-y-scroll">
        <header className="flex flex-col justify-between gap-2">
          <HeaderBox
            type="greeting"
            title="Welcome"
            user={loggedIn?.firstName || "Guest"}
            subtext="Access your account and manage your transctions efficiently."
          />

          {/* //production */}
          {/* <TotalBalanceBox
            accounts={balances}
            totalBanks={balances.length}
            totalCurrentBalance={totalBalance}
          /> */}
          <TotalBalanceBox
            accounts={accounts.data}
            totalBanks={accounts.totalBanks}
            totalCurrentBalance={totalBalance}
          />
        </header>

        <RecentTransaction
          accounts={accountsData}
          transactions={account?.transactions}
          appwriteItemId={appwriteItemId}
          page={currentPage}
        />
      </div>

      <RightSidebat
        user={loggedIn}
        transactions={account?.transactions}
        banks={accounts.data.slice(0, 2)}
        // banks={balances.slice(0,2)}
      />
    </section>
  );
};

// export default Home;
