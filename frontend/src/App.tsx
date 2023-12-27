import { useState } from "react";
import AddBillForm from "./components/bills/AddBillForm";
import BillsList from "./components/bills/BillsList";

function App() {
  const [bills, setBills] = useState([]);
  return (
    <>
      <header>
        <h1>Simple Budget</h1>
      </header>

      <AddBillForm bills={bills} setBills={setBills} />
      <BillsList bills={bills} />
    </>
  );
}

export default App;
