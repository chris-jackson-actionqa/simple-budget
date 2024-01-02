import { Container, Row, Col } from "reactstrap";
import Bill from "./Bill";

const BillsList = ({ bills, setBills }) => {
  return (
    <Container className="mt-5">
      <h2>Bills</h2>
      <Row className="border border-black">
        <Col className="border">Name</Col>
        <Col className="border">Amount</Col>
        <Col className="border">Day of Month</Col>
      </Row>
      {bills.map((bill) => (
        <Bill key={bill.id} bill={bill} setBills={setBills} />
      ))}
    </Container>
  );
};
export default BillsList;
