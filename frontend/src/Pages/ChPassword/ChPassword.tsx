import React from 'react';
import { axiosAuthInstToSv } from '../../network/server.net';
import { useLocation, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';

function ChPassword(): ReturnType<React.FC> {
  const [password, setPassword] = React.useState<string>('');
  const [cpassword, setCpassword] = React.useState<string>('');
  const [errorMsg, setErrorMsg] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState<boolean>(false);
  const location = useLocation();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (location.state?.changedPassword) {
      toast.warn('We suggest changing your initial default password!', {
        autoClose: 4000,
      });
    }
  }, [location]);

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    if (password !== cpassword) {
      setErrorMsg('Passwords must match.');
      return;
    }
    setLoading(true);
    axiosAuthInstToSv.patch(`/user/change-password/${password}`).then(() => {
      toast.success('Password changed successfully!');
      setTimeout(() => navigate('/me'), 1000);
    }).catch(err => {
      console.error(err);
      setErrorMsg('Failed to change password. Please try again.');
    }).finally(() => {
      setLoading(false);
    });
  };

  return (
    <Row className="justify-content-center py-5">
      <Col xs={12} sm={10} md={8} lg={5}>
        <Card className="border-0 shadow-sm rounded-4 p-3 p-sm-4 bg-white">
          <Card.Body>
            <div className="text-center mb-4">
              <h2 className="fw-bold text-dark">Change Password</h2>
              <p className="text-muted small">Update your account credentials</p>
            </div>

            {errorMsg && (
              <Alert variant="danger" dismissible onClose={() => setErrorMsg(null)} className="py-2 small">
                {errorMsg}
              </Alert>
            )}

            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="newPassword">
                <Form.Label className="small fw-semibold text-secondary">New Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter new password"
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-4" controlId="confirmNewPassword">
                <Form.Label className="small fw-semibold text-secondary">Confirm New Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Repeat new password"
                  required
                  value={cpassword}
                  onChange={e => setCpassword(e.target.value)}
                />
              </Form.Group>

              <Button
                variant="primary"
                type="submit"
                className="w-100 py-2 fw-medium"
                disabled={loading}
              >
                {loading ? 'Updating...' : 'Update Password'}
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Col>
      <ToastContainer position="top-right" autoClose={3000} />
    </Row>
  );
}

export default ChPassword;
