import { Link } from "react-router-dom";
import { Row, Col } from "reactstrap";
import { Bill as BillType } from "../../common/types";
import { useSelector } from "react-redux";
import { selectBillById } from "../../features/bills/billsSlice";

const Bill = ({ billId }: { billId: string }) => {
  const bill: BillType = useSelector(selectBillById(parseInt(billId)));

  return (
    <Row key={billId} className="border border-black" data-testid={"bill-row"}>
      <Col className="border">
        <Link to={`/bills/${bill.id}/edit`}>{bill.name}</Link>
      </Col>
      <Col className="border">${bill.amount}</Col>
      <Col className="border">{bill.date}</Col>
    </Row>
  );
};

export default Bill;
