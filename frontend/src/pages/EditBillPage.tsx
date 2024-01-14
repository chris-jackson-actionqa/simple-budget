import { useParams } from "react-router-dom";
import EditBill from "../components/bills/EditBill";

const EditBillPage = () => {
  const { billId } = useParams();
  if (!billId) return <div>Bill not found</div>;
  return (
    <>
      <EditBill billId={billId} />
    </>
  );
};

export default EditBillPage;
