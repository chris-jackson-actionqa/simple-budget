export const validateAddBillForm = (values) => {
  const errors = {};

  if (!values.billName) {
    errors.billName = "Required";
  }

  return errors;
};
