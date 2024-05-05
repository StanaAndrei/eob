import React from 'react';
import { axiosInstToSv } from '../../network/server.net';
import { AxiosResponse } from 'axios';
import useAuthStore from '../../stores/auth.store';
import { Navigate } from 'react-router-dom';

function Login(): ReturnType<React.FC> {

  const [authToken, setAuthToken] = useAuthStore(({ authToken, setAuthToken }) => [authToken, setAuthToken]);
  if (authToken != null) {
    return <Navigate to={'/home'} replace={true} />
  }

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      email: { value: string },
      password: { value: string },
    };
    const email = target.email.value;
    const password = target.password.value;
    console.log(email, password);
    axiosInstToSv.post('/auth', {
      email, password
    }).then((res: AxiosResponse) => {
      setAuthToken(res.data.accessToken);
      window.location.reload();
    }).catch(err => {
      console.error(err);
      alert('ERROR!');
    })
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input placeholder='email' type="text" id='email' /><br />
        <input placeholder='password' type="password" id='password' /><br />
        <button type='submit'>submit</button>
      </form>
    </div>
  );
}

export default Login;