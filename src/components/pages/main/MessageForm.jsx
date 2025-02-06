import { useRef, useState } from 'react';
import { sendIcon } from '../../../assets';
import { Input } from '../../../common';
import useFocusRef from '../../../hooks/useFocusRef';
import { useDispatch, useSelector } from 'react-redux';
import { sendMessage } from '../../../redux/features/message/messageService';
import { selectChatId } from '../../../redux/features/message/messageSlice';
import {
  selectApiTokenInstance,
  selectIdInstance,
} from '../../../redux/features/auth/authSlice';

const MessageForm = () => {
  const dispatch = useDispatch();
  const chatId = useSelector(selectChatId);
  const idInstance = useSelector(selectIdInstance);
  const apiTokenInstance = useSelector(selectApiTokenInstance);

  const [message, setMessage] = useState('');
  const textInputRef = useRef(null);
  useFocusRef(textInputRef, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message) return;
    dispatch(
      sendMessage({
        chatId,
        idInstance,
        apiTokenInstance,
        message,
      })
    );

    setMessage('');
  };

  const changeHandler = (e) => {
    setMessage(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-row items-center w-full">
      <Input
        changeHandler={changeHandler}
        placeholder="Введите сообщение"
        className="min-h-5 w-full mx-2 my-[5px] px-3 py-2 bg-black_2 text-whiteV1 rounded-lg"
        inputValue={message}
        ref={textInputRef}
      />

      <button type="submit">
        <img src={sendIcon} className="w-6 h-6" alt="Send" />
      </button>
    </form>
  );
};

export default MessageForm;
