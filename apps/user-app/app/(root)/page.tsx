import TotalBalanceBox from "@/components/ui/TotalBalanceBox";
import HeaderBox from "@/components/ui/HeaderBox";
import React from "react";
import RightSidebat from "@/components/ui/RightSidebat";

const Home = () => {
  const loggedIn = {
    firstName: "Adrian",
    lastName: "Smith",
    email: "mabdulhafeez.fa@gmail.com",
  }; // Example user data
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
            accounts={[]}
            totalBanks={1}
            totalCurrentBalance={1250.34}
          />
        </header>
        RecentTransction
      </div>

      <RightSidebat
        user={loggedIn}
        transactions={[]}
        banks={[{ currentBalance: 250.33 }, { currentBalance: 143.44 }]}
      />
    </section>
  );
};

export default Home;
