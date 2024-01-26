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
  } else if (isNaN(Number(values.billDate))) {
    errors.billDate = "Must be a number";
  } else if (!Number.isInteger(Number(values.billDate))) {
    errors.billDate = "Must be a whole number";
  } else if (Number(values.billDate) <= 0 || Number(values.billDate) > 31) {
    errors.billDate = "Must be between 1 and 31";
  } else if (!Number.isInteger(Number(values.billDate))) {
    errors.billDate = "Must be a whole number";
  }

  return errors;
};
