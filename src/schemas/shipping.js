export default {
  title: 'Shipping',
  type: 'object',
  properties: {
    name: {
      title: 'Nome',
      type: 'string'
    },
    fee: {
      title: 'Taxa',
      type: 'number'
    },
    delivery_date: {
      title: 'Data de envio',
      type: 'string',
      description: 'Formato AAAA-MM-DD'
    },
    expedited: {
      title: 'Entrega expressa',
      type: 'boolean'
    },
    address: {
      title: 'Entrega • Endereço',
      type: 'object',
      $ref: '#/schemas/address'
    }
  }
}
