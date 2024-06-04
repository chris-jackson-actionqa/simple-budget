import { Routes, Route } from "react-router-dom";
// import HomePage from "./pages/HomePage";
import BillsPage from "./pages/BillsPage";
import Header from "./components/Header";
import EditBillPage from "./pages/EditBillPage";
import IncomePage from "./pages/IncomePage";
import BudgetPage from "./pages/BudgetPage";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<BillsPage />} />
        <Route path="bills" element={<BillsPage />} />
        <Route path="/bills/:billId/edit" element={<EditBillPage />} />
        <Route path="/income" element={<IncomePage />} />
        <Route path="/budget" element={<BudgetPage />} />
      </Routes>
    </>
  );
}

export default App;
