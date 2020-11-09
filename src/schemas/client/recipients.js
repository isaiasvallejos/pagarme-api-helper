export default async pagarmeClient => {
  const recipients = await pagarmeClient.recipients.all()
  return {
    recipients: {
      type: 'string',
      enum: recipients.map(recipient => recipient.id),
      enumNames: recipients.map(
        recipient => `${recipient.id} • ${recipient.bank_account.legal_name}`
      )
    }
  }
}
