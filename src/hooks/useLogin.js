import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { LOGIN_SUCCESS_MESSAGE } from '../../constants';
import { selectSuccessMessage } from '../redux/features/general/generalSlice';

const useLogin = () => {
  const navigate = useNavigate();
  const successMessage = useSelector(selectSuccessMessage);

  useEffect(() => {
    if (successMessage === LOGIN_SUCCESS_MESSAGE) {
      navigate('/dashboard');
    }
  }, [successMessage]);
};

export default useLogin;
