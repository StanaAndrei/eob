import React from 'react';
import useAuthStore from '../../stores/auth.store';
import { Navigate } from 'react-router-dom';

function Logout(): ReturnType<React.FC> {
  const [isLoggedIn, rmAuthToken] = useAuthStore(state => [state.isLoggedIn, state.rmAuthToken])

  React.useEffect(() => {
    if (!isLoggedIn()) {
      return;
    }  
    rmAuthToken();
    window.location.reload();
  }, [rmAuthToken, isLoggedIn])

  if (!isLoggedIn()) {
    return <Navigate to={'/login'} />
  }

  return null;
}

export default Logout;