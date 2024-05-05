import React from 'react';
import './Nav.css';
import { getAuthToken } from '../../stores/auth.store';

export default function Nav(): ReturnType<React.FC> {
  const [isAuth] = React.useState<boolean>(getAuthToken() != null);

  return (
    <nav className="navbar">
      <ul className="navbar-nav">
        <li className="nav-item">
          <a href="/home" className="nav-link">Home</a>
        </li>
        <li className="nav-item">
          <a href="/me" className="nav-link">Me</a>
        </li>
        <li className="nav-item">
          <a href="#" className="nav-link">Services</a>
        </li>
        <li className="nav-item">
          <a href="#" className="nav-link">Contact</a>
        </li>
      </ul>
      {/* Right-aligned elements */}
      <div className="right-aligned">
        {!isAuth ? <a href='/login'>login</a> : <a href='/logout'>logout</a> }
      </div>
    </nav>
  );
}