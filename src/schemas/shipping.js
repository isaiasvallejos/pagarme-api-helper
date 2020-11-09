export default {
  title: 'Shipping',
  type: 'object',
  properties: {
    name: {
      title: 'Name',
      type: 'string'
    },
    fee: {
      title: 'Fee',
      type: 'number'
    },
    delivery_date: {
      title: 'Delivery Date',
      type: 'string'
    },
    expedited: {
      title: 'Expedited',
      type: 'boolean'
    },
    address: {
      title: 'Shipping • Address',
      type: 'object',
      $ref: '#/schemas/address'
    }
  }
}
