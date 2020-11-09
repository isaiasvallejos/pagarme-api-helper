import clientSchemas from '../schemas/client'
import { calculateAmount } from './utils/create-transaction'
import faker from '../faker'

export default {
  id: 'create-transaction-boleto',
  title: 'Criar Transação de Boleto',
  async setup(schemas, pagarmeClient) {
    const schema = {
      schemas: {
        ...schemas,
        ...(await clientSchemas.loadRecipients(pagarmeClient))
      },
      type: 'object',
      properties: {
        payment_method: {
          title: 'Payment Type',
          type: 'string',
          enum: ['boleto'],
          enumNames: ['Boleto'],
          default: 'boleto'
        },
        split_rules: {
          $ref: '#/schemas/splitRules'
        },
        customer: {
          $ref: '#/schemas/customer'
        },
        billing: {
          $ref: '#/schemas/billing'
        },
        shipping: {
          title: 'Shipping',
          $ref: '#/schemas/shipping'
        },
        items: {
          title: 'Items',
          type: 'array',
          items: {
            title: 'Item',
            $ref: '#/schemas/item'
          }
        },
        async: {
          title: 'Async',
          type: 'boolean',
          default: true
        },
        postback_url: {
          title: 'Postback URL',
          type: 'string'
        }
      }
    }
    const fakers = [
      {
        title: 'Fake Customer',
        act(formData) {
          return { ...formData, customer: faker.customer() }
        }
      },
      {
        title: 'Fake Items',
        act(formData) {
          return { ...formData, items: faker.items() }
        }
      },
      {
        title: 'Fake Billing',
        act(formData) {
          return { ...formData, billing: faker.billing() }
        }
      },
      {
        title: 'Fake Shipping',
        act(formData) {
          return { ...formData, shipping: faker.shipping() }
        }
      }
    ]

    return { schema, fakers }
  },
  async prepare(formData, pagarmeClient) {
    return { ...formData, amount: calculateAmount(formData) }
  },
  async execute(requestData, pagarmeClient) {
    return pagarmeClient.transactions.create(requestData)
  }
}
