import React from 'react';
import { axiosInstToSv } from '../../network/server.net';
import { HttpStatusCode } from 'axios';
import { useNavigate } from 'react-router';

function Register(): ReturnType<React.FC> {

  const navigate = useNavigate();

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e: React.SyntheticEvent) => {
    e.preventDefault();
    axiosInstToSv.post('/user').then(res => {
      if (res.status === HttpStatusCode.Created) {
        navigate('/login');
      }
    }).catch(err => {
      console.error(err);
      alert('ERROR');
    })
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input placeholder='name' type="text" id='name' /><br />
        <input placeholder='email' type="text" id='email' /><br />
        <input placeholder='password' type="password" id='password' /><br />
        <input placeholder='confirm password' type="password" id='cpassword' /><br />
        <button type='submit'>submit</button>
      </form>
    </div>
  );
}

export default Register;