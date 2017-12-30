const getNumber = (value) => {
  const [ , number ] = /(\d*\.\d*)/g.exec(value);
  return +number;
};

const rows = [ ...document.querySelectorAll('tbody tr') ];

const transactions = rows.map((row) => {
  const [
    date,
    pair,
    type,
    , // price
    filled,
    fee,
    total
  ] = row.querySelectorAll('td');

  const quantity = (
    type.textContent === 'Buy'
      ? +filled.textContent - getNumber(fee.textContent)
      : +filled.textContent
  );

  const price = (
    type.textContent === 'Buy'
      ? +(getNumber(total.textContent) / quantity).toFixed(8)
      : +((getNumber(total.textContent) - getNumber(fee.textContent)) / quantity).toFixed(8)
  );

  return {
    date: new Date(date.textContent).toLocaleDateString('pt-BR'),
    type: type.textContent,
    pair: pair.textContent,
    price,
    quantity,
    total: +(quantity * price).toFixed(8)
  };
});

console.log(JSON.stringify(transactions, null, 2));
