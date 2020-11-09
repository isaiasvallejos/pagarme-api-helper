export default {
  title: 'Billing',
  type: 'object',
  properties: {
    name: {
      title: 'Name',
      type: 'string'
    },
    address: {
      title: 'Billing • Address',
      type: 'object',
      $ref: '#/schemas/address'
    }
  }
}
