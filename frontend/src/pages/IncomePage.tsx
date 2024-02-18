import { Formik, Form, Field, ErrorMessage } from "formik";
import { Container, FormGroup, Label, Button } from "reactstrap";

const IncomePage = () => {
  return (
    <Container>
      <h1>Income</h1>
      <Formik>
        <Form>
          <FormGroup>
            <Label for="incomeNumRecurrance">I get paid every</Label>
            <Field
              id="incomeNumRecurrance"
              name="incomeNumRecurrance"
              type="number"
              className="form-control"
              value={2}
            />
            <ErrorMessage
              name="incomeNumRecurrance"
              component="div"
              className="text-danger"
            />

            <Field name="incomeRecurrance" as="select">
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
