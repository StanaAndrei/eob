import React from 'react';
import { axiosAuthInstToSv } from '../../network/server.net';
import { HttpStatusCode } from 'axios';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';

function CreateOther(): ReturnType<React.FC> {
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
  });
  const [statusMsg, setStatusMsg] = React.useState<{ type: 'success' | 'danger'; text: string } | null>(null);
  const [loading, setLoading] = React.useState<boolean>(false);

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    setStatusMsg(null);
    setLoading(true);

    axiosAuthInstToSv.post('/user/other', formData).then(res => {
      if (res.status === HttpStatusCode.Created) {
        setStatusMsg({ type: 'success', text: 'Employee successfully invited!' });
        setFormData({ name: '', email: '' });
        return;
      }
      setStatusMsg({ type: 'danger', text: 'Could not create user.' });
    }).catch(err => {
      console.error(err);
      setStatusMsg({ type: 'danger', text: 'Error creating user. Please try again.' });
    }).finally(() => {
      setLoading(false);
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  return (
    <Row className="justify-content-center py-5">
      <Col xs={12} sm={10} md={8} lg={5}>
        <Card className="border-0 shadow-sm rounded-4 p-3 p-sm-4 bg-white">
          <Card.Body>
            <div className="text-center mb-4">
              <h2 className="fw-bold text-dark">Invite Team Member</h2>
              <p className="text-muted small">Create an account for a new employee</p>
            </div>

            {statusMsg && (
              <Alert variant={statusMsg.type} dismissible onClose={() => setStatusMsg(null)} className="py-2 small">
                {statusMsg.text}
              </Alert>
            )}

            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="name">
                <Form.Label className="small fw-semibold text-secondary">Full Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="e.g. Alex Morgan"
                  required
                  value={formData.name}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className="mb-4" controlId="email">
                <Form.Label className="small fw-semibold text-secondary">Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="alex@company.com"
                  required
                  value={formData.email}
                  onChange={handleChange}
                />
              </Form.Group>

              <Button
                variant="primary"
                type="submit"
                className="w-100 py-2 fw-medium"
                disabled={loading}
              >
                {loading ? 'Creating...' : 'Send Invitation'}
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}

export default CreateOther;