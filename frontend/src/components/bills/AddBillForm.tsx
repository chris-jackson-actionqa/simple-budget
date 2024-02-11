import { Formik, Form, Field, ErrorMessage } from "formik";
import { Container, FormGroup, Label, Input, Button } from "reactstrap";
import { useDispatch } from "react-redux";
import { addBill } from "../../features/bills/billsSlice";
import { validateAddBillForm } from "../../common/validateAddBillForm";

const AddBillForm = () => {
  const dispatch = useDispatch();

  function handleAddBill(values, { resetForm }) {
    const newBill = {
      name: values.billName,
      amount: values.billAmount,
      date: values.billDate,
    };
    dispatch(addBill(newBill));
    resetForm();
  }

  return (
    <Container>
      <Formik
        initialValues={{ billName: "", billAmount: "", billDate: "" }}
        onSubmit={handleAddBill}
        validate={validateAddBillForm}>
        <Form className="border border-black px-2 rounded">
          <h3>Add new bill</h3>
          <FormGroup>
            <Label for="billName">Name</Label>
            <Field
              id="billName"
              name="billName"
              type="text"
              className="form-control"
            />
            <ErrorMessage
              name="billName"
              component="div"
              className="text-danger"
            />
          </FormGroup>
          <FormGroup>
            <Label for="billAmount">Amount</Label>
            <Field
              id="billAmount"
              name="billAmount"
              type="number"
              className="form-control"
            />
            <ErrorMessage
              name="billAmount"
              component="div"
              className="text-danger"
            />
          </FormGroup>
          <FormGroup>
            <Label for="billDate">Day of Month</Label>
            <Field
              id="billDate"
              name="billDate"
              type="number"
              min="1"
              max="31"
              className="form-control"
            />
            <ErrorMessage
              name="billDate"
              component="div"
              className="text-danger"
            />
          </FormGroup>
          <FormGroup>
            <Button color="primary">Add</Button>
          </FormGroup>
        </Form>
      </Formik>
    </Container>
  );
};

export default AddBillForm;
