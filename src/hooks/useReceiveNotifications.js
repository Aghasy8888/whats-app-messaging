import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { receiveMessages } from '../redux/features/message/messageService';
import {
  selectApiTokenInstance,
  selectIdInstance,
} from '../redux/features/auth/authSlice';

const useReceiveNotifications = () => {
  const idInstance = useSelector(selectIdInstance);
  const apiTokenInstance = useSelector(selectApiTokenInstance);

  const dispatch = useDispatch();

  useEffect(() => {
    // const interval = setInterval(() => {
    //   dispatch(receiveMessages({ idInstance, apiTokenInstance }));
    // }, 5000);

    // return () => clearInterval(interval);
  }, [dispatch, idInstance, apiTokenInstance]);
};

export default useReceiveNotifications;
