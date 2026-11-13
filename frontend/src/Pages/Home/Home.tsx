import React from 'react';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import useAuthStore, { getAuthToken, TokData } from '../../stores/auth.store';

function Home(): ReturnType<React.FC> {
  const isAuth = getAuthToken() != null;
  const tokData = useAuthStore(state => state.getTokData() as TokData);

  return (
    <div className="py-3">
      {/* Welcome Hero */}
      <Card className="border-0 shadow-sm p-4 p-md-5 mb-4 bg-white rounded-4">
        <Row className="align-items-center">
          <Col md={8}>
            <span className="badge bg-primary-subtle text-primary px-3 py-2 rounded-pill mb-3">
              Employee Onboarding Portal
            </span>
            <h1 className="display-6 fw-bold text-dark mb-3">
              Welcome to OnboardingBuddy 👋
            </h1>
            <p className="lead text-muted mb-4" style={{ fontSize: '1.1rem' }}>
              Connect with your team, manage your profile and technical stack, and pair with onboarding buddies smoothly.
            </p>
            <div className="d-flex flex-wrap gap-2">
              {isAuth ? (
                <>
                  <Button as={Link as any} to="/me" variant="primary">
                    View My Profile
                  </Button>
                  {tokData?.rolePriority === 2 && (
                    <Button as={Link as any} to={`/newbies/${tokData.id}`} variant="outline-primary">
                      My Assigned Newbies
                    </Button>
                  )}
                  {tokData?.rolePriority === 3 && (
                    <Button as={Link as any} to="/emps" variant="outline-primary">
                      Manage Employees
                    </Button>
                  )}
                </>
              ) : (
                <>
                  <Button as={Link as any} to="/login" variant="primary">
                    Log In
                  </Button>
                  <Button as={Link as any} to="/register" variant="outline-primary">
                    Create Account
                  </Button>
                </>
              )}
            </div>
          </Col>
        </Row>
      </Card>

      {/* Feature / Highlight Cards */}
      <Row className="g-4">
        <Col md={4}>
          <Card className="h-100 border-0 shadow-sm p-3 rounded-3 card-hover">
            <Card.Body>
              <div className="text-primary mb-3" style={{ fontSize: '1.8rem' }}>🎯</div>
              <Card.Title className="fw-semibold">Skill Matching</Card.Title>
              <Card.Text className="text-muted">
                Keep your technical stack, frontend, backend, and soft skills up-to-date for ideal team synergy.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="h-100 border-0 shadow-sm p-3 rounded-3 card-hover">
            <Card.Body>
              <div className="text-primary mb-3" style={{ fontSize: '1.8rem' }}>🤝</div>
              <Card.Title className="fw-semibold">Buddy Mentorship</Card.Title>
              <Card.Text className="text-muted">
                New joiners get paired with experienced buddies to ensure a friendly, structured onboarding journey.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="h-100 border-0 shadow-sm p-3 rounded-3 card-hover">
            <Card.Body>
              <div className="text-primary mb-3" style={{ fontSize: '1.8rem' }}>🚀</div>
              <Card.Title className="fw-semibold">Growth Tracking</Card.Title>
              <Card.Text className="text-muted">
                Track your progression, experience level, and certifications as you ramp up in your new role.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default Home;