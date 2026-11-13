import React from 'react';
import Badge from 'react-bootstrap/Badge';
import Table from 'react-bootstrap/Table';
import ProgressBar from 'react-bootstrap/ProgressBar';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { SSProfileI } from '../../../models/user.model';

function SSProfile({ ssProfile }: { ssProfile: SSProfileI }): ReturnType<React.FC> {
  if (!ssProfile) {
    return <p className="text-muted fst-italic">No soft skills profile specified.</p>;
  }

  const commSkills = [
    { label: 'Listening', lvl: ssProfile.listeningLvl },
    { label: 'Verbal Communication', lvl: ssProfile.verbalLvl },
    { label: 'Written Communication', lvl: ssProfile.writtenLvl },
  ];

  const teamSkills = [
    { label: 'Collaboration', lvl: ssProfile.collabLvl },
    { label: 'Conflict Resolution', lvl: ssProfile.conflictResolutionLvl },
    { label: 'Leadership', lvl: ssProfile.leadershipLvl },
  ];

  return (
    <div className="py-2">
      <Row className="mb-4 g-3">
        <Col sm={6}>
          <div className="p-3 bg-light rounded-3">
            <span className="text-muted small text-uppercase fw-semibold d-block mb-1">
              Communication Style
            </span>
            <Badge bg="success" className="px-3 py-2 fw-normal rounded-pill">
              {ssProfile.commStyle || 'Not specified'}
            </Badge>
          </div>
        </Col>
        <Col sm={6}>
          <div className="p-3 bg-light rounded-3">
            <span className="text-muted small text-uppercase fw-semibold d-block mb-1">
              Conflict Handling Method
            </span>
            <Badge bg="warning" className="px-3 py-2 fw-normal rounded-pill text-dark">
              {ssProfile.conflictHandlingMethod || 'Not specified'}
            </Badge>
          </div>
        </Col>
      </Row>

      <Row className="g-4">
        <Col md={6}>
          <h6 className="fw-semibold text-secondary small text-uppercase mb-3">Communication Skills (1 - 5)</h6>
          <Table responsive borderless className="align-middle mb-0">
            <tbody>
              {commSkills.map((item, idx) => (
                <tr key={idx}>
                  <td style={{ width: '150px' }} className="fw-medium text-dark ps-0">
                    {item.label}
                  </td>
                  <td style={{ width: '45px' }} className="text-muted small">
                    {item.lvl || 0}/5
                  </td>
                  <td>
                    <ProgressBar
                      now={((item.lvl || 0) / 5) * 100}
                      variant="success"
                      style={{ height: '8px', borderRadius: '4px' }}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>

        <Col md={6}>
          <h6 className="fw-semibold text-secondary small text-uppercase mb-3">Teamwork & Leadership (1 - 5)</h6>
          <Table responsive borderless className="align-middle mb-0">
            <tbody>
              {teamSkills.map((item, idx) => (
                <tr key={idx}>
                  <td style={{ width: '150px' }} className="fw-medium text-dark ps-0">
                    {item.label}
                  </td>
                  <td style={{ width: '45px' }} className="text-muted small">
                    {item.lvl || 0}/5
                  </td>
                  <td>
                    <ProgressBar
                      now={((item.lvl || 0) / 5) * 100}
                      variant="warning"
                      style={{ height: '8px', borderRadius: '4px' }}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </div>
  );
}

export default SSProfile;
