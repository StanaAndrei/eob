import React from 'react';
import { axiosAuthInstToSv } from '../../network/server.net';

function RegisterOther(): ReturnType<React.FC> {

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      email: { value: string },
      name: { value: string },
    };
    const email = target.email.value;
    const name = target.name.value;
    axiosAuthInstToSv.post('/user/other', {
      email, name
    }).then(() => {
      alert('OK')
    }).catch(() => {
      alert('ERROR');
    })
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input placeholder='name' type="text" id='name' /><br />
        <input placeholder='email' type="text" id='email' /><br />
        <button type='submit'>submit</button>
      </form>
    </div>
  );
}

export default RegisterOther;