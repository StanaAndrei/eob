import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import BsNav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import './Nav.css';
import useAuthStore, { getAuthToken, TokData } from '../../stores/auth.store';

export default function Nav(): ReturnType<React.FC> {
  const [isAuth] = React.useState<boolean>(getAuthToken() != null);
  const tokData = useAuthStore(state => state.getTokData() as TokData);

  return (
    <Navbar bg="white" expand="lg" className="border-bottom shadow-sm py-2">
      <Container>
        <Navbar.Brand as={Link} to="/home" className="d-flex align-items-center gap-2 fw-semibold text-primary">
          <span className="brand-dot"></span>
          <span>OnboardingBuddy</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="main-navbar-nav" />
        <Navbar.Collapse id="main-navbar-nav">
          <BsNav className="me-auto mb-2 mb-lg-0">
            <BsNav.Link as={Link} to="/home" className="px-3">Home</BsNav.Link>
            {isAuth && (
              <BsNav.Link as={Link} to="/me" className="px-3">My Profile</BsNav.Link>
            )}
            {tokData?.rolePriority === 2 && (
              <BsNav.Link as={Link} to={`/newbies/${tokData.id}`} className="px-3">Newbies</BsNav.Link>
            )}
            {tokData?.rolePriority === 3 && (
              <BsNav.Link as={Link} to="/emps" className="px-3">Employees</BsNav.Link>
            )}
            {tokData?.rolePriority === 3 && (
              <BsNav.Link as={Link} to="/create-other" className="px-3">Invite</BsNav.Link>
            )}
          </BsNav>
          <div className="d-flex align-items-center gap-2">
            {!isAuth ? (
              <>
                <Button as={Link as any} to="/login" variant="outline-primary" size="sm" className="px-3">
                  Log In
                </Button>
                <Button as={Link as any} to="/register" variant="primary" size="sm" className="px-3">
                  Sign Up
                </Button>
              </>
            ) : (
              <Button as={Link as any} to="/logout" variant="outline-secondary" size="sm" className="px-3">
                Log Out
              </Button>
            )}
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}