import React from 'react';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import { Profile, SSProfileI } from '../../../models/user.model';

const commArr = ['Assertive', 'Passive', 'Aggressive', 'Collaborative'];
const confArr = ['Avoidance', 'Confrontation', 'Compromise', 'Collaboration'];

function SSProfile({ ssProfile, setNewUserProfile }: { 
  ssProfile: SSProfileI,
  setNewUserProfile: React.Dispatch<React.SetStateAction<Profile | undefined>>,
}): ReturnType<React.FC> {

  const [newSSProfile, setNewSSProfile] = React.useState<SSProfileI>(ssProfile);

  const [otherCommChecked, setOtherCommChecked] = React.useState<boolean>(
    !commArr.includes(ssProfile.commStyle)
  );
  const [otherConfChecked, setOtherConfChecked] = React.useState<boolean>(
    !confArr.includes(ssProfile.conflictHandlingMethod)
  );

  React.useEffect(() => {
    setNewUserProfile((prevState) => ({
      ...prevState,
      ssProfile: {...newSSProfile},
    }));
  }, [setNewUserProfile, newSSProfile]);

  const handleCommConfStyleCh = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    if (value === 'other') {
      return;
    }
    setNewSSProfile(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleRadio = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setNewSSProfile(prevState => ({
      ...prevState,
      [name]: Number(value)
    }));
  };

  const commRatings = [
    { key: 'listeningLvl', label: 'Listening Comprehension', current: ssProfile.listeningLvl },
    { key: 'verbalLvl', label: 'Verbal Expression', current: ssProfile.verbalLvl },
    { key: 'writtenLvl', label: 'Written Communication', current: ssProfile.writtenLvl },
  ];

  const teamRatings = [
    { key: 'collabLvl', label: 'Cross-functional Collaboration', current: ssProfile.collabLvl },
    { key: 'conflictResolutionLvl', label: 'Conflict Resolution', current: ssProfile.conflictResolutionLvl },
    { key: 'leadershipLvl', label: 'Team Leadership & Initiative', current: ssProfile.leadershipLvl },
  ];

  return (
    <div>
      <h4 className="fw-semibold text-dark mb-1">Soft Skills & Communication</h4>
      <p className="text-muted small mb-4">Tell us about your work style, communication preferences, and collaboration habits</p>

      {/* Communication Style */}
      <Form.Group className="mb-4">
        <Form.Label className="fw-semibold text-secondary small mb-2 d-block">
          Primary Communication Style
        </Form.Label>
        <Row className="g-2" onChange={handleCommConfStyleCh as any}>
          {commArr.map(item => (
            <Col sm={6} md={3} key={item}>
              <Card className="border p-2 bg-light rounded-3">
                <Form.Check
                  type="radio"
                  name="commStyle"
                  value={item}
                  id={`comm-${item}`}
                  label={item}
                  defaultChecked={ssProfile.commStyle === item}
                />
              </Card>
            </Col>
          ))}
          <Col sm={6} md={3}>
            <Card className="border p-2 bg-light rounded-3">
              <Form.Check
                type="radio"
                name="commStyle"
                value="other"
                id="comm-other"
                label="Other"
                defaultChecked={otherCommChecked}
                onChange={() => setOtherCommChecked(prev => !prev)}
              />
            </Card>
          </Col>
        </Row>
        {otherCommChecked && (
          <div className="mt-3">
            <Form.Label className="small text-muted">Other communication style:</Form.Label>
            <Form.Control
              type="text"
              name="commStyle"
              placeholder="e.g. Adaptive / Visual"
              defaultValue={!otherCommChecked ? '' : ssProfile.commStyle}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setNewSSProfile(prev => ({ ...prev, commStyle: e.target.value }));
              }}
            />
          </div>
        )}
      </Form.Group>

      {/* Conflict Handling Method */}
      <Form.Group className="mb-4">
        <Form.Label className="fw-semibold text-secondary small mb-2 d-block">
          Conflict Resolution Approach
        </Form.Label>
        <Row className="g-2" onChange={handleCommConfStyleCh as any}>
          {confArr.map(item => (
            <Col sm={6} md={3} key={item}>
              <Card className="border p-2 bg-light rounded-3">
                <Form.Check
                  type="radio"
                  name="conflictHandlingMethod"
                  value={item}
                  id={`conf-${item}`}
                  label={item}
                  defaultChecked={ssProfile.conflictHandlingMethod === item}
                />
              </Card>
            </Col>
          ))}
          <Col sm={6} md={3}>
            <Card className="border p-2 bg-light rounded-3">
              <Form.Check
                type="radio"
                name="conflictHandlingMethod"
                value="other"
                id="conf-other"
                label="Other"
                defaultChecked={otherConfChecked}
                onChange={() => setOtherConfChecked(prev => !prev)}
              />
            </Card>
          </Col>
        </Row>
        {otherConfChecked && (
          <div className="mt-3">
            <Form.Label className="small text-muted">Other conflict handling method:</Form.Label>
            <Form.Control
              type="text"
              name="conflictHandlingMethod"
              placeholder="e.g. Mediation / Discussion"
              defaultValue={!otherConfChecked ? '' : ssProfile.conflictHandlingMethod}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setNewSSProfile(prev => ({ ...prev, conflictHandlingMethod: e.target.value }));
              }}
            />
          </div>
        )}
      </Form.Group>

      {/* Communication Ratings */}
      <Form.Group className="mb-4">
        <Form.Label className="fw-semibold text-secondary small mb-2 d-block">
          Communication Competency Ratings (1 - Basic to 5 - Advanced)
        </Form.Label>
        <div className="table-responsive border rounded-3 p-2 bg-light">
          <Table hover className="align-middle mb-0 text-center">
            <thead>
              <tr className="text-secondary small">
                <th className="text-start ps-3">Skill</th>
                <th style={{ width: '60px' }}>1</th>
                <th style={{ width: '60px' }}>2</th>
                <th style={{ width: '60px' }}>3</th>
                <th style={{ width: '60px' }}>4</th>
                <th style={{ width: '60px' }}>5</th>
              </tr>
            </thead>
            <tbody>
              {commRatings.map(cat => (
                <tr key={cat.key}>
                  <td className="text-start ps-3 fw-medium text-dark">{cat.label}</td>
                  {[1, 2, 3, 4, 5].map(lvl => (
                    <td key={lvl}>
                      <Form.Check
                        type="radio"
                        name={cat.key}
                        value={lvl}
                        id={`${cat.key}-${lvl}`}
                        defaultChecked={cat.current === lvl}
                        onChange={handleRadio}
                        className="d-inline-block"
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </Form.Group>

      {/* Teamwork Ratings */}
      <Form.Group className="mb-3">
        <Form.Label className="fw-semibold text-secondary small mb-2 d-block">
          Teamwork & Leadership Ratings (1 - Basic to 5 - Advanced)
        </Form.Label>
        <div className="table-responsive border rounded-3 p-2 bg-light">
          <Table hover className="align-middle mb-0 text-center">
            <thead>
              <tr className="text-secondary small">
                <th className="text-start ps-3">Skill</th>
                <th style={{ width: '60px' }}>1</th>
                <th style={{ width: '60px' }}>2</th>
                <th style={{ width: '60px' }}>3</th>
                <th style={{ width: '60px' }}>4</th>
                <th style={{ width: '60px' }}>5</th>
              </tr>
            </thead>
            <tbody>
              {teamRatings.map(cat => (
                <tr key={cat.key}>
                  <td className="text-start ps-3 fw-medium text-dark">{cat.label}</td>
                  {[1, 2, 3, 4, 5].map(lvl => (
                    <td key={lvl}>
                      <Form.Check
                        type="radio"
                        name={cat.key}
                        value={lvl}
                        id={`${cat.key}-${lvl}`}
                        defaultChecked={cat.current === lvl}
                        onChange={handleRadio}
                        className="d-inline-block"
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </Form.Group>
    </div>
  );
}

export default SSProfile;