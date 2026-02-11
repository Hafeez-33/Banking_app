import AddMoneyForm from "@/components/ui/AddMoneyForm";
import { getAccounts } from "@/lib/actions/bank.actions";
import { getLoggedInUser } from "@/lib/actions/user.actions";

const AddMoney = async () => {
  const user = await getLoggedInUser();

  const accounts = await getAccounts({
    userId: user.$id,
  });

  if (!accounts) return null;

  return (
    <section className="flex min-h-screen w-full items-center justify-center bg-gray-50 p-6 sm:p-6">
      
      
      <div className="w-full max-w-lg rounded-2xl bg-white p-8 shadow-xl ">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Add Money</h1>
          <p className="mt-1 text-sm text-gray-500">
            Deposit funds securely into your account
          </p>
        </div>

        <AddMoneyForm accounts={accounts.data} />
      </div>
    </section>
  );

  // return (
  //   <section className="flex w-full flex-col gap-8 p-8">
  //     <h1 className="text-2xl font-bold">Add Money</h1>

  //     <AddMoneyForm accounts={accounts.data} />
  //   </section>
  // );
};

export default AddMoney;
