export default {
  title: 'Billing',
  type: 'object',
  properties: {
    name: {
      title: 'Nome',
      type: 'string'
    },
    address: {
      title: 'Cobrança • Endereço',
      type: 'object',
      $ref: '#/schemas/address'
    }
  }
}
