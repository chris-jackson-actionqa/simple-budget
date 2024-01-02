import { useParams, useNavigate } from "react-router-dom";
import { Col, Container, Row, Button } from "reactstrap";

const BillPage = ({ bills, setBills }) => {
  const navigate = useNavigate();
  const { billId } = useParams();
  if (!billId) return <div>Bill not found</div>;
  const theBill = bills.find((bill) => bill.id === parseInt(billId));
  if (!theBill) return <div>Bill not found</div>;

  const deleteBill = () => {
    const updatedBills = bills.filter((bill) => bill.id !== parseInt(billId));
    setBills(updatedBills);
  };

  const handleDeleteBill = () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this bill?"
    );
    if (confirmDelete) {
      deleteBill();
      navigate("/bills");
    }
  };

  const handleEditBill = () => {
    navigate(`/bills/${billId}/edit`);
  };

  return (
    <Container className="text-center">
      <h1>{theBill.name}</h1>
      <Row className="">
        <Col className="text-end">
          <span>Amount:</span>
        </Col>
        <Col className="text-start">
          <span>${theBill.amount}</span>
        </Col>
      </Row>
      <Row className="">
        <Col className="text-end">
          <span>Day of month:</span>
        </Col>
        <Col className="text-start">
          <span>{theBill.date}</span>
        </Col>
      </Row>
      <Row>
        <Col className="text-end">
          <Button color="primary" onClick={handleEditBill}>
            Edit
          </Button>
        </Col>
        <Col className="text-start">
          <Button color="danger" onClick={handleDeleteBill}>
            Delete
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default BillPage;
