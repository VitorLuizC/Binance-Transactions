'use strict';

/**
 * Get element's text.
 * @param {string} selector
 * @param {HTMLElement|Document} [parent]
 * @returns {string}
 */
function getText(selector, parent) {
  if ( parent === void 0 ) parent = document;

  var element = parent.querySelector(selector);
  var text = element.textContent || '';
  return text;
}

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
function getTransactions(rows) {
  var transactions = rows.map(function (row) {
    var date = new Date(getText('td:nth-child(1)', row));
    var pair = getText('td:nth-child(2)', row);
    var type = getText('td:nth-child(3)', row);
    var filled = +getText('td:nth-child(5)', row);
    var fee = +getText('td:nth-child(6)', row);
    var total = getCurrency(getText('td:nth-child(7)', row));

    var quantity = type.textContent === 'Buy' ? +filled.textContent - getCurrency(fee.textContent) : +filled.textContent;

    var price = type.textContent === 'Buy' ? +(getCurrency(total.textContent) / quantity).toFixed(8) : +((getCurrency(total.textContent) - getCurrency(fee.textContent)) / quantity).toFixed(8);

    return {
      date: date,
      type: type,
      pair: pair,
      price: price,
      quantity: quantity,
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
function getCurrency(value) {
  var ref = /\d+\.\d+/.exec(value);
  var currency = ref[0];
  return +currency;
}

var rows = Array.from(document.querySelectorAll('tbody tr'));
var transactions = getTransactions(rows);

console.log(JSON.stringify(transactions, null, 2));
