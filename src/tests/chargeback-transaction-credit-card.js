import clientSchemas from '../schemas/client'

export default {
  id: 'chargeback-transaction',
  title: 'Chargeback',
  async setup(schemas, pagarmeClient) {
    const schema = {
      schemas: {
        ...schemas,
        ...(await clientSchemas.loadTransactions(pagarmeClient))
      },
      type: 'object',
      properties: {
        transaction_id: {
          title: 'Transação',
          $ref: '#/schemas/transactions'
        }
      }
    }
    const fakers = []

    return { schema, fakers }
  },
  async prepare(formData, pagarmeClient) {
    return { ...formData, status: 'chargedback' }
  },
  async execute(requestData, pagarmeClient) {
    return pagarmeClient.transactions.update({
      id: requestData.transaction_id,
      status: requestData.status
    })
  }
}
