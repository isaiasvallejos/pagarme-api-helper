import faker from 'faker'

export default () => [
  {
    id: faker.random.number().toString(),
    title: faker.commerce.productName(),
    category: faker.commerce.department(),
    unit_price: parseInt((faker.commerce.price() * 100).toFixed(0)),
    tangible: true,
    quantity: 2
  },
  {
    id: faker.random.number().toString(),
    title: faker.commerce.productName(),
    category: faker.commerce.department(),
    tangible: true,
    unit_price: parseInt((faker.commerce.price() * 100).toFixed(0)),
    quantity: 4
  }
]
