import { useContext } from "react";
import { AppContext } from "../context/AppContext";

export default function Insights() {
  const { transactions } = useContext(AppContext);

   if (!transactions || transactions.length === 0) {
    return <p>No data available</p>;
  }

  const expenses = transactions.filter(t => t.type === "expense");

  const categoryTotals = {};

  expenses.forEach(t => {
    categoryTotals[t.category] =
      (categoryTotals[t.category] || 0) + Number(t.amount);
  });

  const highest = Object.entries(categoryTotals).sort((a, b) => b[1] - a[1])[0];

  const monthly ={};
  transactions.forEach(t => {
    const month = t.date.slice(0,7);
    if(!monthly[month]){
      monthly[month] = {income:0, expense:0};
    }

    if(t.type ==="income"){
      monthly[month].income +=Number(t.amount);
    }else{
      monthly[month].expense +=Number(t.amount);
    }
  });

  const months = Object.keys(monthly);
  const insights = [];

  if(highest){
    insights.push(`You spent the most on ${highest[0]} (Rs. ${highest[1]}).`);
  }

  for (let i = 1; i < months.length; i++) {
    const prev = monthly[months[i - 1]].expense;
    const curr = monthly[months[i]].expense;

    if (curr > prev) {
      insights.push(`Spending increased in ${months[i]}.`);
    } else {
      insights.push(`Spending decreased in ${months[i]}.`);
    }
  }

  months.forEach(m => {
    const { income, expense } = monthly[m];
    if (income > expense) {
      insights.push(`You saved money in ${m}.`);
    } else {
      insights.push(`Expenses exceeded income in ${m}.`);
    }
  });

  return (
    <div className="insights">
      <h2>Insights</h2>
    <div className="insights-cards">
      {/* 👉 Highest Spending */}
      {highest && (
        <div className="card">
          <h3 d>Highest Spending Category</h3>
          <p>{highest[0]} (₹{highest[1]})</p>
        </div>
      )}

      {/* 👉 Monthly Comparison */}
      <div className="card">
        <h3>Monthly Summary</h3>
        {months.map(m => (
          <p key={m}>
            {m} → Income: ₹{monthly[m].income} | Expense: ₹{monthly[m].expense}
          </p>
        ))}
      </div>
      </div>

      {/* 👉 Observations */}
      <div className="card">
        <h3>Observations</h3>
        <ul>
          {insights.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
      
    </div>
  );
}