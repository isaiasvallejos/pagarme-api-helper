export default async pagarmeClient => {
  const transactions = await pagarmeClient.transactions.all()
  return {
    transactions: {
      type: 'integer',
      enum: transactions.map(transaction => transaction.id),
      enumNames: transactions.map(
        transaction =>
          `${transaction.id} • ${transaction.customer.name} • ${transaction.status}`
      )
    }
  }
}
