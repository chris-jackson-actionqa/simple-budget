import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import BillsPage from "./pages/BillsPage";
import Header from "./components/Header";
import EditBillPage from "./pages/EditBillPage";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="bills" element={<BillsPage />} />
        <Route path="/bills/:billId/edit" element={<EditBillPage />} />
      </Routes>
    </>
  );
}

export default App;
