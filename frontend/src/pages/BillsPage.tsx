import AddBillForm from "../components/bills/AddBillForm";
import BillsList from "../components/bills/BillsList";

const BillsPage = ({ bills, setBills }) => {
  return (
    <>
      <AddBillForm bills={bills} setBills={setBills} />
      <BillsList bills={bills} setBills={setBills} />
    </>
  );
};

export default BillsPage;
