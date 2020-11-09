export const calculateAmount = formData => {
  const itemsAmount = formData.items
    ? formData.items.reduce((acc, item) => item.unit_price * item.quantity, 0)
    : 0
  const shippingFee = formData.shipping ? formData.shipping.fee : 0
  const amount = itemsAmount + shippingFee || formData.amount || 0

  return amount
}
