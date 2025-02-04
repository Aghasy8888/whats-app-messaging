import { LoginForm } from '.';
import { useSelector } from 'react-redux';
import { Spinner } from '../../../common';
import useLogin from '../../../hooks/useLogin';
import { selectAuthLoading, selectIsAuthenticated } from '../../../redux/features/auth/authSlice';

const Login = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const loading = useSelector(selectAuthLoading);
  useLogin();

  if (isAuthenticated) {
    return null;
  }

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="flex justify-center w-screen font-zen h-screen bg-slate-100 m-auto bg-center max-w-[2000px]">
        <LoginForm />
    </div>
  );
};

export default Login;
