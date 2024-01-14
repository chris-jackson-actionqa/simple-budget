import { Container, Form, FormGroup, Label, Input, Button } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectBillById,
  removeBill,
  updateBill,
} from "../../features/bills/billsSlice";

const EditBill = ({ billId }: { billId: string }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const foundBill = useSelector(selectBillById(parseInt(billId)));
  const [theBill, setBill] = useState({ ...foundBill });
  const [doneEditing, setDoneEditing] = useState(false);

  const handleEditBill = (event) => {
    event.preventDefault();
    const updatedBill = {
      id: theBill.id,
      name: theBill.name,
      amount: theBill.amount,
      date: theBill.date,
    };
    dispatch(updateBill(updatedBill));
    setDoneEditing(true);
  };

  const deleteBill = () => {
    dispatch(removeBill(parseInt(billId)));
  };

  const handleDeleteBill = () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this bill?"
    );
    if (confirmDelete) {
      deleteBill();
      setDoneEditing(true);
    }
  };

  useEffect(() => {
    if (doneEditing) {
      navigate("/bills");
    }
  }, [doneEditing]);

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
        <Button color="secondary" onClick={() => setDoneEditing(true)}>
          Cancel
        </Button>
        <Button color="primary">Save</Button>
        <Button color="danger" onClick={handleDeleteBill}>
          Delete
        </Button>
      </Form>
    </Container>
  );
};

export default EditBill;
