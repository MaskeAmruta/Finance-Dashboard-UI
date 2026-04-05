import { AppProvider } from "./context/AppContext";

import "./App.css";
import Dashboard from "./component/Dashboard";

function App() {
  return (
    <AppProvider>
      <Dashboard />
    </AppProvider>
  );
}

export default App;