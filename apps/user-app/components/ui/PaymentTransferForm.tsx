"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

// import { createTransfer } from "@/lib/actions/dwolla.actions";
import { createTransaction } from "@/lib/actions/transaction.actions";
// import { getBank, getBankByAccountId } from "@/lib/actions/user.actions";
// import { decryptId } from "@/lib/utils";

//i make changes
import { transferFunds } from "@/lib/actions/transaction.actions";

import { BankDropdown } from "./BankDropdown";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { useEffect } from "react";

const formSchema = z.object({
  email: z.string().email("Invalid email address"),
  name: z.string().min(4, "Transfer note is too short"),
  amount: z.string().min(4, "Amount is too short"),
  senderBank: z.string().min(4, "Please select a valid bank account"),
  // shareableId: z.string().min(8, "Please select a valid sharable Id"),
});

const PaymentTransferForm = ({ accounts }: PaymentTransferFormProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  //showing error in Ui
  const [error, setError] = useState<string | null>(null);
  // const [loading, setLoading] = useState(false);

  //production
  const [availableBalance, setAvailableBalance] = useState<number>(0);
  const [insufficient, setInsufficient] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      amount: "",
      senderBank: "",
      // shareableId: "",
    },
  });

  //production
  useEffect(() => {
    const selected = accounts.find(
      (bank: any) => bank.appwriteItemId === form.watch("senderBank"),
    );

    if (selected) {
      setAvailableBalance(selected.currentBalance ?? 0);
    }
  }, [form.watch("senderBank"), accounts]);

  // const submit = async (data: z.infer<typeof formSchema>) => {
  //   setIsLoading(true);

  //   try {
  //     // const receiverAccountId = decryptId(data.shareableId);
  //     // const receiverBank = await getBankByAccountId({
  //     //   accountId: receiverAccountId,
  //     // });
  //     // const senderBank = await getBank({ documentId: data.senderBank });

  //     // const transferParams = {
  //     //   sourceFundingSourceUrl: senderBank.fundingSourceUrl,
  //     //   destinationFundingSourceUrl: receiverBank.fundingSourceUrl,
  //     //   amount: data.amount,
  //     // };
  //     // // create transfer
  //     // const transfer = await createTransfer(transferParams);

  //     //i make changes
  //     const senderBank = accounts.find(
  //       (bank) => bank.appwriteItemId === data.senderBank,
  //     );

  //     if (!senderBank?.fundingSourceUrl) {
  //       throw new Error("Sender bank not found");
  //     }

  //     await transferFunds({
  //       senderFundingSourceUrl: senderBank.fundingSourceUrl,
  //       receiverEmail: data.email,
  //       amount: data.amount,
  //     });

  //     // create transfer transaction
  //     if (transfer) {
  //       const transaction = {
  //         name: data.name,
  //         amount: data.amount,
  //         senderId: senderBank.userId.$id,
  //         senderBankId: senderBank.$id,
  //         receiverId: receiverBank.userId.$id,
  //         receiverBankId: receiverBank.$id,
  //         email: data.email,
  //       };

  //       const newTransaction = await createTransaction(transaction);

  //       if (newTransaction) {
  //         form.reset();
  //         router.push("/");
  //       }
  //     }
  //   } catch (error) {
  //     console.error("Submitting create transfer request failed: ", error);
  //   }

  //   setIsLoading(false);
  // };

  // const submit = async (data: z.infer<typeof formSchema>) => {
  //   setIsLoading(true);

  //   try {
  //     const senderBank = accounts.find(
  //       (bank) => bank.appwriteItemId === data.senderBank,
  //     );

  //     if (!senderBank?.fundingSourceUrl) {
  //       throw new Error("Sender bank not found");
  //     }

  //     await transferFunds({
  //       senderFundingSourceUrl: senderBank.fundingSourceUrl,
  //       receiverEmail: data.email,
  //       amount: data.amount,
  //     });

  //     form.reset();
  //     router.push("/");
  //   } catch (error) {
  //     console.error("Transfer failed:", error);
  //   }

  //   setIsLoading(false);
  // };

  const submit = async (data: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    //i make change
    setError(null);

    try {
      await transferFunds({
        senderBankId: data.senderBank, // ✅ Appwrite bank document ID
        receiverEmail: data.email,
        amount: data.amount,
      });

      form.reset();
      // router.push("/");
      router.push("/dashboard");
    } catch (error: any) {
      // setError(error.message);
      // console.error("Transfer failed:", error);
      try {
        const parsed = JSON.parse(error.message);

        if (parsed.code === "INSUFFICIENT_BALANCE") {
          setInsufficient(true);
          return;
        }

        setError(parsed.code);
      } catch {
        setError("UNKNOWN_ERROR");
      }
      console.error("Transfer failed:", error);
    }

    setIsLoading(false);
  };

  const errorMessages: Record<string, string> = {
    INSUFFICIENT_BALANCE: "❌ Insufficient balance. Please add funds.",
    RECEIVER_NOT_FOUND: "❌ Receiver not found.",
    INVALID_AMOUNT: "❌ Please enter a valid amount.",
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(submit)} className="flex flex-col">
        <FormField
          control={form.control}
          name="senderBank"
          render={() => (
            <FormItem className="border-t border-gray-200">
              <div className="flex w-full max-w-[850px] flex-col gap-3 md:flex-row lg:gap-8 pb-3 pt-3">
                <div className="flex w-full max-w-[280px] flex-col gap-2">
                  <FormLabel className="text-base font-medium text-gray-700">
                    Select Source Bank
                  </FormLabel>
                  <FormDescription className="text-sm font-normal text-gray-600">
                    Select the bank account you want to transfer funds from
                  </FormDescription>
                </div>
                <div className="flex w-full flex-col">
                  <FormControl>
                    <BankDropdown
                      accounts={accounts}
                      setValue={form.setValue}
                      otherStyles="!w-full"
                    />
                  </FormControl>
                  <FormMessage className="text-base text-red-500" />
                </div>
              </div>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="border-t border-gray-200">
              <div className="flex w-full max-w-[850px] flex-col gap-3 md:flex-row lg:gap-8 pb-4 pt-3">
                <div className="flex w-full max-w-[280px] flex-col gap-2">
                  <FormLabel className="text-base font-medium text-gray-700">
                    Transfer Note (Optional)
                  </FormLabel>
                  <FormDescription className="text-sm font-normal text-gray-600">
                    Please provide any additional information or instructions
                    related to the transfer
                  </FormDescription>
                </div>
                <div className="flex w-full flex-col">
                  <FormControl>
                    <Textarea
                      placeholder="Write a short note here"
                      className="input-class"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-sm text-red-500" />
                </div>
              </div>
            </FormItem>
          )}
        />

        <div className="flex flex-col gap-1 border-t border-gray-200 pb-4 pt-3">
          <h2 className="text-base font-semibold text-gray-900">
            Bank account details
          </h2>
          <p className="text-base font-normal text-gray-600">
            Enter the bank account details of the recipient
          </p>
        </div>

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="border-t border-gray-200">
              <div className="flex w-full max-w-[850px] flex-col gap-3 md:flex-row lg:gap-8 py-3">
                <FormLabel className="text-base w-full max-w-[280px] font-medium text-gray-700">
                  Recipient&apos;s Email Address
                </FormLabel>
                <div className="flex w-full flex-col">
                  <FormControl>
                    {/* <Input
                      placeholder="ex: johndoe@gmail.com"
                      className="input-class"
                      {...field}
                    /> */}
                    <Input
                      placeholder="ex: johndoe@gmail.com"
                      className="input-class"
                      {...field}
                      onChange={(e) => {
                        setError(null); // ✅ clear error
                        field.onChange(e); // ✅ keep react-hook-form working
                      }}
                    />
                  </FormControl>
                  <FormMessage className="text-sm text-red-500" />
                </div>
              </div>
            </FormItem>
          )}
        />

        {/* <FormField
          control={form.control}
          name="shareableId"
          render={({ field }) => (
            <FormItem className="border-t border-gray-200">
              <div className="flex w-full max-w-[850px] flex-col gap-3 md:flex-row lg:gap-8 pb-4 pt-3">
                <FormLabel className="text-base w-full max-w-[280px] font-medium text-gray-700">
                  Receiver&apos;s Plaid Sharable Id
                </FormLabel>
                <div className="flex w-full flex-col">
                  <FormControl>
                    <Input
                      placeholder="Enter the public account number"
                      className="input-class"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-sm text-red-500" />
                </div>
              </div>
            </FormItem>
          )}
        /> */}

        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem className="border-y border-gray-200">
              <div className="flex w-full max-w-[850px] flex-col gap-3 md:flex-row lg:gap-8 py-3">
                <FormLabel className="text-base w-full max-w-[280px] font-medium text-gray-700">
                  Amount
                </FormLabel>
                <div className="flex w-full flex-col">
                  <FormControl>
                    {/* <Input
                      placeholder="ex: 5.00"
                      className="input-class"
                      {...field}
                    /> */}
                    <Input
                      placeholder="ex: 50.00"
                      // className="input-class"
                      className={`input-class ${insufficient ? "border-red-500" : ""}`}
                      {...field}
                      onChange={(e) => {
                        const value = Number(e.target.value);
                        setError(null); // ✅ clear error
                        field.onChange(e); // ✅ keep react-hook-form working

                        //production
                        if (value > availableBalance) {
                          setInsufficient(true);
                        } else {
                          setInsufficient(false);
                        }
                      }}
                    />
                  </FormControl>
                  <FormMessage className="text-sm text-red-500" />
                </div>
              </div>
            </FormItem>
          )}
        />

        {error && (
          <div className="w-full max-w-[850px] rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {errorMessages[error] ?? "❌ Transfer failed. Please try again."}
          </div>
        )}

        <div className="mt-5 flex w-full max-w-[850px] gap-3 border-gray-200 py-3">
          {/* <Button
            type="submit"
            className="text-base w-full bg-blue-500 font-semibold text-white shadow-form !important"
          > */}
          {/* production */}
          <Button
            type="submit"
            disabled={isLoading || insufficient}
            className={`text-base w-full font-semibold text-white shadow-form transition-all ${
              insufficient
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            {isLoading ? (
              <>
                <Loader2 size={20} className="animate-spin" /> &nbsp; Sending...
              </>
            ) : (
              "Transfer Funds"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default PaymentTransferForm;
