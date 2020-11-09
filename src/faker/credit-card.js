import faker from 'faker'
import { format } from 'date-fns'

export default () => ({
  card_holder_name: faker.name.findName(),
  card_number: faker.finance.creditCardNumber().replaceAll('-', ''),
  card_cvv: faker.finance.creditCardCVV(),
  card_expiration_date: format(faker.date.future(), 'MMyy')
})
