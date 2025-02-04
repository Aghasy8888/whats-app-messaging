import { forwardRef } from 'react';
import PropTypes from 'prop-types';

const Input = forwardRef(
  (
    {
      autoComplete,
      changeHandler,
      handleFocus,
      handleBlur,
      className,
      placeholder = '',
      inputValue,
      required = false,
      name = '',
      type = 'text',
    },
    ref
  ) => {
    return (
      <input
        type={type}
        name={name}
        className={className}
        placeholder={placeholder}
        onChange={changeHandler}
        value={inputValue ? inputValue : ''}
        required={required}
        ref={ref}
        autoComplete={autoComplete}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
    );
  }
);

Input.displayName = 'Input';

Input.propTypes = {
  changeHandler: PropTypes.func.isRequired,
  handleFocus: PropTypes.func,
  handleBlur: PropTypes.func,
  autoComplete: PropTypes.string,
  className: PropTypes.string,
  placeholder: PropTypes.string,
  inputValue: PropTypes.string,
  required: PropTypes.bool,
  type: PropTypes.string,
  name: PropTypes.string,
};

export default Input;
