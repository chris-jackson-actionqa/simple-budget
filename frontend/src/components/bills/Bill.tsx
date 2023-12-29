import { Link } from "react-router-dom";
import { Row, Col } from "reactstrap";

const Bill = ({ bill }) => (
  <Row key={bill.id} className="border border-black">
    <Col className="border">
      <Link to={`/bills/${bill.id}`}>{bill.name}</Link>
    </Col>
    <Col className="border">${bill.amount}</Col>
    <Col className="border">{bill.date}</Col>
  </Row>
);

export default Bill;
