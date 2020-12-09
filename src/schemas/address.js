export default {
  title: 'Endereço',
  type: 'object',
  properties: {
    street: {
      title: 'Rua',
      type: 'string'
    },
    street_number: {
      title: 'Número',
      type: 'string'
    },
    zipcode: {
      title: 'CEP',
      type: 'string',
      description: 'Deve conter uma numeração de 8 dígitos.'
    },
    country: {
      title: 'País',
      type: 'string',
      description: 'Duas letras minúsculas. Deve seguir o padão ISO 3166-1 alpha-2.'
    },
    state: {
      title: 'Estado',
      type: 'string'
    },
    city: {
      title: 'Cidade',
      type: 'string'
    },
    neighborhood: {
      title: 'Bairro',
      type: 'string'
    },
    complementary: {
      title: 'Complemento',
      type: 'string'
    }
  }
}
