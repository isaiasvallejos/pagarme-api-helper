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
      title: 'Preço unitário',
      type: 'number'
    },
    quantity: {
      title: 'Quantidade',
      type: 'number'
    },
    tangible: {
      title: 'Bem físico',
      type: 'boolean'
    },
    category: {
      title: 'Categoria',
      type: 'string'
    },
    venue: {
      title: 'Local',
      type: 'string',
      description: 'Apenas para eventos'
    },
    date: {
      title: 'Date',
      type: 'string',
      description: 'Apenas para eventos. Formato AAAA-MM-DD'
    }
  }
}
