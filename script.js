const transactionsUl = document.getElementById('transactions');
const inputName = document.getElementById('text');
const inputAmount = document.getElementById('amount');
const balancePlus = document.getElementById('money-plus');
const balanceMinus = document.getElementById('money-minus');
const balanceTotal = document.getElementById('balance');
const form = document.querySelector('#form');


const localStorageTransactions = JSON.parse(localStorage.getItem('transactions'))
let transactions = localStorage
    .getItem('transactions') !== null ? localStorageTransactions : []


const removeTransaction = ID => {
    transactions = transactions.filter(transaction =>
        transaction.id !== ID)
    updateLocalStorage()
    init()
}

const addTransactionIntoDOM = transaction => {
    const operator = transaction.amout < 0 ? '-' : '+';
    const CSSClass = transaction.amout < 0 ? 'minus' : 'plus';
    const amoutWithouOperator = Math.abs(transaction.amout)

    const li = document.createElement('li');
    li.classList.add(CSSClass);

    li.innerHTML = `
    ${transaction.name} 
    <span>${operator} R$ ${amoutWithouOperator}</span>
    <button class="delete-btn" onClick="removeTransaction(${transaction.id})">
    x
    </button>
    `

    transactionsUl.append(li)
}

const updateBalaceValues = () => {
    const transactionsAmouts = transactions
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
    transactionsUl.innerHTML = ''
    transactions.forEach(addTransactionIntoDOM);
    updateBalaceValues()
}

init()

const updateLocalStorage = () => {
    localStorage.setItem('transactions', JSON.stringify(transactions))
}

const handleFormSubmit = event => {
    event.preventDefault()

    const transactionName = inputName.value.trim()
    const transactionAmount = inputAmount.value.trim()

    if (inputName.value.trim() === '' || inputAmount.value.trim() === '') {
        alert('Campo nome e valor deve ser preenchidos!')
        return
    }

    const transaction = {
        id: transactions.length + 1,
        name: transactionName,
        amout: Number(transactionAmount)
    }

    transactions.push(transaction)
    init()
    updateLocalStorage()

    inputAmount.value = ''
    inputName.value = ''
}

form.addEventListener('submit', handleFormSubmit)