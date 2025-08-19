"use server";

import { ID } from "node-appwrite";
import { createAdminClient, createSessionClient } from "../appwrite";
import { cookies } from "next/headers";
import { parseStringify } from "../utils";

declare type SignUpParams = {
  firstName?: string;
  lastName?: string;
  address?: string;
  //   city: string;
  //   state: string;
  //   postalCode: string;
  dateOfBirth?: string;
  //   ssn: string;
  email: string;
  password: string;
};

interface signInProps {
  email: string;
  password: string;
}

export const signIn = async ({ email, password }: signInProps) => {
  try {
    const { account } = await createAdminClient();
    const response = await account.createEmailPasswordSession(email, password);

    return parseStringify(response);
  } catch (error) {
    console.log("Error", error);
  }
};

export const signUp = async (userData: SignUpParams) => {
  const { email, firstName, lastName, password } = userData;
  try {
    // use appwrite to create user account
    const { account, database } = await createAdminClient();
    let newUserAccount = await account.create(
      ID.unique(),
      email,
      password,
      `${firstName} ${lastName}`
    );

    // if (!newUserAccount) throw new Error("Error creating user");

    // const dwollaCustomerUrl = await createDwollaCustomer({
    //   ...userData,
    //   type: "personal",
    // });

    // if (!dwollaCustomerUrl) throw new Error("Error creating Dwolla customer");

    // const dwollaCustomerId = extractCustomerIdFromUrl(dwollaCustomerUrl);

    // const newUser = await database.createDocument(
    //   DATABASE_ID!,
    //   USER_COLLECTION_ID!,
    //   ID.unique(),
    //   {
    //     ...userData,
    //     userId: newUserAccount.$id,
    //     dwollaCustomerId,
    //     dwollaCustomerUrl,
    //   }
    // );

    const session = await account.createEmailPasswordSession(email, password);

    (await cookies()).set("appwrite-session", session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });

    return parseStringify(newUserAccount);
  } catch (error) {
    console.log("Error", error);
  }
};

export async function getLoggedInUser() {
  try {
    const { account } = await createSessionClient();
    const user = await account.get();

    // const user = await getUserInfo({ userId: result.$id})

    return parseStringify(user);
  } catch (error) {
    console.log(error);
    return null;
  }
}

export const logoutAccount = async () => {
  try {
    const { account } = await createSessionClient();

    (await cookies()).delete("appwrite-session");
    await account.deleteSession("current");
  } catch (error) {
    return null;
  }
};
