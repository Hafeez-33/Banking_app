import React from "react";
import { formatAmount } from "@/lib/utils";
import AnimatedCounter from "./AnimatedCounter";
import DoughnutChart from "./DoughnutChart";

interface TotlaBalanceBoxProps {
  accounts: Account[];
  totalBanks: number;
  totalCurrentBalance: number;
}
const TotalBalanceBox = ({
  accounts = [],
  totalBanks,
  totalCurrentBalance,
}: TotlaBalanceBoxProps) => {
  return (
    <section className="flex w-full items-center gap-4 rounded-xl border border-blue-200 p-2 shadow-chart sm:gap-6 sm:p-6">
      <div className="flex size-full max-w-[100px] items-center sm:max-w-[110px]">
        <DoughnutChart accounts={accounts}/>
      </div>

      <div className="flex flex-col gap-3">
        <h2 className="">Bank Accounts: {totalBanks} </h2>

        <div className="flex flex-col gap-2">
          <p className="text-14 font-medium text-gray-600">
            Total Current Balance{" "}
          </p>
          <div className="text-sm lg:text-lg flex-1 font-semibold text-gray-900">
            <AnimatedCounter amount={totalCurrentBalance} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default TotalBalanceBox;
