export default {
  title: 'Regras de divisão',
  type: 'array',
  items: {
    type: 'object',
    properties: {
      liable: {
        title: 'Responsável por chargeback',
        type: 'boolean'
      },
      charge_processing_fee: {
        title: 'Responsável por taxas da transação',
        type: 'boolean'
      },
      percentage: {
        title: 'Porcentagem',
        type: 'integer',
        description: 'Deve estar entre 0 e 100. Se o valor já está preenchido, não é obrigatório'
      },
      amount: {
        title: 'Valor',
        type: 'integer',
        description: 'Se a porcentagem já está preenchida, não é obrigatório'
      },
      charge_remainder_fee: {
        title: 'Responsável por restos de taxas da transação',
        type: 'boolean'
      },
      recipient_id: {
        title: 'Recebedor',
        $ref: '#/schemas/recipients'
      }
    }
  }
}
