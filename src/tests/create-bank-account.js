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
          title: 'Código do Banco',
          type: 'string'
        },
        agencia: {
          title: 'Agência',
          type: 'string'
        },
        agencia_dv: {
          title: 'Agência - Dígito Verificador',
          type: 'string'
        },
        conta: {
          title: 'Conta',
          type: 'string'
        },
        conta_dv: {
          title: 'Conta - Dígito Verificador',
          type: 'string'
        },
        type: {
          title: 'Tipo',
          enum: [
            'conta_corrente',
            'conta_poupanca',
            'conta_corrente_conjunta',
            'conta_poupanca_conjunta'
          ],
          enumNames: [
            'Conta Corrente',
            'Conta Poupança',
            'Conta Corrente Conjunta',
            'Conta Poupança Conjunta'
          ]
        },
        document_number: {
          title: 'Número de documento',
          type: 'string',
          description: 'CPF/CNPJ atrelado à conta'
        },
        legal_name: {
          title: 'Nome/Razão social',
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
