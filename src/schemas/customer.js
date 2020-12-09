export default {
  title: 'Cliente',
  type: 'object',
  properties: {
    external_id: {
      title: 'ID Externo',
      type: 'string'
    },
    name: {
      title: 'Nome',
      type: 'string'
    },
    email: {
      title: 'E-mail',
      type: 'string'
    },
    country: {
      title: 'País',
      type: 'string'
    },
    type: {
      title: 'Tipo',
      enum: ['individual', 'corporation'],
      enumNames: ['Pessoa Física', 'Pessoa Jurídica']
    },
    phone_numbers: {
      title: 'Cliente • Telefones',
      type: 'array',
      items: {
        title: 'Telefone',
        type: 'string',
        description: 'Formato +5511987654321'
      }
    },
    documents: {
      title: 'Cliente • Documentos',
      type: 'array',
      items: {
        type: 'object',
        properties: {
          type: {
            title: 'Tipo',
            description: 'Para compradores brasileiros, deve ser fornecido ao menos um CPF (no caso de pessoa física) ou CNPJ (no caso de pessoa jurídica). Para compradores internacionais, o documento pode ser um passaporte ou um campo outro.',
            type: 'string',
            enum: ['cnpj', 'cpf', 'passport', 'other'],
            enumNames: ['CNPJ', 'CPF', 'Passaporte', 'Outro']
          },
          number: {
            title: 'Número',
            type: 'string'
          }
        }
      }
    }
  }
}
