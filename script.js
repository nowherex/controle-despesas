const transactionsUl = document.getElementById('transactions');
const nameInput = document.getElementById('text');
const amoutInput = document.getElementById('amount');
const balancePlus = document.getElementById('money-plus');
const balanceMinus = document.getElementById('money-minus');
const balanceTotal = document.getElementById('balance');


const dummyTransactions = [
    {id: 1, name: 'Bolo de brigadeiro',amout: -20},
    {id: 2, name: 'Salario',amout: 300},
    {id: 3, name: 'Torta de frango',amout: -10},
    {id: 4, name: 'Violão',amout: 150}
]


const addTransactionIntoDOM = transaction => {
    const operator = transaction.amout < 0 ? '-' : '+';
    const CSSClass = transaction.amout < 0 ? 'minus' : 'plus';
    const amoutWithouOperator = Math.abs(transaction.amout)

    const li = document.createElement('li');
    li.classList.add(CSSClass);

    li.innerHTML = `
    ${transaction.name} <span>${operator} R$ ${amoutWithouOperator}</span><button class="delete-btn">x</button>
    `

    transactionsUl.append(li)
}

const updateBalaceValues = () => {
    const transactionsAmouts = dummyTransactions
    .map(transaction => transaction.amout);

    const total = transactionsAmouts
    .reduce((accumulator, transaction) => accumulator + transaction, 0)
    .toFixed(2);

    const income = transactionsAmouts
    .filter(value => value > 0)
    .reduce((accumulator, value) => accumulator + value, 0)
    .toFixed(2);

    const expense = transactionsAmouts
    .filter(value => value < 0)
    .reduce((accumulator, value) => accumulator + value, 0)
    .toFixed(2);

    balancePlus.textContent = `R$ ${income}`;
    balanceMinus.textContent = `R$ ${expense}`;
    balanceTotal.textContent = `R$ ${total}`;
}

const init = () => {
    dummyTransactions.forEach(addTransactionIntoDOM);
    updateBalaceValues()
}

init();
