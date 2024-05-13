import React from 'react';
import User from '../../models/user.model';
import { axiosAuthInstToSv } from '../../network/server.net';

function Emps(): ReturnType<React.FC> {

  const [users, setUsers] = React.useState<User[]>([]);

  React.useEffect(() => {
    axiosAuthInstToSv.get('/user/my-employees').then(res => {
      setUsers(res.data);
    }).catch(err => {
      console.error(err);
      alert('ERROR');
    })
  }, [])  

  return (
    <div>
      {
        users.map((e, id) => {
          return <div key={id}>
            <p>
              {e.name}{'  '}{e.rolePriority === 2 ? 'BUDDY' : 'NEWBIE'}
            </p>
          </div>
        })
      }
    </div>
  );
}

export default Emps;