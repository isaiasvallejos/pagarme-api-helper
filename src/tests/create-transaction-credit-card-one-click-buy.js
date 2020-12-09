import { calculateAmount } from './utils/create-transaction'
import clientSchemas from '../schemas/client'
import faker from '../faker'

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
        card_id: {
          title: 'Cartão',
          $ref: '#/schemas/cards'
        },
        payment_method: {
          title: 'Tipo de pagamento',
          type: 'string',
          enum: ['credit_card'],
          enumNames: ['Cartão de Crédito'],
          default: 'credit_card'
        },
        installments: {
          title: 'Número de parcelas',
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
          $ref: '#/schemas/shipping'
        },
        items: {
          title: 'Itens',
          type: 'array',
          items: {
            $ref: '#/schemas/item'
          }
        },
        capture: {
          title: 'Capturar',
          type: 'boolean',
          default: true
        },
        async: {
          title: 'Assíncrono',
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
        title: 'Gerar Cliente',
        act(formData) {
          return { ...formData, customer: faker.customer() }
        }
      },
      {
        title: 'Gerar Itens',
        act(formData) {
          return { ...formData, items: faker.items() }
        }
      },
      {
        title: 'Gerar Cobrança',
        act(formData) {
          return { ...formData, billing: faker.billing() }
        }
      },
      {
        title: 'Gerar Entrega',
        act(formData) {
          return { ...formData, shipping: faker.shipping() }
        }
      },
      {
        title: 'Gerar Postback',
        async act(formData) {
          return { ...formData, ...(await faker.postbackUrl()) }
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
