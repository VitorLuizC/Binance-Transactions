import getTransactions from './transaction'

const rows = Array.from(document.querySelectorAll('tbody tr'));
const transactions = getTransactions(rows);

console.log(JSON.stringify(transactions, null, 2));
