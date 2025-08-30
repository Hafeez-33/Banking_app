import React, { useCallback, useEffect, useState } from "react";
import { Button } from "./button";
import { useRouter } from "next/navigation";
import { PlaidLinkOnSuccess, PlaidLinkOptions, usePlaidLink } from 'react-plaid-link'
import { createLinkToken, exchangePublicToken } from "@/lib/actions/user.actions";

declare interface PlaidLinkProps {
  user: User;
  variant?: "primary" | "ghost";
  dwollaCustomerId?: string;
}
const PlaidLink = ({ user, variant }: PlaidLinkProps) => {
    const router = useRouter();
    const [token, setToken] = useState('')

    useEffect(()=>{
        const getLinkToken = async() =>{
            const data = await createLinkToken(user)

            setToken(data?.linkToken)
        }
        getLinkToken();
    },[user])
    
    const onSuccess = useCallback<PlaidLinkOnSuccess>(async (public_token: string) => {
    await exchangePublicToken({
      publicToken: public_token,
      user,
    })

    router.push('/');
  }, [user])
    
    const config : PlaidLinkOptions = {
        token,
        onSuccess
    }

    const { open, ready } = usePlaidLink(config);
 
 
    return (
    <>
      {variant === "primary" ? (
        <Button onClick={()=>open()} 
        disabled={!ready}
        className="text-base rounded-lg border border-white-100 bg-blue-500 font-semibold text-white shadow-form">
          Connect Bank
        </Button>
      ) : variant === "ghost" ? (
        <Button>connect bank</Button>
      ) : (
        <Button>Connect Bank</Button>
      )}
    </>
  );
};

export default PlaidLink;
