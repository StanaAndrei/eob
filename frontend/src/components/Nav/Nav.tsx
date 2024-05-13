import React from 'react';
import './Nav.css';
import useAuthStore, { getAuthToken, TokData } from '../../stores/auth.store';

export default function Nav(): ReturnType<React.FC> {
  const [isAuth] = React.useState<boolean>(getAuthToken() != null);
  const tokData = useAuthStore(state => state.getTokData() as TokData);

  return (
    <nav className="navbar">
      <ul className="navbar-nav">
        <li className="nav-item">
          <a href="/home" className="nav-link">Home</a>
        </li>
        <li className="nav-item">
          <a href="/me" className="nav-link">Me</a>
        </li>
        {tokData?.rolePriority === 2 && <li className="nav-item">
          <a href={`/newbies/${tokData.id}`} className="nav-link">Newbies</a>
        </li>}
        {
          tokData?.rolePriority === 3 && <li className="nav-item">
          <a href="/emps" className="nav-link">Emps</a>
        </li>
        }
      </ul>
      {/* Right-aligned elements */}
      <div className="right-aligned">
        {!isAuth ? <a href='/login' className='nav-link'>login</a> : <a href='/logout'>logout</a> }
      </div>
    </nav>
  );
}