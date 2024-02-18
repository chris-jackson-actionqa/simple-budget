import { Container, FormGroup, Label, Button } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import {
  selectBillById,
  removeBill,
  updateBill,
} from "../../features/bills/billsSlice";
import { validateAddBillForm } from "../../common/validateAddBillForm";

const EditBill = ({ billId }: { billId: string }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const foundBill = useSelector(selectBillById(parseInt(billId)));
  const [theBill] = useState({ ...foundBill });
  const [doneEditing, setDoneEditing] = useState(false);

  const handleEditBill = (values: {
    billName: string;
    billAmount: number;
    billDate: number;
  }) => {
    console.log("handleEditBill: billId", billId);
    const updatedBill = {
      id: parseInt(billId),
      name: values.billName,
      amount: values.billAmount,
      date: values.billDate,
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
      <Formik
        initialValues={{
          billName: theBill.name,
          billAmount: theBill.amount,
          billDate: theBill.date,
        }}
        onSubmit={handleEditBill}
        validate={validateAddBillForm}>
        <Form className="border border-black px-2 rounded">
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
          <Button color="secondary" onClick={() => setDoneEditing(true)}>
            Cancel
          </Button>
          <Button type="submit" color="primary">
            Save
          </Button>
          <Button color="danger" onClick={handleDeleteBill}>
            Delete
          </Button>
        </Form>
      </Formik>
    </Container>
  );
};

export default EditBill;
