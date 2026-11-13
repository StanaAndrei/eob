import React from 'react';
import { axiosInstToSv } from '../../network/server.net';
import { HttpStatusCode } from 'axios';
import { Navigate, useNavigate, Link } from 'react-router-dom';
import useAuthStore from '../../stores/auth.store';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';

function Register(): ReturnType<React.FC> {
  const navigate = useNavigate();
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    password: '',
    cpassword: ''
  });
  const [errorMsg, setErrorMsg] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState<boolean>(false);

  const isLoggedIn = useAuthStore(state => state.isLoggedIn);
  if (isLoggedIn()) {
    return <Navigate to={'/home'} />;
  }

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e: React.SyntheticEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (formData.password !== formData.cpassword) {
      setErrorMsg('Passwords do not match.');
      return;
    }

    setLoading(true);
    axiosInstToSv.post('/user', formData).then(res => {
      if (res.status === HttpStatusCode.Created) {
        navigate('/login');
        return;
      }
    }).catch(err => {
      console.error(err);
      setErrorMsg('Failed to register. Please check your details and try again.');
    }).finally(() => {
      setLoading(false);
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [id]: value
    }));
  };

  return (
    <Row className="justify-content-center py-5">
      <Col xs={12} sm={10} md={8} lg={5}>
        <Card className="border-0 shadow-sm rounded-4 p-3 p-sm-4 bg-white">
          <Card.Body>
            <div className="text-center mb-4">
              <h2 className="fw-bold text-dark">Create Account</h2>
              <p className="text-muted small">Join your team on OnboardingBuddy</p>
            </div>

            {errorMsg && (
              <Alert variant="danger" dismissible onClose={() => setErrorMsg(null)} className="py-2 small">
                {errorMsg}
              </Alert>
            )}

            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="name">
                <Form.Label className="small fw-semibold text-secondary">Full Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="e.g. Jane Doe"
                  required
                  value={formData.name}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="email">
                <Form.Label className="small fw-semibold text-secondary">Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="name@company.com"
                  required
                  value={formData.email}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="password">
                <Form.Label className="small fw-semibold text-secondary">Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Create a password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className="mb-4" controlId="cpassword">
                <Form.Label className="small fw-semibold text-secondary">Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Repeat your password"
                  required
                  value={formData.cpassword}
                  onChange={handleChange}
                />
              </Form.Group>

              <Button
                variant="primary"
                type="submit"
                className="w-100 py-2 mb-3 fw-medium"
                disabled={loading}
              >
                {loading ? 'Registering...' : 'Sign Up'}
              </Button>
            </Form>

            <div className="text-center mt-3 pt-3 border-top">
              <span className="text-muted small">Already have an account? </span>
              <Link to="/login" className="small fw-semibold text-decoration-none text-primary">
                Sign in
              </Link>
            </div>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}

export default Register;