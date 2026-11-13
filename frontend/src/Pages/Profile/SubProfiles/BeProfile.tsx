import React from 'react';
import Badge from 'react-bootstrap/Badge';
import Table from 'react-bootstrap/Table';
import ProgressBar from 'react-bootstrap/ProgressBar';
import { BeProfileI } from '../../../models/user.model';

function BeProfile({ beProfile }: { beProfile: BeProfileI }): ReturnType<React.FC> {
  if (!beProfile) {
    return <p className="text-muted fst-italic">No backend profile specified.</p>;
  }

  const frameworks = beProfile.fws?.filter(Boolean) || [];
  const plangs = beProfile.plangs?.filter(Boolean) || [];

  const skills = [
    { label: 'Docker', lvl: beProfile.dockerLvl },
    { label: 'Kubernetes', lvl: beProfile.kuberLvl },
    { label: 'AWS / Azure / GCP', lvl: beProfile.awsAzureGcpLvl },
    { label: 'SQL (MySQL/PgSQL)', lvl: beProfile.sqlLvl },
  ];

  return (
    <div className="py-2">
      <div className="mb-4">
        <h6 className="fw-semibold text-secondary small text-uppercase mb-2">Backend Frameworks</h6>
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
        <h6 className="fw-semibold text-secondary small text-uppercase mb-2">Programming Languages</h6>
        <div className="d-flex flex-wrap gap-2">
          {plangs.length > 0 ? (
            plangs.map((pl, idx) => (
              <Badge key={idx} bg="info" className="px-3 py-2 fw-normal rounded-pill text-dark">
                {pl}
              </Badge>
            ))
          ) : (
            <span className="text-muted small">None selected</span>
          )}
        </div>
      </div>

      <div>
        <h6 className="fw-semibold text-secondary small text-uppercase mb-3">Backend & Infrastructure Level (1 - 5)</h6>
        <Table responsive borderless className="align-middle mb-0">
          <tbody>
            {skills.map((item, idx) => (
              <tr key={idx}>
                <td style={{ width: '160px' }} className="fw-medium text-dark ps-0">
                  {item.label}
                </td>
                <td style={{ width: '50px' }} className="text-muted small">
                  {item.lvl || 0}/5
                </td>
                <td>
                  <ProgressBar
                    now={((item.lvl || 0) / 5) * 100}
                    variant="info"
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

export default BeProfile;
