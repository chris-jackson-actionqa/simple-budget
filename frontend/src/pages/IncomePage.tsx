import { Formik, Form, Field, ErrorMessage } from "formik";
import { Container, FormGroup, Label, Button } from "reactstrap";
import { updateIncome, selectIncome } from "../features/income/incomeSlice";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";

const IncomePage = () => {
  const income = useSelector(selectIncome);
  const dispatch = useDispatch();
  const [theIncome] = useState({ ...income });

  return (
    <Container>
      <h1>Income</h1>
      <Formik
        initialValues={{
          incomeNumRecurrance: theIncome.numRecurrance,
          incomeRecurrance: theIncome.recurrance,
          incomeStartDate: theIncome.startDate,
        }}
        onSubmit={(values) => {
          console.log("values", values);
          const updatedIncome = {
            numRecurrance: values.incomeNumRecurrance,
            recurrance: values.incomeRecurrance,
            startDate: values.incomeStartDate,
          };

          dispatch(updateIncome(updatedIncome));
        }}>
        <Form>
          <FormGroup>
            <Label for="incomeNumRecurrance">I get paid every</Label>
            <Field
              id="incomeNumRecurrance"
              name="incomeNumRecurrance"
              type="number"
              className="form-control"
            />
            <ErrorMessage
              name="incomeNumRecurrance"
              component="div"
              className="text-danger"
            />

            <Field name="incomeRecurrance" as="select" className="form-control">
              <option value="weeks">Weeks</option>
            </Field>
          </FormGroup>
          <FormGroup>
            <Label for="incomeStartDate">Starting on</Label>
            <Field
              id="incomeStartDate"
              name="incomeStartDate"
              type="date"
              className="form-control"
            />
            <ErrorMessage
              name="incomeStartDate"
              component="div"
              className="text-danger"
            />
          </FormGroup>
          <Button type="submit" color="primary">
            Update
          </Button>
        </Form>
      </Formik>
    </Container>
  );
};

export default IncomePage;
