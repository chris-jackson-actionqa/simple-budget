import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import BillsPage from "./pages/BillsPage";
import Header from "./components/Header";
import { useState } from "react";
import TESTBILLS from "./assets/testData/TESTBILLS";
import EditBillPage from "./pages/EditBillPage";

function App() {
  const [bills, setBills] = useState(TESTBILLS);
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="bills"
          element={<BillsPage bills={bills} setBills={setBills} />}
        />
        <Route
          path="/bills/:billId/edit"
          element={<EditBillPage bills={bills} setBills={setBills} />}
        />
      </Routes>
    </>
  );
}

export default App;
