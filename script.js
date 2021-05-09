const transactionsUl = document.getElementById('transactions')
const inputName = document.getElementById('text')
const inputAmount = document.getElementById('amount')
const balancePlus = document.getElementById('money-plus')
const balanceMinus = document.getElementById('money-minus')
const balanceTotal = document.getElementById('balance')
const form = document.querySelector('#form')


const localStorageTransactions = JSON.parse(localStorage.getItem('transactions'))
let transactions = localStorage
    .getItem('transactions') !== null ? localStorageTransactions : []


const removeTransaction = ID => {
    transactions = transactions.filter(transaction =>
        transaction.id !== ID)
    updateLocalStorage()
    init()
}

const addTransactionIntoDOM = ({ amout, name, id }) => {
    const operator = amout < 0 ? '-' : '+'
    const CSSClass = amout < 0 ? 'minus' : 'plus'
    const amoutWithouOperator = Math.abs(amout)

    const li = document.createElement('li')
    li.classList.add(CSSClass)

    li.innerHTML = `
    ${name} 
    <span>${operator} R$ ${amoutWithouOperator}</span>
    <button class="delete-btn" onClick="removeTransaction(${id})">x</button>
    `

    transactionsUl.append(li)
}

const getExpenses = transactionsAmouts => transactionsAmouts
    .filter(value => value < 0)
    .reduce((accumulator, value) => accumulator + value, 0)
    .toFixed(2)

const getIncome = transactionsAmouts => transactionsAmouts
    .filter(value => value > 0)
    .reduce((accumulator, value) => accumulator + value, 0)
    .toFixed(2)

const getTotal = transactionsAmouts => transactionsAmouts
    .reduce((accumulator, transaction) => accumulator + transaction, 0)
    .toFixed(2)



const updateBalaceValues = () => {
    const transactionsAmouts = transactions.map(({ amout }) => amout)

    const total = getTotal(transactionsAmouts)

    const income = getIncome(transactionsAmouts)

    const expense = getExpenses(transactionsAmouts)

    balancePlus.textContent = `R$ ${income}`
    balanceMinus.textContent = `R$ ${expense}`
    balanceTotal.textContent = `R$ ${total}`
}

const init = () => {
    transactionsUl.innerHTML = ''
    transactions.forEach(addTransactionIntoDOM)
    updateBalaceValues()
}

init()

const updateLocalStorage = () => {
    localStorage.setItem('transactions', JSON.stringify(transactions))
}

const addTransactionArray = (transactionName, transactionAmount) => {
    transactions.push({
        id: transactions.length + 1,
        name: transactionName,
        amout: Number(transactionAmount)
    })
}

const cleanInput = () => {
    inputAmount.value = ''
    inputName.value = ''
}

const handleFormSubmit = event => {
    event.preventDefault()

    const transactionName = inputName.value.trim()
    const transactionAmount = inputAmount.value.trim()
    const isSomeInputEmpty = inputName.value.trim() === '' || inputAmount.value.trim() === ''

    if (isSomeInputEmpty) {
        alert('Campo nome e valor deve ser preenchidos!')
        return
    }

    addTransactionArray(transactionName, transactionAmount)

    init()
    updateLocalStorage()

    cleanInput()
    inputName.focus()
}

form.addEventListener('submit', handleFormSubmit)