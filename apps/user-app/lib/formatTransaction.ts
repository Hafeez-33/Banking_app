export const formatTransaction = (tx: any) => {
  // Dwolla transaction
  if (tx.senderBankId || tx.receiverBankId) {
    return {
      id: tx.$id,
      title: "Bank Transfer",
      amount: Number(tx.amount),
      type: "debit",
      status: tx.status ?? "pending",
      channel: "Dwolla",
      date: new Date(tx.$createdAt),
    };
  }

  // Plaid transaction
  return {
    id: tx.id,
    title: tx.name ?? "Unknown",
    amount: Number(tx.amount),
    type: tx.type,
    status: "success",
    channel: tx.paymentChannel ?? "Bank",
    date: new Date(tx.date),
  };
};
