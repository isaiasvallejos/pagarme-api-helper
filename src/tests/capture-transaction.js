import clientSchemas from '../schemas/client'

export default {
  id: 'capture-transaction',
  title: 'Capturar Transação',
  async setup(schemas, pagarmeClient) {
    const schema = {
      schemas: {
        ...schemas,
        ...(await clientSchemas.loadTransactions(pagarmeClient)),
        ...(await clientSchemas.loadRecipients(pagarmeClient))
      },
      type: 'object',
      properties: {
        transaction_id: {
          title: 'Transaction',
          $ref: '#/schemas/transactions'
        },
        split_rules: {
          $ref: '#/schemas/splitRules'
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
    return pagarmeClient.transactions.capture({
      id: requestData.transaction_id
    })
  }
}
