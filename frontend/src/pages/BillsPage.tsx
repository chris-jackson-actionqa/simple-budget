import { useState } from "react";
import AddBillForm from "../components/bills/AddBillForm";
import BillsList from "../components/bills/BillsList";

const BillsPage = () => {
  const [bills, setBills] = useState([]);
  return (
    <>
      <AddBillForm bills={bills} setBills={setBills} />
      <BillsList bills={bills} />
    </>
  );
};

export default BillsPage;
