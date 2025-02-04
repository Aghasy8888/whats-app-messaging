import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { toastProps } from '../data';
import {
  selectErrorMessage,
  selectSuccessMessage,
} from '../redux/features/general/generalSlice';

const useNotification = () => {
  const successMessage = useSelector(selectSuccessMessage);
  const errorMessage = useSelector(selectErrorMessage);

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage, toastProps);
    }

    if (errorMessage) {
      toast.error(errorMessage, toastProps);
    }
  }, [successMessage, errorMessage]);
};

export default useNotification;
