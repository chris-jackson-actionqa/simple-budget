export const validateAddBillForm = (values) => {
  const errors = {};

  if (!values.billName) {
    errors.billName = "Required";
  } else if (values.billName.length > 30) {
    errors.billName = "Must be 30 characters or less";
  }

  if (!values.billAmount) {
    errors.billAmount = "Required";
  } else if (isNaN(Number(values.billAmount))) {
    errors.billAmount = "Must be a number";
  } else if (Number(values.billAmount) <= 0) {
    errors.billAmount = "Must be greater than 0";
  } else if (Number(values.billAmount) > 1_000_000_000) {
    errors.billAmount = "Must be less than 1,000,000,000"; // 1 billion
  }

  if (!values.billDate) {
    errors.billDate = "Required";
  }

  return errors;
};
