export default {
  title: 'Item',
  type: 'object',
  properties: {
    id: {
      title: 'ID/SKU',
      type: 'string'
    },
    title: {
      title: 'Nome',
      type: 'string'
    },
    unit_price: {
      title: 'Unit Price',
      type: 'number'
    },
    quantity: {
      title: 'Quantity',
      type: 'number'
    },
    tangible: {
      title: 'Tangible',
      type: 'boolean'
    },
    category: {
      title: 'Category',
      type: 'string'
    },
    venue: {
      title: 'Venue',
      type: 'string'
    },
    date: {
      title: 'Date',
      type: 'string'
    }
  }
}
