import { omit } from 'ramda'
import faker from '../faker'

import clientSchemas from '../schemas/client'
import { calculateAmount } from './utils/create-transaction'

export default {
  id: 'create-transaction-credit-card-hash',
  title: 'Criar Transação de Cartão de Crédito - Com Hash',
  async setup(schemas, pagarmeClient) {
    const schema = {
      schemas: {
        ...schemas,
        ...(await clientSchemas.loadRecipients(pagarmeClient))
      },
      type: 'object',
      properties: {
        amount: {
          title: 'Amount',
          type: 'integer'
        },
        card_holder_name: {
          title: 'Card Holder Name',
          type: 'string'
        },
        card_expiration_date: {
          title: 'Card Expiration Date',
          type: 'string'
        },
        card_number: {
          title: 'Card Number',
          type: 'string'
        },
        card_cvv: {
          title: 'Card CVV',
          type: 'string'
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
    const fakers = [
      {
        title: 'Gerar Customer',
        act(formData) {
          return { ...formData, customer: faker.customer() }
        }
      }
    ]

    return { schema, fakers }
  },
  async prepare(formData, pagarmeClient) {
    const cardHash = await pagarmeClient.security.encrypt({
      card_number: formData.card_number,
      card_holder_name: formData.card_holder_name,
      card_expiration_date: formData.card_expiration_date,
      card_cvv: formData.card_cvv
    })

    const formDataWithoutCreditCard = omit(
      ['card_number', 'card_holder_name', 'card_expiration_date', 'card_cvv'],
      formData
    )

    return {
      ...formDataWithoutCreditCard,
      card_hash: cardHash,
      amount: calculateAmount(formData)
    }
  },
  async execute(requestData, pagarmeClient) {
    return pagarmeClient.transactions.create(requestData)
  }
}
