export default async pagarmeClient => {
    const bankAccounts = await pagarmeClient.bankAccounts.all()
    return {
        bankAccounts: {
            type: 'integer',
            enum: bankAccounts.map(bankAccount => bankAccount.id),
            enumNames: bankAccounts.map(
                bankAccount =>
                    `${bankAccount.id} • ${bankAccount.legal_name} • ${bankAccount.bank_code}`
            )
        }
    }
}