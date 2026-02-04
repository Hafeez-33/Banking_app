import TotalBalanceBox from "@/components/ui/TotalBalanceBox";
import HeaderBox from "@/components/ui/HeaderBox";
import React from "react";
import RightSidebat from "@/components/ui/RightSidebat";
import { getLoggedInUser } from "@/lib/actions/user.actions";
import { getAccount, getAccounts } from "@/lib/actions/bank.actions";
import RecentTransaction from "@/components/ui/RecentTransaction";

declare type SearchParamProps = {
  params: { [key: string]: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

const Home = async({searchParams}:SearchParamProps) => {
  const params = await searchParams;
  const {id,page} = params;  
  const currentPage = Number(page as string) || 1;
  const loggedIn = await getLoggedInUser(); 
  const accounts =await getAccounts({
    userId: loggedIn?.$id
  })

  if(!accounts) return null;

  const accountsData = accounts?.data;
  // const appwriteItemId = (id as string) = accountsData[0]?.appwriteItemId;
  const appwriteItemId = accountsData[0]?.appwriteItemId as string
  
  const account = await getAccount({appwriteItemId});
  return (
    <section className="no-scrollbar flex w-full flex-row max-xl:max-h-screen max-xl:overflow-y-scroll">
      <div className="no-scrollbar flex w-full flex-1 flex-col gap-8 px-3 sm:px-8 py-5 lg:py-6 xl:max-h-screen xl:overflow-y-scroll">
        <header className="flex flex-col justify-between gap-2">
          <HeaderBox
            type="greeting"
            title="welcome"
            user={loggedIn?.firstName || "Guest"}
            subtext="Access your account and manage your transctions efficiently."
          />

          <TotalBalanceBox
            accounts={accountsData}
            totalBanks={accounts?.totalBanks}
            totalCurrentBalance={accounts?.totalCurrentBalance}
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
        banks={accountsData?.slice(0, 2)}
      />
    </section>
  );
};

export default Home;
