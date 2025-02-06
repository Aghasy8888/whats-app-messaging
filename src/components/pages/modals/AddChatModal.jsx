import { useRef, useState } from 'react';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { ModalWrapper } from '.';
import { CREATE_CHAT, ENTER_PHONE_NUMBER } from '../../../../constants';
import { phoneNumberValidationSchema } from '../../../helpers/validationSchemas';
import { Button_1, Input } from '../../../common';
import useFocusRef from '../../../hooks/useFocusRef';
import { formatTel } from '../../../helpers';
import { openChat } from '../../../redux/features/message/messageService';
import {
  selectApiTokenInstance,
  selectIdInstance,
} from '../../../redux/features/auth/authSlice';

const AddChatModal = ({ setModalIsOpen }) => {
  const dispatch = useDispatch();
  const [phoneNumber, setPhoneNumber] = useState('+');
  const [phoneError, setPhoneError] = useState(null);
  const idInstance = useSelector(selectIdInstance);
  const apiTokenInstance = useSelector(selectApiTokenInstance);

  const phoneInputRef = useRef(null);
  useFocusRef(phoneInputRef, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setPhoneError(null);

      await phoneNumberValidationSchema.validate(
        { phoneNumber },
        { abortEarly: false }
      );

      const formattedPhone = phoneNumber.replace(/\D/g, '');
      const chatId = `${formattedPhone}@c.us`;

      dispatch(
        openChat({
          chatId,
          idInstance,
          apiTokenInstance,
          phoneNumber: formattedPhone,
        })
      );
      setModalIsOpen(false);
      setPhoneNumber('');
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        error.inner.forEach((err) => {
          if (err.path === 'phoneNumber') setPhoneError(err.message);
        });
      }
    }
  };

  const handleChange = (e) => {
    const limitedInput = formatTel(e.target.value);
    setPhoneNumber(`${limitedInput.includes('+') ? '' : '+'}${limitedInput}`);
  };

  return (
    <ModalWrapper>
      <p className="mb-5 text-whiteV1 text-[14px]">{ENTER_PHONE_NUMBER}</p>
      <form className="relative" onSubmit={handleSubmit}>
        <Input
          autoComplete="tel"
          className="bg-black_2 mb-6 text-whiteV1 py-2 px-3 my-[5px] rounded-[8px] w-[100%] max-w-[250px] min-h-5"
          changeHandler={handleChange}
          inputValue={phoneNumber}
          name={name}
          type="tel"
          placeholder="Номер телефона"
          ref={phoneInputRef}
          required={true}
        />

        <div className="font-bold text-red-600 absolute bottom-10 left-2">
          {phoneError}
        </div>

        <div className="flex justify-between gap-4 mt-5 sm:justify-end ">
          <Button_1 setModalIsOpen={() => setModalIsOpen(false)} title="Отмена" />
          <input
            type="submit"
            value={CREATE_CHAT}
            className="text-[14px] rounded-3xl font-medium py-2 px-6 text-black_1 bg-green hover:bg-greenV_3"
          />
        </div>
      </form>
    </ModalWrapper>
  );
};

AddChatModal.propTypes = {
  setModalIsOpen: PropTypes.func.isRequired,
};

export default AddChatModal;
