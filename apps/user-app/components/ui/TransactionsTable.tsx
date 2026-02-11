import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { transactionCategoryStyles } from "@/constants";
import {
  cn,
  formatAmount,
  formatDateTime,
  getTransactionStatus,
  removeSpecialCharacters,
} from "@/lib/utils";

interface CategoryBadgeProps {
  category: string;
}

const CategoryBadge = ({ category }: CategoryBadgeProps) => {
  const { borderColor, backgroundColor, textColor, chipBackgroundColor } =
    transactionCategoryStyles[
      category as keyof typeof transactionCategoryStyles
    ] || transactionCategoryStyles.default;

  return (
    <div
      className={cn(
        "flex-center truncate w-fit gap-1 rounded-2xl border-[1.5px] py-[2px] pl-1.5 pr-2",
        borderColor,
        chipBackgroundColor,
      )}
    >
      <div className={cn("size-2 rounded-full", backgroundColor)} />
      <p className={cn("text-[12px] font-medium", textColor)}>{category}</p>
    </div>
  );
};

//i make changes
// const normalizeTransaction = (tx: any) => {
//   // Dwolla transfer (your app)
//   if (tx.senderBankId || tx.receiverBankId) {
//     return {
//       id: tx.$id,
//       name: "Bank Transfer",
//       amount: Number(tx.amount),
//       type: "debit",
//       status: tx.status ?? "pending",
//       channel: "Dwolla",
//       category: "Transfer",
//       date: new Date(tx.$createdAt),
//     };
//   }

//   // Plaid transaction
//   return {
//     id: tx.id,
//     // name: tx.name ?? "Unknown",
//     name: tx.name ?? (tx.receiverBankId ? "Bank Transfer" : "Bank"),

//     amount: Number(tx.amount),
//     type: tx.type,
//     // status: "success",
//     status: tx.status ?? "processing",
//     channel: tx.paymentChannel ?? "Bank",
//     category: tx.category ?? "Other",
//     date: new Date(tx.date),
//   };
// };

const TransactionsTable = ({ transactions }: TransactionTableProps) => {
  // console.log("TTransactions =>", transactions);
  return (
    <Table>
      <TableHeader className="bg-[#f9fafb]">
        <TableRow>
          <TableHead className="px-2">Transaction</TableHead>
          <TableHead className="px-2">Amount</TableHead>
          <TableHead className="px-2">Status</TableHead>
          <TableHead className="px-2">Date</TableHead>
          <TableHead className="px-2 max-md:hidden">Channel</TableHead>
          <TableHead className="px-2 max-md:hidden">Category</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {transactions?.map((t: Transaction) => {
          //i make changes
          // const trans = normalizeTransaction(t);
          const trans = t;

          const status = getTransactionStatus(new Date(t.date));

          //adding amount section
          // const amount = formatAmount(t.amount);
          // const isDebit = trans.type === "debit";
          // const isCredit = trans.type === "credit";
          const numericAmount = Number(trans.amount);
          const isDebit = trans.type === "debit";
          const isCredit = trans.type === "credit";
          const amount = formatAmount(Math.abs(numericAmount));

          return (
            <TableRow
              key={trans.id}
              //adding amount
              className={`${isDebit ? "bg-[#FFFBFA]" : "bg-[#F6FEF9]"}`}
              // className={`${isDebit || amount[0] === "-" ? "bg-[#FFFBFA]" : "bg-[#F6FEF9]"} !hover:bg-none !border-b-DEFAULT`}
            >
              <TableCell className="max-w-[250px] pl-2 pr-10">
                <div className="flex items-center gap-3">
                  <h1 className="text-base truncate font-semibold text-[#344054]">
                    {removeSpecialCharacters(trans.name)}
                  </h1>
                </div>
              </TableCell>

              <TableCell
                className={`pl-2 pr-10 font-semibold ${
                  isDebit || amount[0] === "-"
                    ? "text-[#f04438]"
                    : "text-[#039855]"
                }`}
              >
              {/* adding amount */}
                {/* {isDebit ? `-${amount}` : isCredit ? amount : amount} */}
               {isDebit ? `-${amount}` : `+${amount}`}

              </TableCell>

              <TableCell className="pl-2 pr-10">
                <CategoryBadge category={trans.status} />
              </TableCell>

              <TableCell className="min-w-32 pl-2 pr-10">
                {formatDateTime(new Date(t.date)).dateTime}
              </TableCell>

              <TableCell className="pl-2 pr-10 capitalize min-w-24">
                {trans.paymentChannel}
              </TableCell>

              <TableCell className="pl-2 pr-10 max-md:hidden">
                <CategoryBadge category={trans.category} />
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default TransactionsTable;
