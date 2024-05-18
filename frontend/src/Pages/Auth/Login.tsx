import React from 'react';
import { axiosInstToSv } from '../../network/server.net';
import { AxiosResponse } from 'axios';
import useAuthStore from '../../stores/auth.store';
import { useNavigate } from 'react-router-dom';

function Login(): ReturnType<React.FC> {

  const navigate = useNavigate();

  const [authToken, setAuthToken, tokData] = useAuthStore(({ authToken, setAuthToken, getTokData }) => [
    authToken, setAuthToken, getTokData()
  ]);

  React.useEffect(() => {
    if (tokData && !tokData.changedPassword && tokData.rolePriority === 1) {
      navigate('/change-password', {
        state: {
          changedPassword: true
        }
      });
    } else if (authToken != null) {
      navigate('/home');
    }
  }, [authToken, tokData, navigate])

  

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