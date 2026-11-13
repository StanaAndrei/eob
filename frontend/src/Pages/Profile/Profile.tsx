import React from 'react';
import './Profile.css';
import { DEFAULT_PROFILE_PIC } from '../../konst';
import { useParams } from 'react-router';
import { axiosAuthInstToSv } from '../../network/server.net';
import User, { BeProfileI, FeProfileI, ROLE_MAPPING, SSProfileI } from '../../models/user.model';
import FeProfile from './SubProfiles/FeProfile';
import BeProfile from './SubProfiles/BeProfile';
import SSProfile from './SubProfiles/SSProfile';
import { Link } from 'react-router-dom';
import { HttpStatusCode } from 'axios';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import Accordion from 'react-bootstrap/Accordion';
import Spinner from 'react-bootstrap/Spinner';

function Profile(): ReturnType<React.FC> {
  const { userId } = useParams();
  const [userData, setUserData] = React.useState<User | null>(null);
  const [buddyData, setBuddyData] = React.useState<User | null>(null);
  const [loading, setLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    setLoading(true);
    axiosAuthInstToSv.get(`/user/${userId}`).then(res => {
      setUserData(res.data as User);
    }).catch(err => {
      console.error(err);
      alert('Error fetching user profile');
    }).finally(() => {
      setLoading(false);
    });
  }, [userId]);

  React.useEffect(() => {
    if (userData?.buddyId) {
      axiosAuthInstToSv.get(`/user/${userData.buddyId}`).then(res => {
        setBuddyData(res.data);
      }).catch(err => {
        console.error(err);
      });
    }
  }, [userData]);

  const togglePaused = (e: React.SyntheticEvent) => {
    e.preventDefault();
    axiosAuthInstToSv.patch('/user/toggle-paused').then(res => {
      if (res.status === HttpStatusCode.Ok) {
        return window.location.reload();
      }
      alert('Error toggling status');
    }).catch(err => {
      console.error(err);
      alert('Error toggling status');
    });
  };

  if (loading) {
    return (
      <div className="text-center py-5">
        <Spinner animation="border" variant="primary" />
        <p className="text-muted mt-2">Loading profile...</p>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="text-center py-5">
        <h4 className="text-muted">User profile not found</h4>
        <Button as={Link as any} to="/home" variant="primary" className="mt-3">
          Back to Home
        </Button>
      </div>
    );
  }

  const roleName = ROLE_MAPPING.get(userData?.rolePriority as number)?.toUpperCase() || 'MEMBER';
  const industries = userData?.profile?.indType?.filter(Boolean) || [];

  return (
    <div className="py-4">
      {/* User Overview Header Card */}
      <Card className="border-0 shadow-sm rounded-4 p-4 mb-4 bg-white">
        <Row className="align-items-center g-4">
          <Col xs="auto">
            <div className="profile-avatar-container">
              <img
                src={DEFAULT_PROFILE_PIC}
                alt={userData.name}
                className="profile-avatar rounded-circle shadow-sm"
              />
            </div>
          </Col>

          <Col>
            <div className="d-flex flex-wrap align-items-center gap-2 mb-2">
              <h2 className="fw-bold mb-0 text-dark">{userData.name}</h2>
              <Badge bg={userData.paused ? 'danger' : 'success'} className="px-2 py-1 fw-normal rounded-pill">
                {userData.paused ? 'Paused' : 'Active'}
              </Badge>
              <Badge bg="primary" className="px-2 py-1 fw-normal rounded-pill">
                {roleName}
              </Badge>
            </div>

            <p className="text-muted mb-2 small">{userData.email}</p>

            <div className="d-flex flex-wrap align-items-center gap-3 text-secondary small">
              <div>
                <strong>Experience:</strong> {userData?.profile?.xp ? `${userData.profile.xp} years` : '0 years'}
              </div>
              {industries.length > 0 && (
                <div className="d-flex align-items-center gap-1">
                  <strong>Industries:</strong>
                  {industries.map((ind, idx) => (
                    <Badge key={idx} bg="light" text="dark" className="border px-2 py-1 fw-normal">
                      {ind}
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            {buddyData && (
              <div className="mt-3 p-2 px-3 bg-light rounded-3 d-inline-flex align-items-center gap-2 small">
                <span className="text-muted">Assigned Buddy:</span>
                <Link to={`/profile/${buddyData.id}`} className="fw-semibold text-primary text-decoration-none">
                  {buddyData.name}
                </Link>
              </div>
            )}
          </Col>

          <Col xs={12} lg="auto" className="d-flex flex-wrap gap-2 justify-content-lg-end">
            <Button as={Link as any} to={`/edit-profile/${userId}`} variant="primary" size="sm">
              Edit Profile
            </Button>
            <Button as={Link as any} to="/change-password" variant="outline-secondary" size="sm">
              Change Password
            </Button>
            {userData.rolePriority === 2 && (
              <Button
                variant={userData.paused ? 'outline-success' : 'outline-warning'}
                size="sm"
                onClick={togglePaused}
              >
                {userData.paused ? 'Resume Mentorship' : 'Pause Mentorship'}
              </Button>
            )}
          </Col>
        </Row>
      </Card>

      {/* SubProfiles Accordion */}
      <h4 className="fw-semibold text-dark mb-3">Detailed Skills & Preferences</h4>
      <Accordion defaultActiveKey={['0', '1', '2']} alwaysOpen className="subprofiles-accordion">
        {userData.profile?.feProfile && (
          <Accordion.Item eventKey="0" className="border-0 shadow-sm rounded-4 mb-3 overflow-hidden">
            <Accordion.Header>
              <span className="fw-semibold">Frontend Profile</span>
            </Accordion.Header>
            <Accordion.Body>
              <FeProfile feProfile={userData.profile.feProfile as FeProfileI} />
            </Accordion.Body>
          </Accordion.Item>
        )}

        {userData.profile?.beProfile && (
          <Accordion.Item eventKey="1" className="border-0 shadow-sm rounded-4 mb-3 overflow-hidden">
            <Accordion.Header>
              <span className="fw-semibold">Backend Profile</span>
            </Accordion.Header>
            <Accordion.Body>
              <BeProfile beProfile={userData.profile.beProfile as BeProfileI} />
            </Accordion.Body>
          </Accordion.Item>
        )}

        {userData.profile?.ssProfile && (
          <Accordion.Item eventKey="2" className="border-0 shadow-sm rounded-4 mb-3 overflow-hidden">
            <Accordion.Header>
              <span className="fw-semibold">Soft Skills & Communication</span>
            </Accordion.Header>
            <Accordion.Body>
              <SSProfile ssProfile={userData.profile.ssProfile as SSProfileI} />
            </Accordion.Body>
          </Accordion.Item>
        )}

        {!userData.profile?.feProfile && !userData.profile?.beProfile && !userData.profile?.ssProfile && (
          <Card className="border-0 shadow-sm p-4 text-center rounded-4">
            <p className="text-muted mb-3">No technical or soft skill subprofiles configured yet.</p>
            <div>
              <Button as={Link as any} to={`/edit-profile/${userId}`} variant="outline-primary" size="sm">
                Add Subprofile Information
              </Button>
            </div>
          </Card>
        )}
      </Accordion>
    </div>
  );
}

export default Profile;