import { Container, Form, FormGroup, Label, Input, Button } from "reactstrap";
import { useDispatch } from "react-redux";
import { addBill } from "../../features/bills/billsSlice";

const AddBillForm = () => {
  const dispatch = useDispatch();

  function handleAddBill(event) {
    event.preventDefault();
    const newBill = {
      name: event.target.billName.value,
      amount: event.target.billAmount.value,
      date: event.target.billDate.value,
    };
    dispatch(addBill(newBill));
    event.target.reset();
  }

  return (
    <Container>
      <Form
        onSubmit={handleAddBill}
        className="border border-black px-2 rounded">
        <h3>Add new bill</h3>
        <FormGroup>
          <Label for="billName">Name</Label>
          <Input id="billName" name="billName" type="text" />
        </FormGroup>
        <FormGroup>
          <Label for="billAmount">Amount</Label>
          <Input id="billAmount" name="billAmount" type="number" />
        </FormGroup>
        <FormGroup>
          <Label for="billDate">Day of Month</Label>
          <Input id="billDate" name="billDate" type="number" min="1" max="31" />
        </FormGroup>
        <FormGroup>
          <Button color="primary">Add</Button>
        </FormGroup>
      </Form>
    </Container>
  );
};

export default AddBillForm;
