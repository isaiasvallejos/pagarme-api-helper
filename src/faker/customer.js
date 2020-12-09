import faker from 'faker/locale/pt_BR'
import * as cpfGenerator from 'gerador-validador-cpf'

const generatePhoneNumber = () => `+55${faker.phone.phoneNumberFormat().replace(/[^0-9.]/g, '')}`

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
  phone_numbers: [generatePhoneNumber(), generatePhoneNumber()]
})
