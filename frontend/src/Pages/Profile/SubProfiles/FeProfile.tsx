import React from 'react';
import Badge from 'react-bootstrap/Badge';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import ProgressBar from 'react-bootstrap/ProgressBar';
import { FeProfileI } from '../../../models/user.model';

function FeProfile({ feProfile }: { feProfile: FeProfileI }): ReturnType<React.FC> {
  if (!feProfile) {
    return <p className="text-muted fst-italic">No frontend profile specified.</p>;
  }

  const skills = [
    { label: 'HTML', lvl: feProfile.htmlLvl },
    { label: 'CSS', lvl: feProfile.cssLvl },
    { label: 'JavaScript', lvl: feProfile.jsLvl },
    { label: 'TypeScript', lvl: feProfile.tsLvl },
  ];

  const frameworks = feProfile.fws?.filter(Boolean) || [];
  const tools = feProfile.tools?.filter(Boolean) || [];

  return (
    <div className="py-2">
      <div className="mb-4">
        <h6 className="fw-semibold text-secondary small text-uppercase mb-2">Frameworks & Libraries</h6>
        <div className="d-flex flex-wrap gap-2">
          {frameworks.length > 0 ? (
            frameworks.map((fw, idx) => (
              <Badge key={idx} bg="primary" className="px-3 py-2 fw-normal rounded-pill">
                {fw}
              </Badge>
            ))
          ) : (
            <span className="text-muted small">None selected</span>
          )}
        </div>
      </div>

      <div className="mb-4">
        <h6 className="fw-semibold text-secondary small text-uppercase mb-2">Frontend Tools</h6>
        <div className="d-flex flex-wrap gap-2">
          {tools.length > 0 ? (
            tools.map((t, idx) => (
              <Badge key={idx} bg="secondary" className="px-3 py-2 fw-normal rounded-pill">
                {t}
              </Badge>
            ))
          ) : (
            <span className="text-muted small">None selected</span>
          )}
        </div>
      </div>

      <div>
        <h6 className="fw-semibold text-secondary small text-uppercase mb-3">Skill Levels (1 - 5)</h6>
        <Table responsive borderless className="align-middle mb-0">
          <tbody>
            {skills.map((item, idx) => (
              <tr key={idx}>
                <td style={{ width: '130px' }} className="fw-medium text-dark ps-0">
                  {item.label}
                </td>
                <td style={{ width: '50px' }} className="text-muted small">
                  {item.lvl || 0}/5
                </td>
                <td>
                  <ProgressBar
                    now={((item.lvl || 0) / 5) * 100}
                    variant="primary"
                    style={{ height: '8px', borderRadius: '4px' }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default FeProfile;