import React from 'react';
import { axiosInstToSv } from '../../network/server.net';
import { AxiosResponse } from 'axios';
import useAuthStore from '../../stores/auth.store';
import { useNavigate, Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';

function Login(): ReturnType<React.FC> {
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState<boolean>(false);

  const [authToken, setAuthToken, tokData] = useAuthStore(({ authToken, setAuthToken, getTokData }) => [
    authToken, setAuthToken, getTokData()
  ]);

  React.useEffect(() => {
    if (tokData && !tokData.changedPassword && tokData.rolePriority === 1) {
      navigate('/change-password', {
        state: {
          changedPassword: true
        }
      });
    } else if (authToken != null) {
      navigate('/home');
    }
  }, [authToken, tokData, navigate]);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e: React.SyntheticEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    const target = e.target as typeof e.target & {
      email: { value: string },
      password: { value: string },
    };
    const email = target.email.value;
    const password = target.password.value;

    setLoading(true);
    axiosInstToSv.post('/auth', {
      email, password
    }).then((res: AxiosResponse) => {
      setAuthToken(res.data.accessToken);
      window.location.reload();
    }).catch(err => {
      console.error(err);
      setErrorMsg('Invalid email or password. Please try again.');
      setLoading(false);
    });
  };

  return (
    <Row className="justify-content-center py-5">
      <Col xs={12} sm={10} md={8} lg={5}>
        <Card className="border-0 shadow-sm rounded-4 p-3 p-sm-4 bg-white">
          <Card.Body>
            <div className="text-center mb-4">
              <h2 className="fw-bold text-dark">Welcome Back</h2>
              <p className="text-muted small">Sign in to your OnboardingBuddy account</p>
            </div>

            {errorMsg && (
              <Alert variant="danger" dismissible onClose={() => setErrorMsg(null)} className="py-2 small">
                {errorMsg}
              </Alert>
            )}

            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="email">
                <Form.Label className="small fw-semibold text-secondary">Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="name@company.com"
                  required
                  autoComplete="email"
                />
              </Form.Group>

              <Form.Group className="mb-4" controlId="password">
                <Form.Label className="small fw-semibold text-secondary">Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter your password"
                  required
                  autoComplete="current-password"
                />
              </Form.Group>

              <Button
                variant="primary"
                type="submit"
                className="w-100 py-2 mb-3 fw-medium"
                disabled={loading}
              >
                {loading ? 'Signing in...' : 'Sign In'}
              </Button>
            </Form>

            <div className="text-center mt-3 pt-3 border-top">
              <span className="text-muted small">Don't have an account yet? </span>
              <Link to="/register" className="small fw-semibold text-decoration-none text-primary">
                Sign up
              </Link>
            </div>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}

export default Login;