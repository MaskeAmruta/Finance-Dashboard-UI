import { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import AddTransaction from "./AddTransaction";

export default function Transactions() {
  const {
    transactions,
    deleteTransaction,
    updateTransaction,
    role,
    filter,
    setFilter
  } = useContext(AppContext);

  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({});
  const [showForm, setShowForm] = useState(false);

  const filtered = transactions.filter(t =>
    t.category.toLowerCase().includes(filter.toLowerCase())
  );

  const handleEdit = (t) => {
    setEditId(t.id);
    setEditData(t);
  };

  const handleUpdate = () => {
    updateTransaction(editData);
    setEditId(null);
  };

  return (
        
    <div className="transaction-container">
      
       <div className="search-add">
        <h2>Transactions</h2> 
          <input
            placeholder="Search..."
            onChange={(e) => setFilter(e.target.value)}
          />
          {role === "admin" && <button className="addTrnsaction" 
            onClick={()=>setShowForm(true)}>Add Transaction</button>}

              {showForm && ( 
                   <AddTransaction closeForm={()=> setShowForm(false)} />
              )}


      </div>
      <table className="transaction-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Amount</th>
            <th>Category</th>
            <th>Type</th>
            {role === "admin" && <th>Actions</th>}
          </tr>
        </thead>

        <tbody>
          {filtered.map(t => (
            <tr key={t.id}>
              {editId === t.id ? (
                <>
                  <td>{t.date}</td>

                  <td>
                    <input
                      value={editData.amount}
                      onChange={(e) =>
                        setEditData({ ...editData, amount: Number(e.target.value) })
                      }
                    />
                  </td>

                  <td>
                    <input
                      value={editData.category}
                      onChange={(e) =>
                        setEditData({ ...editData, category: e.target.value })
                      }
                    />
                  </td>

                  <td>{t.type}</td>

                  <td>
                    <button onClick={handleUpdate}>Save</button>
                  </td>
                </>
              ) : (
                <>
                  <td>{t.date}</td>
                  <td>₹{t.amount}</td>
                  <td>{t.category}</td>
                  <td>{t.type}</td>

                  {role === "admin" && (
                    <td>
                      <button onClick={() => handleEdit(t)}>Edit</button>
                      <button onClick={() => deleteTransaction(t.id)}>Delete</button>
                    </td>
                  )}
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}