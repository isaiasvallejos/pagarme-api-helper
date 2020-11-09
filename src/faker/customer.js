import faker from 'faker'
import * as cpfGenerator from 'gerador-validador-cpf'

export default () => ({
  external_id: faker.random.number().toString(),
  name: faker.name.findName(),
  email: faker.internet.email(),
  country: 'br',
  type: 'individual',
  documents: [
    {
      type: 'cpf',
      number: cpfGenerator.generate()
    }
  ],
  phone_numbers: ['+55333333333', '+55888888888']
})
