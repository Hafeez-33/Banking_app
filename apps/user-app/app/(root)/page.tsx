import TotalBalanceBox from "@/components/ui/TotalBalanceBox";
import HeaderBox from "@/components/ui/HeaderBox";
import React from "react";
import RightSidebat from "@/components/ui/RightSidebat";
import { getLoggedInUser } from "@/lib/actions/user.actions";
import { getAccount, getAccounts } from "@/lib/actions/bank.actions";
import RecentTransaction from "@/components/ui/RecentTransaction";

//i make changes
// import { getBankBalance } from "@/lib/actions/balance.actions";

declare type SearchParamProps = {
  params: { [key: string]: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

type BankAccount = {
  currentBalance: number;
};


const Home = async ({ searchParams }: SearchParamProps) => {
  const params = await searchParams;
  const { id, page } = params;
  const currentPage = Number(page as string) || 1;
  const loggedIn = await getLoggedInUser();

  const accounts = await getAccounts({
    userId: loggedIn?.$id,
  });

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
const balances:BankAccount[] = accountsData;
const totalBalance = balances.reduce(
  (sum:number, bank) => sum + (bank.currentBalance ?? 0),
  0
);



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

          <TotalBalanceBox
            accounts={balances}
            totalBanks={balances.length}
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
        // banks={accountsData?.slice(0, 2)}
        banks={balances.slice(0,2)}
      />
    </section>
  );
};

export default Home;


// return(
//   <section className="flex gap-8">

//   {/* MAIN CENTER */}
//   <div className="flex-1 space-y-6">

//     <HeaderBox
//       type="greeting"
//       title="Welcome"
//       user={loggedIn?.firstName || "Guest"}
//       subtext="Access and manage your account and transactions efficiently."
//     />

//     <TotalBalanceBox
//       accounts={balances}
//       totalBanks={balances.length}
//       totalCurrentBalance={totalBalance}
//     />

//     <RecentTransaction
//       accounts={accountsData}
//       transactions={account?.transactions}
//       appwriteItemId={appwriteItemId}
//       page={currentPage}
//     />
//   </div>

//   {/* RIGHT PANEL */}
//   <div className="hidden xl:block w-[350px] flex-shrink-0">
//     <RightSidebat
//       user={loggedIn}
//       transactions={account?.transactions}
//       banks={balances.slice(0, 2)}
//     />
//   </div>

// </section>
// )