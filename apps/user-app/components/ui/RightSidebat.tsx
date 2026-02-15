"use client"
import Image from "next/image";
import Link from "next/link";
import React from "react";
import BankCard from "./BankCard";
import { countTransactionCategories } from "@/lib/utils";
import Category from "./Category";

import { motion } from "framer-motion";


interface RightSidebarProps {
  user: User;
  transactions: Transaction[];
  // banks: Bank[] & Account[];
  banks: Account[];
}

const RightSidebat = ({ user, transactions, banks }: RightSidebarProps) => {
  const categories: CategoryCount[] = countTransactionCategories(transactions);

  return (
    <motion.div
  initial={{ x: 60, opacity: 0 }}
  animate={{ x: 0, opacity: 1 }}
  transition={{
    duration: 0.6,
    ease: [0.16, 1, 0.3, 1],
  }}
>

    <aside className="no-scrollbar hidden h-screen max-h-screen flex-col border-l border-gray-200 xl:flex w-[355px] xl:overflow-y-scroll !important">
      <section className="flex flex-col pb-3">
        <div className="h-[120px] w-full bg-cover bg-no-repeat">
          <Image
            src="/icons/gradient-mesh.svg"
            alt="Gradient Mesh"
            width={400}
            height={300}
          />
        </div>

        <div className="relative flex px-6 max-xl:justify-center">
          <div className="flex-center absolute -top-13 size-24 rounded-full bg-gray-100 border-8 border-white p-2 shadow-profile">
            <span className="text-5xl font-bold text-blue-500 px-3.5">
              {user.firstName[0]}
            </span>
          </div>

          <div className="flex flex-col pt-10">
            <h1 className="text-2xl font-semibold text-gray-900">
              {`${user.firstName} ${user.lastName}`}
            </h1>
            <p className="text-base font-normal text-gray-600">{user.email}</p>
          </div>
        </div>
      </section>

      <section className="flex flex-col justify-between gap-4 px-6">
        <div className="flex w-full justify-between">
          <h2 className="text-18 font-semibold text-gray-900">My Banks</h2>
          <Link href={"/add-money"} className="flex gap-2">
            <Image src="/icons/plus.svg" width={20} height={20} alt="plus" />
            <h2 className="text-base font-semibold text-gray-600">Add Money</h2>
          </Link>
        </div>

        {/* {banks?.length > 0 && (
          <div className="relative flex flex-col items-center justify-center gap-5">
            <div className="relatice z-10">
              {banks[0] && (
                <BankCard
                  key={banks[0].$id}
                  account={banks[0]}
                  userName={`${user.firstName} ${user.lastName}`}
                  showBalance={false}
                />
              )}
            </div>

            {banks[1] && (
              <div className="absolute right-0 top-8 z-0 w-[90%]">
                <BankCard
                  key={banks[1].$id}
                  account={banks[1]}
                  userName={`${user.firstName} ${user.lastName}`}
                  showBalance={false}
                />
              </div>
            )}
          </div>
        )} */}

        {banks?.length > 0 && (
          <div className="relative flex flex-col items-center justify-center gap-5">
            {banks.map((bank, index) => (
              <div
                // key={bank.$id}
                key={bank.appwriteItemId}
                className={
                  index === 0
                    ? "relative z-10"
                    : "absolute right-0 top-8 z-0 w-[90%]"
                }
              >
                <BankCard
                  account={bank}
                  userName={`${user.firstName} ${user.lastName}`}
                  showBalance={false}
                />
              </div>
            ))}
          </div>
        )}

        <div className="mt-10 flex flex-1 flex-col gap-2">
          <h2 className="text-18 font-semibold text-gray-900">Top categories</h2>

          <div className="">
            {categories.map((category, index) => (
              <Category key={category.name} category={category} />
            ))}
          </div>
        </div>
      </section>
    </aside>
    </motion.div>
  );
};

export default RightSidebat;
