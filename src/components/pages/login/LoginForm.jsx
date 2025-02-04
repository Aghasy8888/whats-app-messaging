import { useRef, useState } from 'react';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { FormInputGroup } from './';
import { loginValidationSchema } from '../../../helpers/validationSchemas';
import { loginDefaultValues } from '../../../data';
import useFocusRef from '../../../hooks/useFocusRef';
import { whatsAppIcon } from '../../../assets';
import { login } from '../../../redux/features/auth/userService';

const LoginForm = () => {
  const dispatch = useDispatch();
  const [formValues, setFormValues] = useState(loginDefaultValues);
  const [validationErrors, setValidationErrors] = useState({});
  const emailInputRef = useRef(null);
  useFocusRef(emailInputRef, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { idInstance, apiTokenInstance } = formValues;
    
    
    try {
      await loginValidationSchema.validate(formValues, {
        abortEarly: false,
      });
      const loginValues = {
        idInstance,
        apiTokenInstance,
      };
    
      
      dispatch(login({ data: loginValues }));
      setValidationErrors({});
    } catch (error) {
      if (Yup.ValidationError.isError(error)) {
        const errors = {};
        error.inner.forEach((err) => {
          if (err.path) {
            const key = err.path;
            errors[key] = err.message;
          }
        });
        setValidationErrors(errors);
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  return (
    <section className="flex flex-col gap-8 justify-center  sm:w-1/2 max-w-96">
      <header className='flex gap-4 justify-center items-center'>
        <img src={whatsAppIcon} alt="whatsAppIcon" className="w-9 h-9" />
        <h2 className='font-bold text-2xl'>WhatsApp</h2>
      </header>

      <form
        noValidate
        className="flex flex-col justify-center gap-6 text-[13px] w-full"
        onSubmit={handleSubmit}
      >
        <FormInputGroup
          formValues={formValues}
          handleChange={handleChange}
          validationErrors={validationErrors}
          inputRef={emailInputRef}
        />

        <button
          className="w-full bg-darkGray rounded-lg py-4 text-white"
          onClick={handleSubmit}
        >
          CONTINUE
        </button>
      </form>
    </section>
  );
};

export default LoginForm;
