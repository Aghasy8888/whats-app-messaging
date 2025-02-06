import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { receiveMessages } from '../redux/features/message/messageService';
import {
  selectApiTokenInstance,
  selectIdInstance,
} from '../redux/features/auth/authSlice';
import { selectChatId } from '../redux/features/message/messageSlice';

const useReceiveNotifications = () => {
  const dispatch = useDispatch();
  const idInstance = useSelector(selectIdInstance);
  const apiTokenInstance = useSelector(selectApiTokenInstance);
  const chatId = useSelector(selectChatId);

  useEffect(() => {
    if (!chatId) return;

    const interval = setInterval(() => {
      dispatch(receiveMessages({ idInstance, apiTokenInstance, chatId }));
    }, 5000);

    return () => clearInterval(interval);
  }, [dispatch, idInstance, apiTokenInstance, chatId]);
};

export default useReceiveNotifications;
