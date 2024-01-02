import { useParams } from "react-router-dom";
import EditBill from "../components/bills/EditBill";

const EditBillPage = ({ bills, setBills }) => {
  const { billId } = useParams();
  if (!billId) return <div>Bill not found</div>;
  return (
    <>
      <EditBill bills={bills} setBills={setBills} billId={billId} />
    </>
  );
};

export default EditBillPage;
