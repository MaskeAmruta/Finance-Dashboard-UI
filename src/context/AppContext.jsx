import { createContext, useState } from "react";
import { initialTransactions } from "../assets/deta"

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [transactions, setTransactions] = useState(initialTransactions);
  const [role, setRole] = useState("viewer");
  const [filter, setFilter] = useState("");

  const addTransaction = (tx) => {
    setTransactions([...transactions, tx]);
  };

  const deleteTransaction = (id) => {
    setTransactions(transactions.filter(t => t.id !== id));
  };

  const updateTransaction = (updatedTx) => {
    setTransactions(
      transactions.map(t => t.id === updatedTx.id ? updatedTx : t)
    );
  };

  return (
    <AppContext.Provider
      value={{
        transactions,
        addTransaction,
        deleteTransaction,
        updateTransaction,
        role,
        setRole,
        filter,
        setFilter
      }}
    >
      {children}
    </AppContext.Provider>
  );
};