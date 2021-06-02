import * as yup from 'yup';

export const itemSchema = yup.object().shape({
  name: yup.string().required(),
  price: yup.number().required().positive().integer(),
  initialAmount: yup.number().positive().integer()
});