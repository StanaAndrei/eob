import React from 'react';
import { axiosAuthInstToSv } from '../../network/server.net';
import { HttpStatusCode } from 'axios';

function CreateOther(): ReturnType<React.FC> {

  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
  });

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    axiosAuthInstToSv.post('/user/other', formData).then(res => {
      if (res.status === HttpStatusCode.Created) {
        alert('User created!');
        window.location.reload();
        return
      }
      alert('error');
    }).catch(err => {
      console.error(err);
      alert('Error');
    })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }))
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="email" id='email' placeholder='email' onChange={handleChange}/><br />
        <input type="text" id='name' placeholder='name' onChange={handleChange} /><br />
        <button type='submit'>submit</button>
      </form>
    </div>
  );
}

export default CreateOther;