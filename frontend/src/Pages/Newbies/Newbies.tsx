import React from 'react';
import User from '../../models/user.model';
import { axiosAuthInstToSv } from '../../network/server.net';
import { useParams } from 'react-router';

function Newbies(): ReturnType<React.FC> {

  const [newbies, setNewbies] = React.useState<User[]>([]);
  const { userId } = useParams();

  React.useEffect(() => {
    axiosAuthInstToSv.get(`/user/newbies-of/${userId}`).then(res => {
      console.log(res.data);
      setNewbies(res.data);
    }).catch(err => {
      console.error(err);
      alert('ERROR')
    })
  }, [userId])

  return (
    <div>
      {
        newbies.map((e, id) => <div key={id}>
          <p>{e.email}, {e.name}</p>
        </div> )
      }
    </div>
  );
}

export default Newbies;