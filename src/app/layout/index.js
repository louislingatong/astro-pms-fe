import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import PrivateLayout from './PrivateLayout';
import PublicLayout from './PublicLayout';
import {authenticated} from '../store/authSlice';
import {profileAsync, profile} from '../store/profileSlice';

function Layout({children}) {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(authenticated);
  const me = useSelector(profile);

  useEffect(() => {
    if (isAuthenticated && !me.id) {
      intProfile();
    }
  }, [isAuthenticated, me]);

  const intProfile = () => {
    dispatch(profileAsync())
  }

  return (
    <React.Fragment>
      {
        isAuthenticated
          ? <PrivateLayout />
          : <PublicLayout>{children}</PublicLayout>
      }
    </React.Fragment>
  );
}

export default Layout;
