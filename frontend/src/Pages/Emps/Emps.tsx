import React from 'react';
import User from '../../models/user.model';
import { axiosAuthInstToSv } from '../../network/server.net';
import './Emps.css'
import Multiselect from 'multiselect-react-dropdown';
import { HttpStatusCode } from 'axios';

interface OptionTp {
  name: string;
  id: number;
}

interface MiniBoxProps {
  user: User;
}

const MiniBox : React.FC<MiniBoxProps> = ({ user }) => !user ? null : <div>
  buddy: <a href={`/profile/${user.id}`}>{user.name}</a>
</div>

function Emps(): ReturnType<React.FC> {

  const [users, setUsers] = React.useState<User[]>([]);
  const [buddiesO, setBuddiesO] = React.useState<OptionTp[]>([]);

  React.useEffect(() => {
    axiosAuthInstToSv.get('/user/my-employees').then(res => {
      setUsers(res.data);
      console.log(res.data);
    }).catch(err => {
      console.error(err);
      alert('ERROR');
    })
  }, [])
  
  
  React.useEffect(() => {
    if (users.length > 0) {
      setBuddiesO(users.filter(user => user.rolePriority === 2).map(user => ({
        name: user.name,
        id: user.id,
      })))
    }
  }, [users])

  const msRef: React.LegacyRef<Multiselect> = React.createRef();
  const handleOnSelect = (selItem: OptionTp, newbieId: number) => {
    const { id: buddyId } = selItem;    
    axiosAuthInstToSv.patch(`/user/manual-match/${buddyId}/${newbieId}`).then(res => {
      if (res.status !== HttpStatusCode.NotModified) {
        window.location.reload();
      }
    }).catch(err => {
      console.error(err);
      alert('Error')
    })
  }

  return (
    <div>
      {
        users.map((elem, id) => {
          return <div className='Ebox' key={id}>
            <a href={`/profile/${elem.id}`}>{elem.name}</a>
            {'  '}{elem.rolePriority === 2 ? 'BUDDY' : 'NEWBIE'}
            {' '}
            {elem.rolePriority === 1 && 
              <MiniBox user={users[users.findIndex(({ id }) => id === elem.buddyId)]} />
            }
            {elem.rolePriority === 1 && 
            <Multiselect 
              singleSelect={true}
              onSelect={(_selList: OptionTp[], selItem: OptionTp) => handleOnSelect(selItem, elem.id)}
              ref={msRef}
              displayValue='name'
              options={buddiesO}
              placeholder='Change Buddy'
              />}
          </div>
        })
      }
    </div>
  );
}

export default Emps;