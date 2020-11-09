
export default {
    id: 'create-bank-account',
    title: 'Criar Conta Bancária',
    async setup(schemas, pagarmeClient) {
        const schema = {
            schemas: {
                ...schemas
            },
            type: 'object',
            properties: {
                bank_code: {
                    title: 'Bank Code',
                    type: 'string'
                },
                agencia: {
                    title: 'Agencia',
                    type: 'string'
                },
                agencia_dv: {
                    title: 'Agencia DV',
                    type: 'string'
                },
                conta: {
                    title: 'Conta',
                    type: 'string'
                },
                conta_dv: {
                    title: 'Conta DV',
                    type: 'string'
                },
                type: {
                    title: 'Type',
                    enum: ['conta_corrente', 'conta_poupanca', 'conta_corrente_conjunta', 'conta_poupanca_conjunta'],
                    enumNames: ['Conta Corrente', 'Conta Poupanca', 'Conta Corrente Conjunta', 'Conta Poupanca Conjunta']
                },
                document_number: {
                    title: 'Document Number',
                    type: 'string'
                },
                legal_name: {
                    title: 'Legal Name',
                    type: 'string'
                }
            }
        }
        const fakers = []

        return { schema, fakers }
    },
    async prepare(formData, pagarmeClient) {
        return { ...formData }
    },
    async execute(requestData, pagarmeClient) {
        return pagarmeClient.bankAccounts.create(requestData)
    }
}
