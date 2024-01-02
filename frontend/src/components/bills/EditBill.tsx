import { Container, Form, FormGroup, Label, Input, Button } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const EditBill = ({ bills, setBills, billId }) => {
  const navigate = useNavigate();
  const foundBill = bills.find((bill) => bill.id === parseInt(billId));
  const [theBill, setBill] = useState({ ...foundBill });

  const handleEditBill = (event) => {
    event.preventDefault();
    const updatedBill = {
      id: theBill.id,
      name: theBill.name,
      amount: theBill.amount,
      date: theBill.date,
    };
    const updatedBills = bills.map((bill) =>
      bill.id === parseInt(billId) ? updatedBill : bill
    );
    setBills(updatedBills);
    navigate(`/bills/${billId}`);
  };

  return (
    <Container className="">
      <h1>Edit {theBill.name}</h1>
      <Form
        onSubmit={handleEditBill}
        className="border border-black px-2 rounded">
        <FormGroup>
          <Label for="billName">Name</Label>
          <Input
            id="billName"
            name="billName"
            type="text"
            value={theBill.name}
            onChange={(event) =>
              setBill({ ...theBill, name: event.target.value })
            }
          />
        </FormGroup>
        <FormGroup>
          <Label for="billAmount">Amount</Label>
          <Input
            id="billAmount"
            name="billAmount"
            type="number"
            value={theBill.amount}
            onChange={(event) =>
              setBill({ ...theBill, amount: event.target.value })
            }
          />
        </FormGroup>
        <FormGroup>
          <Label for="billDate">Day of Month</Label>
          <Input
            id="billDate"
            name="billDate"
            type="number"
            min="1"
            max="31"
            value={theBill.date}
            onChange={(event) =>
              setBill({ ...theBill, date: event.target.value })
            }
          />
        </FormGroup>
        <Button color="secondary" onClick={() => navigate(`/bills/${billId}`)}>
          Cancel
        </Button>
        <Button color="primary">Save</Button>
      </Form>
    </Container>
  );
};

export default EditBill;
