import { useState } from "react";

function Button({ children, onClick }) {
  return (
    <button type="submit" onClick={onClick}>
      {children}
    </button>
  );
}

export default function App() {
  const [history, setHistory] = useState([]);
  const [show, setShow] = useState(false);

  function handleShow() {
    setShow((show) => !show);
  }
  function addNewTransaction(newTransaction) {
    setHistory((history) => [...history, newTransaction]);
  }
  function handleReset() {
    setHistory([]);
  }
  return (
    <div className="app">
      <h1>Expense tracker</h1>
      <div>
        <TotalBalance history={history} />
      </div>
      <ShowTransaction history={history} />
      <HistoryTransaction history={history} />
      {show && (
        <AddTransaction
          onAddTransaction={addNewTransaction}
          handleShow={handleShow}
        />
      )}
      <Button onClick={handleShow}>
        {!show ? "Add New Transaction" : "Close"}
      </Button>
      <Button onClick={handleReset}>Reset Transactions</Button>
    </div>
  );
}

function TotalBalance({ history }) {
  const balance = history.reduce(
    (acc, transaction) => acc + transaction.expense,
    0
  );
  return (
    <div className="expense-form">
      <h2>Your Balance</h2>
      <span>{balance.toFixed(2)}€</span>
    </div>
  );
}

function ShowTransaction({ history }) {
  const income = history
    .filter((h) => h.expense > 0)
    .reduce((acc, h) => acc + h.expense, 0);
  const expense = history
    .filter((h) => h.expense < 0)
    .reduce((acc, h) => acc + h.expense, 0);
  return (
    <div className="expense-list">
      <div>
        <h4>Income</h4>
        <p>+{income.toFixed(2)}€</p>
      </div>
      <div>
        <h4>Expense</h4>
        <p>{Math.abs(expense).toFixed(2)}€</p>
      </div>
    </div>
  );
}

function HistoryTransaction({ history }) {
  return (
    <div className="list">
      <h3>History</h3>
      <ul>
        {history.map((h, index) => (
          <li key={index} className={h.expense > 0 ? "income" : "expense"}>
            <h4>{h.text}</h4>
            <span>{h.expense > 0 ? `+${h.expense}€` : `${h.expense}€`}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function AddTransaction({ onAddTransaction, handleShow }) {
  const [text, setText] = useState("");
  const [expense, setExpense] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    const parsedValue = parseFloat(expense);
    if (!text || isNaN(parsedValue)) return;

    const newTransaction = { text, expense: parsedValue };
    onAddTransaction(newTransaction);

    setText("");
    setExpense("");
    handleShow(false);
  }

  return (
    <form onSubmit={handleSubmit} className="form">
      <h2>Add New Transaction</h2>
      <h4>Text</h4>
      <input
        type="text"
        placeholder="Enter Text"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <h4>Amount</h4>
      <p>(negative-expense or positive-income)</p>
      <input
        type="text"
        placeholder="Enter Amount"
        value={expense}
        onChange={(e) => setExpense(e.target.value)}
      />
      <Button>Submit</Button>
    </form>
  );
}
