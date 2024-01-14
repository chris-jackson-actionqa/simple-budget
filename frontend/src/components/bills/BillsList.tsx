import { Container, Row, Col } from "reactstrap";
import Bill from "./Bill";
import { Bill as BillType } from "../../common/types";
import { useSelector } from "react-redux";
import { selectBills } from "../../features/bills/billsSlice";

const BillsList = () => {
  const bills: Array<BillType> = useSelector(selectBills);
  return (
    <Container className="mt-5">
      <h2>Bills</h2>
      <Row className="border border-black">
        <Col className="border">Name</Col>
        <Col className="border">Amount</Col>
        <Col className="border">Day of Month</Col>
      </Row>
      {bills.map((bill: BillType) => (
        <Bill key={`${bill.id}`} billId={`${bill.id}`} />
      ))}
    </Container>
  );
};
export default BillsList;
