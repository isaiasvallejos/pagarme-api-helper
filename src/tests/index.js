import createTransactionCreditCard from './create-transaction-credit-card'
import createTransactionCreditCardHash from './create-transaction-credit-card-hash'
import createTransactionCreditCardOneClickBuy from './create-transaction-credit-card-one-click-buy'
import createTransactionBoleto from './create-transaction-boleto'
import captureTransaction from './capture-transaction'
import chargeBackTransactionCreditCard from './chargeback-transaction-credit-card'
import paidTransactionBoleto from './paid-transaction-boleto'
import createBankAccount from './create-bank-account'
import refundPartialTransaction from './refund-partial-transaction'
import refundTotalTransaction from './refund-total-transaction'
import refundSplittedTransaction from './refund-splitted-transaction'

export default [
  createTransactionCreditCard,
  createTransactionCreditCardHash,
  createTransactionCreditCardOneClickBuy,
  createTransactionBoleto,
  captureTransaction,
  chargeBackTransactionCreditCard,
  paidTransactionBoleto,
  createBankAccount,
  refundPartialTransaction,
  refundTotalTransaction,
  refundSplittedTransaction
]
