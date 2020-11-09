import faker from 'faker'

export default () => ({
  name: faker.name.findName(),
  fee: 1000,
  address: {
    street: 'Rua Matrix',
    street_number: '9999',
    zipcode: '06714360',
    state: 'sp',
    city: 'Cotia',
    country: 'br',
    complementary: 'Apto. 201',
    neighborhood: 'Rio Cotia'
  }
})
