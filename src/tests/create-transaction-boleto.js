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
          title: 'Tipo de pagamento',
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
          title: 'Itens',
          type: 'array',
          items: {
            title: 'Item',
            $ref: '#/schemas/item'
          }
        },
        async: {
          title: 'Assíncrono',
          type: 'boolean',
          default: true,
          description: 'A resposta da transação é recebida na hora se marcado'
        },
        postback_url: {
          title: 'Postback URL',
          type: 'string',
          description: 'Endpoint do seu sistema que receberá informações a cada atualização da transação. Caso você defina este parâmetro, o processamento da transação se torna assíncrono.'
        }
      }
    }
    const fakers = [
      {
        title: 'Gerar Cliente',
        async act(formData) {
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
