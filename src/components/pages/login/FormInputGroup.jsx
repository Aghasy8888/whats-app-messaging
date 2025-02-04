import PropTypes from 'prop-types';
import { useState } from 'react';
import { InputWithTitle } from '../../../common';

const FormInputGroup = ({
  validationErrors,
  formValues,
  handleChange,
  inputRef,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex flex-col gap-7">
      <InputWithTitle
        autoComplete="username"
        handleChange={handleChange}
        inputValue={formValues.idInstance}
        error={validationErrors.idInstance}
        name="idInstance"
        inputRef={inputRef}
        title="Id Instance"
        type="text"
        required
      />

      <InputWithTitle
        autoComplete="current-password"
        handleChange={handleChange}
        setShowPassword={setShowPassword}
        inputValue={formValues.apiTokenInstance}
        error={validationErrors.apiTokenInstance}
        name="apiTokenInstance"
        title="API Token Instance"
        showPassword={showPassword}
        type={showPassword ? 'text' : 'password'}
        required
      />
    </div>
  );
};

FormInputGroup.propTypes = {
  validationErrors: PropTypes.shape({
    idInstance: PropTypes.string,
    apiTokenInstance: PropTypes.string,
  }),
  formValues: PropTypes.shape({
    idInstance: PropTypes.string.isRequired,
    apiTokenInstance: PropTypes.string.isRequired,
  }).isRequired,
  handleChange: PropTypes.func.isRequired,
  inputRef: PropTypes.object,
};

export default FormInputGroup;
