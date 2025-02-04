import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setUserAuth } from '../redux/features/auth/authSlice';
import { checkLoginStatus } from '../helpers/auth';

const useCheckLoginStatus = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const isAuthenticated = checkLoginStatus();

    if (isAuthenticated) {
      dispatch(setUserAuth(true));
    } else {
      dispatch(setUserAuth(false));
    }
  }, []);
};

export default useCheckLoginStatus;
