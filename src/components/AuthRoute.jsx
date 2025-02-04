import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import PropTypes from 'prop-types';
import { selectIsAuthenticated } from '../redux/features/auth/authSlice';
import useCheckLoginStatus from '../hooks/useCheckLoginStatus';

function AuthRoute({ type }) {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  useCheckLoginStatus();

  if (isAuthenticated && type === 'public') {
    return <Navigate to="/" />;
  }
  if (isAuthenticated === false && type === 'private') {  
    return <Navigate to="/login" />;
  }

  return <Outlet />;
}

AuthRoute.propTypes = {
  type: PropTypes.string.isRequired,
};

export default AuthRoute;
