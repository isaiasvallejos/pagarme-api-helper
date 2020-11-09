export default {
  title: 'Split Rules',
  type: 'array',
  items: {
    type: 'object',
    properties: {
      liable: {
        title: 'Liable',
        type: 'boolean'
      },
      charge_processing_fee: {
        title: 'Charge Processing Fee',
        type: 'boolean'
      },
      percentage: {
        title: 'Percentage',
        type: 'integer'
      },
      amount: {
        title: 'Amount',
        type: 'integer'
      },
      charge_remainder_fee: {
        title: 'Charge Remainder Fee',
        type: 'boolean'
      },
      recipient_id: {
        title: 'Recipient',
        $ref: '#/schemas/recipients'
      }
    }
  }
}
