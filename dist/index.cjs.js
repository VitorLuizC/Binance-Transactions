'use strict';

var getNumber = function (value) {
  var ref = /(\d*\.\d*)/g.exec(value);
  var number = ref[1];
  return +number;
};

var rows = [].concat( document.querySelectorAll('tbody tr') );

var transactions = rows.map(function (row) {
  var ref = row.querySelectorAll('td');
  var date = ref[0];
  var pair = ref[1];
  var type = ref[2];
  var filled = ref[4];
  var fee = ref[5];
  var total = ref[6];

  var quantity = type.textContent === 'Buy' ? +filled.textContent - getNumber(fee.textContent) : +filled.textContent;

  var price = type.textContent === 'Buy' ? +(getNumber(total.textContent) / quantity).toFixed(8) : +((getNumber(total.textContent) - getNumber(fee.textContent)) / quantity).toFixed(8);

  return {
    date: new Date(date.textContent).toLocaleDateString('pt-BR'),
    type: type.textContent,
    pair: pair.textContent,
    price: price,
    quantity: quantity,
    total: +(quantity * price).toFixed(8)
  };
});

console.log(JSON.stringify(transactions, null, 2));
