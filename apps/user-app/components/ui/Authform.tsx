"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import CustomizidInput from "./CustomizidInput";
import { authformSchema } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { getLoggedInUser, signIn, signUp } from "@/lib/actions/user.actions";
import PlaidLink from "./PlaidLink";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      // ease: "easeInOut",
      ease: [0.16, 1, 0.3, 1], // premium easing
    },
  },
};

const Authform = ({ type }: { type: string }) => {
  // State to manage user and loading status
  const [user, setUser] = useState(null);
  const [isloading, setIsLoading] = useState(false);
  const router = useRouter();

  const formschema = authformSchema(type);

  // 1. Define your form.
  const form = useForm<z.infer<typeof formschema>>({
    resolver: zodResolver(formschema),
    defaultValues: {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      address1: "",
      dateOfBirth: "",
    },
  });

  // 2. Define a submit handler.
  const onSubmit = async (data: z.infer<typeof formschema>) => {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    setIsLoading(true);

    try {
      // sign up with appwrite and create plaid link token for bank acoounts
      if (type === "sign-up") {
        const userData = {
          firstName: data.firstName!,
          lastName: data.lastName!,
          address1: data.address1!,
          city: data.city!,
          state: data.state!,
          postalCode: data.postalCode!,
          ssn: data.ssn!,
          dateOfBirth: data.dateOfBirth!,
          email: data.email,
          password: data.password,
        };
        const newUser = await signUp(userData);

        setUser(newUser);
      }

      //appwrite auth for sign-in
      if (type === "sign-in") {
        const response = await signIn({
          email: data.email,
          password: data.password,
        });
        if (response) {
          // router.push("/");
          router.push("/dashboard");
        }
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.section
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="flex min-h-screen w-full max-w-[420px] flex-col justify-center gap-5 py-4 md:gap-8"
    >
      <motion.header
        variants={itemVariants}
        className="flex flex-col gap-5 md:gap-6"
      >
        <Link href={"/"} className=" flex gap-2 cursor-pointer items-center">
          <Image
            src="/icons/logo.svg"
            alt="Horizon logo"
            width={34}
            height={34}
          />
          <h1 className="text-2xl font-ibm-plex-serif font-bold text-black">
            Rupy Bank
          </h1>
        </Link>

        <div className="flex flex-col gap-1 px-2 md:gap-3 ">
          <h1 className="text-lg lg:text-2xl font-semibold text-blue-500">
            {user ? "Link Account" : type === "sign-in" ? "Sign In" : "Sign Up"}
            <p className="text-base font-normal text-gray-600">
              {user
                ? "Link your account to get started"
                : "Please enter your details"}
            </p>
          </h1>
        </div>
      </motion.header>

      {user ? (
        <div className="flex flex-col gap-3">
          <PlaidLink user={user} variant="primary" />
        </div>
      ) : (
        <>
          <Form {...form}>
            <motion.form
              variants={containerVariants}
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-1"
            >
              {type === "sign-up" && (
                <>
                  <motion.div variants={itemVariants} className="flex gap-4">
                    <CustomizidInput
                      control={form.control}
                      name="firstName"
                      placeholder="Enter your first name"
                      label="First Name"
                    />

                    <CustomizidInput
                      control={form.control}
                      name="lastName"
                      placeholder="Enter your last name"
                      label="Last Name"
                    />
                  </motion.div>

                  <motion.div variants={itemVariants}>
                  <CustomizidInput
                    control={form.control}
                    name="address1"
                    placeholder="Enter your specific address"
                    label="Address"
                  />

                  <CustomizidInput
                    control={form.control}
                    name="city"
                    label="City"
                    placeholder="Enter your city"
                  />
                  </motion.div>

                  <motion.div variants={itemVariants} className="flex gap-4">
                    <CustomizidInput
                      control={form.control}
                      name="state"
                      label="State"
                      placeholder="Example: NY"
                    />
                    <CustomizidInput
                      control={form.control}
                      name="postalCode"
                      label="Postal Code"
                      placeholder="Example: 11101"
                    />
                  </motion.div>
                  <motion.div variants={itemVariants} className="flex gap-4">
                    <CustomizidInput
                      control={form.control}
                      name="ssn"
                      label="SSN"
                      placeholder="Example: 1234"
                    />
                    <CustomizidInput
                      control={form.control}
                      name="dateOfBirth"
                      placeholder="YYYY-MM-DD"
                      label="Date of Birth"
                    />
                  </motion.div>
                </>
              )}

              <motion.div variants={itemVariants}>

              
              <CustomizidInput
                control={form.control}
                name="email"
                placeholder="Enter your email"
                label="Email"
              />

              <CustomizidInput
                control={form.control}
                name="password"
                placeholder="Enter your password"
                label="Password"
              />
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="flex flex-col gap-4"
              >
                {/* <motion.div
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.96 }}
                  transition={{ type: "spring", stiffness: 300 }}
                > */}
                  <Button
                    type="submit"
                    disabled={isloading}
                    className="text-white bg-blue-500 text-base rounded-lg shadow-form cursor-pointer"
                  >
                    {isloading ? (
                      <>
                        <Loader2 size={20} className="animate-spin" /> &nbsp;
                        Loading...
                      </>
                    ) : type === "sign-in" ? (
                      "Sign In"
                    ) : (
                      "Sign Up"
                    )}
                  </Button>
                </motion.div>
              {/* </motion.div> */}
            </motion.form>
          </Form>

          <motion.footer variants={itemVariants} className="flex justify-center gap-1">
            <p className="text-base font-normal text-gray-600 ">
              {type === "sign-in"
                ? "Don't have an account?"
                : "Already have an account?"}
            </p>
            <Link
              href={type === "sign-in" ? "/sign-up" : "/sign-in"}
              className="text-base cursor-pointer font-medium text-blue-500 hover:underline"
            >
              {type === "sign-in" ? "Sign-Up" : "Sign In"}
            </Link>
          </motion.footer>
        </>
      )}
    </motion.section>
  );
};

export default Authform;
