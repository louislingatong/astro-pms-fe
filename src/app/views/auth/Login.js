import React from 'react';
import {useSelector} from 'react-redux';
import LoginForm from './form/LoginForm';
import {reqLoginStatus} from '../../store/authSlice';

function Login() {
  const loginStatus = useSelector(reqLoginStatus);
  const isLoading = loginStatus === 'loading';
  return (
    <React.Fragment>
      <LoginForm status={isLoading}/>
    </React.Fragment>
  );
}

export default Login;
