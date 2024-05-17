import React from 'react';
import User, { isRecent } from '../../models/user.model';
import { axiosAuthInstToSv } from '../../network/server.net';
import { useParams } from 'react-router';
import './Newbies.css';

function Newbies(): ReturnType<React.FC> {

  const [newbies, setNewbies] = React.useState<User[]>([]);
  const { userId } = useParams();

  React.useEffect(() => {
    axiosAuthInstToSv.get(`/user/newbies-of/${userId}`).then(res => {
      const aux: User[] = res.data.toSorted((e1: User, e2: User) => 
        new Date(e1.matchDate as string).getTime() - new Date(e2.matchDate as string).getTime()
      );
      setNewbies(aux);
    }).catch(err => {
      console.error(err);
      alert('ERROR')
    })
  }, [userId])

  return (
    <div>
      {
        newbies.map((e, id) => <div 
        className='Nbox' 
        key={id}
        style={{ backgroundColor: isRecent(e) ? 'red' : '' }}
        >
          <p>{e.email}, {e.name}</p>
        </div> )
      }
    </div>
  );
}

export default Newbies;