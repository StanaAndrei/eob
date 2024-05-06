import React from 'react';
import { axiosInstToSv } from '../../network/server.net';
import { HttpStatusCode } from 'axios';
import { Navigate, useNavigate } from 'react-router';
import useAuthStore from '../../stores/auth.store';

function Register(): ReturnType<React.FC> {

  const navigate = useNavigate();
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    password: '',
    cpassword: ''
  });

  const isLoggedIn = useAuthStore(state => state.isLoggedIn)
  if (isLoggedIn()) {
    return <Navigate to={'/home'} />
  }

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e: React.SyntheticEvent) => {
    e.preventDefault();    
    if (formData.password !== formData.cpassword) {
      alert('Passwords must match');
      return;
    }
    axiosInstToSv.post('/user', formData).then(res => {
      if (res.status === HttpStatusCode.Created) {
        navigate('/login');
        return;
      }
    }).catch(err => {
      console.error(err);
      alert('ERROR');
    })//*/
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [id]: value
    }));
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input placeholder='name' type="text" id='name' onChange={handleChange} /><br />
        <input placeholder='email' type="text" id='email' onChange={handleChange} /><br />
        <input placeholder='password' type="password" id='password' onChange={handleChange} /><br />
        <input placeholder='confirm password' type="password" id='cpassword' onChange={handleChange} /><br />
        <button type='submit'>submit</button>
      </form>
    </div>
  );
}

export default Register;