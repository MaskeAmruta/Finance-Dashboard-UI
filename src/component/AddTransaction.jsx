import { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import { v4 as uuidv4 } from "uuid";

export default function AddTransaction({closeForm}) {
  const { addTransaction, role } = useContext(AppContext);

  const [form, setForm] = useState({
    date: "",
    amount: "",
    category: "",
    type: "expense"
  });

  if (role !== "admin") return null; // ❌ hide for viewer

  const handleSubmit = (e) => {
    e.preventDefault();

    addTransaction({
      id: uuidv4(),
      ...form,
      amount: Number(form.amount)
    });
    closeForm();

    setForm({ date: "", amount: "", category: "", type: "expense" });
  };

  return (
    <div className="form-container">
          
        <form onSubmit={handleSubmit}>
          <h3>Add Transaction</h3>

          <input type="date"
            value={form.date}
            onChange={e => setForm({...form, date: e.target.value})}
            required
          />

          <input type="number" placeholder="Amount"
            value={form.amount}
            onChange={e => setForm({...form, amount: e.target.value})}
            required
          />

          <input type="text" placeholder="Category"
            value={form.category}
            onChange={e => setForm({...form, category: e.target.value})}
            required
          />

          <select 
            value={form.type}
            onChange={e => setForm({...form, type: e.target.value})}
          >
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>

          <button className="add-btn" type="submit">Add</button>
          <button className="close-btn" onClick={closeForm}>Close</button>
        </form>
    </div>
  );
}