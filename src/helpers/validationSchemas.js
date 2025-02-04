import * as Yup from 'yup';

export const loginValidationSchema = Yup.object().shape({
  idInstance: Yup.string().required('idInstance обязателен'),
  apiTokenInstance: Yup.string().required('apiTokenInstance обязателен'),
});

export const phoneNumberValidationSchema = Yup.object().shape({
  phoneNumber: Yup.string()
    .test('has-digits', 'Номер телефона обязателен', (value) => {
      return value && value.replace(/\+/g, '').length > 0;
    })
});
