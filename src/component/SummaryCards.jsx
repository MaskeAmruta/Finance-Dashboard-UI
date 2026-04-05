import { useContext } from "react";
import { AppContext } from "../context/AppContext";

export default function SummaryCards() {
  const { transactions } = useContext(AppContext);

  const income = transactions
    .filter(t => t.type === "income")
    .reduce((a, b) => a + b.amount, 0);

  const expense = transactions
    .filter(t => t.type === "expense")
    .reduce((a, b) => a + b.amount, 0);

  const balance = income - expense;

  return (
    <div className="cards">
      <div className="card1">Balance: ₹{balance}</div>
      <div className="card2">Income: ₹{income}</div>
      <div className="card3">Expenses: ₹{expense}</div>
    </div>
  );
}