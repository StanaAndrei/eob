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

const MiniBox : React.FC<MiniBoxProps> = ({ user }) => !user ? null : <div className="emps-current-buddy">
  <span className="emps-detail-label">Current buddy</span>
  <a href={`/profile/${user.id}`}>{user.name}</a>
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
    <main className="emps-page">
      <header className="emps-heading">
        <h1>Employees</h1>
        <p>Manage buddy assignments for your team.</p>
      </header>
      <div className="emps-list">
      {
        users.map((elem, id) => {
          return <section className='emps-card' key={elem.id ?? id}>
            <div className="emps-person">
              <a className="emps-name" href={`/profile/${elem.id}`}>{elem.name}</a>
              <span className={`emps-role ${elem.rolePriority === 2 ? 'is-buddy' : 'is-newbie'}`}>
                {elem.rolePriority === 2 ? 'Buddy' : 'Newbie'}
              </span>
            </div>
            {elem.rolePriority === 1 && 
              <MiniBox user={users[users.findIndex(({ id }) => id === elem.buddyId)]} />
            }
            {elem.rolePriority === 1 && 
            <div className="emps-selector">
            <Multiselect
              singleSelect={true}
              onSelect={(_selList: OptionTp[], selItem: OptionTp) => handleOnSelect(selItem, elem.id)}
              ref={msRef}
              displayValue='name'
              options={buddiesO}
              placeholder='Choose a buddy'
            />
            </div>
            }
          </section>
        })
      }
      </div>
    </main>
  );
}

export default Emps;
