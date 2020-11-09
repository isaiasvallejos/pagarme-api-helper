export default {
  title: 'Customer',
  type: 'object',
  properties: {
    external_id: {
      title: 'External ID',
      type: 'string'
    },
    name: {
      title: 'Name',
      type: 'string'
    },
    email: {
      title: 'E-mail',
      type: 'string'
    },
    country: {
      title: 'Country',
      type: 'string'
    },
    type: {
      title: 'Type',
      enum: ['individual', 'corporation'],
      enumNames: ['Individual', 'Corporation']
    },
    phone_numbers: {
      title: 'Customer • Phone Numbers',
      type: 'array',
      items: {
        title: 'Phone Number',
        type: 'string'
      }
    },
    documents: {
      title: 'Customer • Documents',
      type: 'array',
      items: {
        type: 'object',
        properties: {
          type: {
            title: 'Type',
            type: 'string',
            enum: ['cnpj', 'cpf', 'passport', 'other'],
            enumNames: ['CNPJ', 'CPF', 'Passaport', 'Other']
          },
          number: {
            title: 'Number',
            type: 'string'
          }
        }
      }
    }
  }
}
