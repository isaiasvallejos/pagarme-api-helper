export default async pagarmeClient => {
  const cards = await pagarmeClient.cards.all()
  return {
    cards: {
      type: 'string',
      enum: cards.map(card => card.id),
      enumNames: cards.map(card => `${card.id} • ${card.holder_name}`)
    }
  }
}
