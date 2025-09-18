import { logoutAccount } from "@/lib/actions/user.actions";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

interface FooterProps {
  user: User;
  type?: "mobile" | "desktop";
}
const Footer = ({ user, type = "desktop" }: FooterProps) => {
  const router = useRouter();

  const handleLogout = async () => {
    const loggedOut = await logoutAccount();

    if (loggedOut) router.push("/sign-in");
  };

  return (
    <footer className="flex cursor-pointer items-center justify-between gap-2 py-6">
      <div
        className={
          type === "mobile"
            ? "flex size-10 items-center justify-center rounded-full bg-gray-200"
            : "flex size-base items-center justify-center rounded-full bg-gray-200 max-xl:hidden"
        }
      >
        <p className="text-xl font-bold text-gray-700">{user?.firstName[0]}</p>
      </div>

      <div
        className={
          type === "mobile"
            ? "flex flex-1 flex-col justify-center"
            : "flex flex-1 flex-col justify-center max-xl:hidden"
        }
      >
        <h1 className="text-base truncate text-gray-800 font-semibold">
          {user?.firstName}
        </h1>
        <p className="text-base truncate font-normal text-gray-600">
          {user?.email}
        </p>
      </div>

      <div
        onClick={handleLogout}
        className="relative size-5 max-xl:w-full max-xl:flex max-xl:justify-center max-xl:items-center"
      >
        <Image src="icons/logout.svg" alt="jsm" width={20} height={20}/>
      </div>
    </footer>
  );
};

export default Footer;
