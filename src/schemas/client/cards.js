export default async pagarmeClient => {
  const cards = await pagarmeClient.cards.all({ count: 50 })
  return {
    cards: {
      type: 'string',
      enum: cards.map(card => card.id),
      enumNames: cards.map(card => `${card.id} • ${card.holder_name}`)
    }
  }
}
