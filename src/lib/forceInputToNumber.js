const forceInputToNumber = (value) => {
  return value.replace(/\D/g, '');
};

export default forceInputToNumber;