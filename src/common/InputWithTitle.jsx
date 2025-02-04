import { useState } from 'react';
import PropTypes from 'prop-types';
import { Input } from '../common';
import { eyeIcon, eyeOff } from '../assets';

const InputWithTitle = ({
  autoComplete,
  handleChange,
  inputValue,
  inputRef,
  title,
  showPassword,
  setShowPassword,
  required = false,
  error = '',
  name = '',
  type = 'text',
}) => {
  const [isFocused, setIsFocused] = useState(false);
  
  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);
  const onShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="relative">
      <Input
        autoComplete={autoComplete}
        className="text-black py-4 px-4 pr-8 rounded-md w-[100%] border border-whiteV1 focus:border-middleGray border-solid border-1"
        changeHandler={handleChange}
        inputValue={inputValue}
        name={name}
        placeholder={title}
        type={type}
        ref={inputRef}
        required={required}
        handleFocus={handleFocus}
        handleBlur={handleBlur}
      />

      <span
        className={`absolute text-sm bg-slate-100  px-2 -top-2.5 left-2 transition-colors duration-200 
      ${isFocused ? 'text-middleGray' : 'text-whiteV2'}`}
      >
        {title}
      </span>
      <div className="absolute text-[12px] text-red-600">{error}</div>
      {(type === 'password' || (type === 'text' && showPassword)) && (
        <img
          role="button"
          onClick={onShowPassword}
          className="absolute w-4 h-4 right-2 top-[18px]"
          src={showPassword ? eyeIcon : eyeOff}
          alt="eye-Icon"
        />
      )}
    </div>
  );
};

InputWithTitle.propTypes = {
  autoComplete: PropTypes.string,
  title: PropTypes.string.isRequired,
  inputValue: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  setShowPassword: PropTypes.func,
  inputRef: PropTypes.object,
  type: PropTypes.string,
  name: PropTypes.string,
  error: PropTypes.string,
  showPassword: PropTypes.bool,
  required: PropTypes.bool,
};

export default InputWithTitle;
