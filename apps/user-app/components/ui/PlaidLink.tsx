import React, { useCallback, useEffect, useState } from "react";
import { Button } from "./button";
import { useRouter } from "next/navigation";
import {
  PlaidLinkOnSuccess,
  PlaidLinkOptions,
  usePlaidLink,
} from "react-plaid-link";
import {
  createLinkToken,
  exchangePublicToken,
} from "@/lib/actions/user.actions";
import Image from "next/image";

declare interface PlaidLinkProps {
  user: User;
  variant?: "primary" | "ghost";
  dwollaCustomerId?: string;
}
const PlaidLink = ({ user, variant }: PlaidLinkProps) => {
  const router = useRouter();
  const [token, setToken] = useState("");

  useEffect(() => {
    const getLinkToken = async () => {
      const data = await createLinkToken(user);

      setToken(data?.linkToken);
    };
    getLinkToken();
  }, [user]);

  const onSuccess = useCallback<PlaidLinkOnSuccess>(
    async (public_token: string) => {
      await exchangePublicToken({
        publicToken: public_token,
        user,
      });

      router.push("/");
    },
    [user]
  );

  const config: PlaidLinkOptions = {
    token,
    onSuccess,
  };

  const { open, ready } = usePlaidLink(config);

  return (
    <>
      {variant === "primary" ? (
        <Button
          onClick={() => open()}
          disabled={!ready}
          className="text-base rounded-lg border border-white-100 bg-blue-500 font-semibold text-white shadow-form"
        >
          Connect Bank
        </Button>
      ) : variant === "ghost" ? (
        <Button
          variant="ghost"
          onClick={() => open()}
          className="flex cursor-pointer items-center justify-center gap-3 rounded-lg px-3 py-7 hover:bg-white lg:justify-start"
        >
          <Image
            src="/icons/connect-bank.svg"
            alt="connect-bank"
            height={24}
            width={24}
          />
          <p className="hidden text-base font-semibold text-black xl:block">Connect Bank</p>
        </Button>
      ) : (
        <Button
          onClick={() => open()}
          className="flex !justify-start cursor-pointer gap-3 rounded-lg !bg-transparent flex-row"
        >
          <Image
            src="/icons/connect-bank.svg"
            alt="connect-bank"
            height={24}
            width={24}
          />
          <p className="text-base font-semibold text-black">Connect Bank</p>
        </Button>
      )}
    </>
  );
};

export default PlaidLink;
