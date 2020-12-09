import faker from 'faker/locale/pt_BR'

export default () => ({
  name: faker.name.findName(),
  fee: parseInt((faker.commerce.price() * 1).toFixed(0)),
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
