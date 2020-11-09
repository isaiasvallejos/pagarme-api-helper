import { calculateAmount } from './utils/create-transaction'
import clientSchemas from '../schemas/client'

export default {
  id: 'create-transaction-credit-card-one-click-buy',
  title: 'Criar Transação de Cartão de Crédito - One Click Buy',
  async setup(schemas, pagarmeClient) {
    const schema = {
      schemas: {
        ...schemas,
        ...(await clientSchemas.loadRecipients(pagarmeClient)),
        ...(await clientSchemas.loadCards(pagarmeClient))
      },
      type: 'object',
      properties: {
        amount: {
          title: 'Amount',
          type: 'integer'
        },
        card_id: {
          title: 'Cards',
          $ref: '#/schemas/cards'
        },
        payment_method: {
          title: 'Payment Type',
          type: 'string',
          enum: ['credit_card'],
          enumNames: ['Credit Card'],
          default: 'credit_card'
        },
        installments: {
          title: 'Installments',
          type: 'number'
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
        capture: {
          title: 'Capture',
          type: 'boolean',
          default: true
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
    const fakers = []

    return { schema, fakers }
  },
  async prepare(formData, pagarmeClient) {
    return { ...formData, amount: calculateAmount(formData) }
  },
  async execute(requestData, pagarmeClient) {
    return pagarmeClient.transactions.create(requestData)
  }
}
