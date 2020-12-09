import clientSchemas from '../schemas/client'

export default {
  id: 'refund-partial-transaction',
  title: 'Realizar Estorno Parcial de Transação',
  async setup(schemas, pagarmeClient) {
    const schema = {
      schemas: {
        ...schemas,
        ...(await clientSchemas.loadBankAccounts(pagarmeClient)),
        ...(await clientSchemas.loadTransactions(pagarmeClient))
      },
      type: 'object',
      properties: {
        transaction_id: {
          title: 'Transação',
          $ref: '#/schemas/transactions'
        },
        amount: {
          title: 'Valor',
          type: 'integer'
        },
        bank_account_id: {
          title: 'Conta bancária',
          $ref: '#/schemas/bankAccounts'
        }
      }
    }
    const fakers = []

    return { schema, fakers }
  },
  async prepare(formData, pagarmeClient) {
    return { ...formData }
  },
  async execute(requestData, pagarmeClient) {
    return pagarmeClient.transactions.refund({
      id: requestData.transaction_id,
      amount: requestData.amount
    })
  }
}
