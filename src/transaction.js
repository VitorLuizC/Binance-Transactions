import * as element from './element'

/**
 * Transaction object.
 * @typedef {object} Transaction
 * @property {string} date
 * @property {'Buy'|'Sell'} type
 * @property {string} pair
 * @property {number} price
 * @property {number} quantity
 * @property {number} total
 */

/**
 * Get all history itens as transactions.
 * @param {HTMLTableRowElement[]} rows
 * @returns {Transaction[]}
 */
export default function getTransactions (rows) {
  const transactions = rows.map((row) => {
    const date = new Date(element.getText('td:nth-child(1)', row))
    const pair = element.getText('td:nth-child(2)', row)
    const type = element.getText('td:nth-child(3)', row)
    const filled = +element.getText('td:nth-child(5)', row)
    const fee = +element.getText('td:nth-child(6)', row)
    const total = getCurrency(element.getText('td:nth-child(7)', row))

    const quantity = (
      type.textContent === 'Buy'
        ? +filled.textContent - getCurrency(fee.textContent)
        : +filled.textContent
    );

    const price = (
      type.textContent === 'Buy'
        ? +(getCurrency(total.textContent) / quantity).toFixed(8)
        : +((getCurrency(total.textContent) - getCurrency(fee.textContent)) / quantity).toFixed(8)
    );

    return {
      date,
      type,
      pair,
      price,
      quantity,
      total: +(quantity * price).toFixed(8)
    };
  });
}

/**
 * Get currency's value.
 * @example ```js
 * '0.18000000 BTC/XVG' => 0.18
 * ```
 * @param {string} value
 * @returns {number}
 */
function getCurrency (value) {
  const [ currency ] = /\d+\.\d+/.exec(value);
  return +currency
}

function toCurrency (value) {
  const currency = +value.toFixed(8)
  return toCurrency
}
