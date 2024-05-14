import React from 'react';
import { axiosAuthInstToSv } from '../../network/server.net';

function ChPassword(): ReturnType<React.FC> {
  const [password, setPassword] = React.useState<string>('');
  const [cpassword, setCpassword] = React.useState<string>('');

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (password !== cpassword) {
      alert('PASSWORDS MUST MATCH');
      return;
    }
    axiosAuthInstToSv.patch(`/user/change-password/${password}`).then(res => {
      alert('PASSWORD CHANGED');
      
    }).catch(err => {
      console.error(err);
      alert('ERROR');
    })
  }

  return (
    <div>
      <form action="" onSubmit={handleSubmit}>
        <input type="password" onChange={e => setPassword(e.target.value)} />
        <input type="password" onChange={e => setCpassword(e.target.value)} />
        <button type='submit'></button>
      </form>
    </div>
  );
}

export default ChPassword;