import React from 'react';
import { axiosAuthInstToSv } from '../../network/server.net';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';

function RegisterOther(): ReturnType<React.FC> {
  const [statusMsg, setStatusMsg] = React.useState<{ type: 'success' | 'danger'; text: string } | null>(null);
  const [loading, setLoading] = React.useState<boolean>(false);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e: React.SyntheticEvent) => {
    e.preventDefault();
    setStatusMsg(null);
    const target = e.target as typeof e.target & {
      email: { value: string },
      name: { value: string },
    };
    const email = target.email.value;
    const name = target.name.value;

    setLoading(true);
    axiosAuthInstToSv.post('/user/other', {
      email, name
    }).then(() => {
      setStatusMsg({ type: 'success', text: 'Member registered successfully!' });
      (e.target as HTMLFormElement).reset();
    }).catch(() => {
      setStatusMsg({ type: 'danger', text: 'Failed to register member.' });
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
              <h2 className="fw-bold text-dark">Register Member</h2>
              <p className="text-muted small">Create an account for a team colleague</p>
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
                  placeholder="e.g. Jordan Smith"
                  required
                />
              </Form.Group>

              <Form.Group className="mb-4" controlId="email">
                <Form.Label className="small fw-semibold text-secondary">Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="jordan@company.com"
                  required
                />
              </Form.Group>

              <Button
                variant="primary"
                type="submit"
                className="w-100 py-2 fw-medium"
                disabled={loading}
              >
                {loading ? 'Registering...' : 'Register Member'}
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}

export default RegisterOther;