"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const sidebarLinks = [
  {
    imgURL: "/icons/home.svg",
    route: "/",
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
];
const SIdebar = ({ user }: SiderbarProps) => {
  const pathname = usePathname();

  return (
    <section className="sticky left-0 top-0 flex h-screen w-[300] flex-col justify-between border-r border-gray-200 bg-white pt-8 text-white max-md:hidden sm:p-4 xl:p-6 2xl:w-[355px]">
      <nav className="flex flex-col gap-1">
        <Link href={"/"} className="mb-8 flex gap-2 cursor-pointer items-center">
          <Image
            src="/icons/logo.svg"
            alt="Logo"
            width={34}
            height={34}
            className="size-[20px] max-xl:size-14"
          />
          <h1 className="2xl:text-26 font-ibm-plex-serif text-[26px] font-bold text-black max-xl:hidden">
            Horizon
          </h1>
        </Link>

        {sidebarLinks.map((items) => {
          const isActive =
            pathname === items.route || pathname.startsWith(`${items.route}/`);

          return (
            <Link
              className={cn(
                "flex gap-3 items-center py-1 md:p-3 2xl:p-4 rounded-lg justify-center xl:justify-start",
                { "bg-blue-500 items-center": isActive }
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
                  { "!text-white": isActive }
                )}
              >
                {items.label}
              </p>
            </Link>
          );
        })}
        
      </nav>
    </section>
  );
};

export default SIdebar;
