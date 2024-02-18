import { Routes, Route } from "react-router-dom";
// import HomePage from "./pages/HomePage";
import BillsPage from "./pages/BillsPage";
import Header from "./components/Header";
import EditBillPage from "./pages/EditBillPage";
import IncomePage from "./pages/IncomePage";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<BillsPage />} />
        <Route path="bills" element={<BillsPage />} />
        <Route path="/bills/:billId/edit" element={<EditBillPage />} />
        <Route path="/income" element={<IncomePage />} />
      </Routes>
    </>
  );
}

export default App;
