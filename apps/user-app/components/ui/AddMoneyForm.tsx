"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { depositFunds } from "@/lib/actions/transaction.actions";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { BankDropdown } from "./BankDropdown";

const AddMoneyForm = ({ accounts }: any) => {
  const router = useRouter();
  const [amount, setAmount] = useState("");
  const [bankId, setBankId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await depositFunds({
        bankId,
        amount: Number(amount),
      });

      // router.push("/");
      router.push("/dashboard")
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    }

    setLoading(false);
  };

  return(
  <form onSubmit={handleSubmit} className="flex flex-col gap-6">

  {/* BANK SELECT */}
  <div>
    <label className="mb-2 block text-sm font-medium text-gray-700">
      Select Bank
    </label>

    <div className="rounded-xl border bg-gray-50 p-3">
      <BankDropdown
        accounts={accounts}
        setValue={(name: string, value: string) => setBankId(value)}
      />
    </div>
  </div>


  {/* AMOUNT INPUT */}
  <div>
    <label className="mb-2 block text-sm font-medium text-gray-700">
      Amount
    </label>

    <div className="relative">
      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
        $
      </span>

      <Input
        type="number"
        placeholder="0.00"
        value={amount}
        onChange={(e) => {
          setAmount(e.target.value);
          setError("");
        }}
        className="pl-8 py-6 text-lg"
      />
    </div>
  </div>


  {/* QUICK AMOUNT BUTTONS */}
  <div className="flex gap-3 flex-wrap">
    {[10,25,50,100,].map((amt) => (
      <button
        key={amt}
        type="button"
        onClick={() => setAmount(String(amt))}
        className="rounded-full border px-4 py-2 text-sm font-medium text-gray-700 hover:bg-blue-50 hover:border-blue-500 transition"
      >
        +${amt}
      </button>
    ))}
  </div>


  {/* ERROR MESSAGE */}
  {error && (
    <div className="rounded-lg bg-red-50 p-3 text-sm text-red-600">
      {error}
    </div>
  )}


  {/* SUBMIT BUTTON */}
  <Button
    type="submit"
    disabled={loading}
    className="mt-4 w-full rounded-xl bg-blue-600 py-6 text-base font-semibold shadow-md hover:bg-blue-700 active:scale-95 transition"
  >
    {loading ? "Processing..." : "Add Money"}
  </Button>

</form>

  // return (
  //   <form onSubmit={handleSubmit} className="flex flex-col gap-6 max-w-md">
  //     <div>
  //       <label className="font-semibold">Select Bank</label>
  //       <BankDropdown
  //         accounts={accounts}
  //         setValue={(name: string, value: string) => setBankId(value)}
  //       />
  //     </div>

  //     <div>
  //       <label className="font-semibold">Amount</label>
  //       <Input
  //         placeholder="Enter amount"
  //         value={amount}
  //         onChange={(e) => {
  //           setAmount(e.target.value);
  //           setError("");
  //         }}
  //       />
  //     </div>

  //     {error && <p className="text-red-500">{error}</p>}

  //     <Button type="submit" disabled={loading}>
  //       {loading ? "Processing..." : "Add Money"}
  //     </Button>
  //   </form>
  // );
)

};

export default AddMoneyForm;
