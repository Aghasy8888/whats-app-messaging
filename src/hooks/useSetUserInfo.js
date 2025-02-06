import { useEffect } from 'react';
import { setUserInfo } from '../redux/features/auth/authSlice';
import getItemFromStorage from '../helpers/getItemsFromStorage';
import { useDispatch } from 'react-redux';

const useSetUserInfo = () => {
  const dispatch = useDispatch();
  const idInstance = getItemFromStorage('idInstance');
  const apiTokenInstance = getItemFromStorage('apiTokenInstance');

  useEffect(() => {
    dispatch(setUserInfo({ idInstance, apiTokenInstance }));
  }, []);
};

export default useSetUserInfo;
