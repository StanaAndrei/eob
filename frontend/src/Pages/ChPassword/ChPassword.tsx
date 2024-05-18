import React from 'react';
import { axiosAuthInstToSv } from '../../network/server.net';
import { useLocation, useNavigate } from 'react-router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ChPassword(): ReturnType<React.FC> {
  const [password, setPassword] = React.useState<string>('');
  const [cpassword, setCpassword] = React.useState<string>('');
  const location = useLocation();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (location.state?.changedPassword) {
      toast.warn('We suggest to change the 1st password!!!', {
        autoClose: 3000,
      });
    }
  }, [location])

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (password !== cpassword) {
      alert('PASSWORDS MUST MATCH');
      return;
    }
    axiosAuthInstToSv.patch(`/user/change-password/${password}`).then(() => {
      alert('PASSWORD CHANGED');
      navigate('/me');
    }).catch(err => {
      console.error(err);
      alert('ERROR');
    })
  }

  return (
    <div>
      <h2>Change password</h2>
      <form action="" onSubmit={handleSubmit}>
        <input type="password" placeholder='password' onChange={e => setPassword(e.target.value)} /> <br />
        <input type="password" placeholder='confirm password' onChange={e => setCpassword(e.target.value)} /> <br />
        <button type='submit'>submit</button>
      </form>
      <ToastContainer />
    </div>
  );
}

export default ChPassword;
