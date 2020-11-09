import clientSchemas from '../schemas/client'

export default {
  id: 'refund-splitted-transaction',
  title: 'Realizar Estorno de Transação com Divisão/Split',
  async setup(schemas, pagarmeClient) {
    const schema = {
      schemas: {
        ...schemas,
        ...(await clientSchemas.loadBankAccounts(pagarmeClient)),
        ...(await clientSchemas.loadTransactions(pagarmeClient)),
        ...(await clientSchemas.loadRecipients(pagarmeClient))
      },
      type: 'object',
      properties: {
        transaction_id: {
          title: 'Transaction',
          $ref: '#/schemas/transactions'
        },
        amount: {
          title: 'Amount',
          type: 'integer'
        },
        bank_account_id: {
          title: 'Bank Account',
          $ref: '#/schemas/bankAccounts'
        },
        split_rules: {
          $ref: '#/schemas/splitRules'
        },
        async: {
          title: 'Async',
          type: 'boolean',
          default: true
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
      amount: requestData.amount,
      split_rules: requestData.split_rules
    })
  }
}