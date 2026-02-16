"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import Footer from "./Footer";
import PlaidLink from "./PlaidLink";
import { motion } from "framer-motion";

const container = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const item = {
  hidden: { opacity: 0, x: -15 },
  visible: { opacity: 1, x: 0 },
};


const sidebarLinks = [
  {
    imgURL: "/icons/home.svg",
    route: "/dashboard",
    label: "Home",
  },
  {
    imgURL: "/icons/dollar-circle.svg",
    route: "/my-banks",
    label: "My Banks",
  },
  {
    imgURL: "/icons/transaction.svg",
    route: "/transaction-history",
    label: "Transaction History",
  },
  {
    imgURL: "/icons/money-send.svg",
    route: "/payment-transfer",
    label: "Transfer Funds",
  },
  {
    imgURL: "/icons/add-money.webp",
    route: "/add-money",
    label: "Add Money",
  },
];
const SIdebar = ({ user }: SiderbarProps) => {
  const pathname = usePathname();

  return (
    <motion.section
       initial={{ x: -60, opacity: 0 }}
  animate={{ x: 0, opacity: 1 }}
  transition={{
    duration: 0.6,
    ease: [0.16, 1, 0.3, 1],
  }}
    className="sticky left-0 top-0 flex h-screen w-[300px] flex-col justify-between border-r border-gray-200 bg-white pt-8 text-white max-md:hidden sm:p-4 xl:p-6 2xl:w-[355px]">
      <motion.nav variants={container} initial="hidden" animate="visible"  className="flex flex-col gap-1">
        <Link href="/dashboard" className="mb-8 flex gap-2 cursor-pointer items-center">
          <Image
            src="/icons/logo.svg"
            alt="Logo"
            width={34}
            height={34}
            className="size-[20px] max-xl:size-14"
          />
          <h1 className="2xl:text-26 font-ibm-plex-serif text-[26px] font-bold text-black max-xl:hidden">
            Rupy Bank
          </h1>
        </Link>

        {sidebarLinks.map((items) => {
          const isActive =
            pathname === items.route || pathname.startsWith(`${items.route}/`);

          return (
             <motion.div variants={item} key={items.label}>
            <Link
              className={cn(
                "flex gap-3 items-center py-1 md:p-3 2xl:p-4 rounded-lg justify-center xl:justify-start",
                { "bg-blue-500 items-center": isActive },
              )}
              href={items.route}
              key={items.label}
            >
              <div className="relative size-6">
                <Image
                  src={items.imgURL}
                  alt={items.label}
                  fill
                  className={cn({ "brightness-[3] invert-0": isActive })}
                />
              </div>
              <p
                className={cn(
                  "text-base font-semibold text-black max-xl:hidden",
                  { "!text-white": isActive },
                )}
              >
                {items.label}
              </p>
            </Link>
            </motion.div>
          );
        })}

        <PlaidLink user={user} />
      </motion.nav>

      <Footer user={user} />
    </motion.section>
  );
};

export default SIdebar;
