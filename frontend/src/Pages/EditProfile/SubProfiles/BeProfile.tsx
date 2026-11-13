import React from 'react';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import { BeProfileI, DEFAULT_PROFILE, Profile } from '../../../models/user.model';
import { doDiff, doInter } from '../../../utils/arrset';

const fwArr = ['Node', 'Django', 'Ror', 'Spring', '.net'];
const plArr = ['Java', 'Python', 'Ruby', 'Php', 'C#'];

const fwDisplayNames: Record<string, string> = {
  Node: 'Node.js',
  Django: 'Django',
  Ror: 'Ruby on Rails',
  Spring: 'Spring Boot',
  '.net': 'ASP.NET',
};

function BeProfile({ beProfile, setNewUserProfile }: {
  beProfile: BeProfileI,
  setNewUserProfile: React.Dispatch<React.SetStateAction<Profile | undefined>>,
}): ReturnType<React.FC> {

  const [nodeChecked] = React.useState<boolean>(beProfile.fws.includes('Node'));
  const [djangoChecked] = React.useState<boolean>(beProfile.fws.includes('Django'));
  const [rorChecked] = React.useState<boolean>(beProfile.fws.includes('Ror'));
  const [springChecked] = React.useState<boolean>(beProfile.fws.includes('Spring'));
  const [aspChecked] = React.useState<boolean>(beProfile.fws.includes('.net'));
  const [otherFwChecked, setOtherFwChecked] = React.useState<boolean>(
    () => doDiff<string>(beProfile.fws, fwArr).length > 0 && beProfile !== DEFAULT_PROFILE.beProfile
  );

  const [javaChecked] = React.useState<boolean>(beProfile.plangs.includes('Java'));
  const [pyChecked] = React.useState<boolean>(beProfile.plangs.includes('Python'));
  const [rubyChecked] = React.useState<boolean>(beProfile.plangs.includes('Ruby'));
  const [phpChecked] = React.useState<boolean>(beProfile.plangs.includes('Php'));
  const [csChecked] = React.useState<boolean>(beProfile.plangs.includes('C#'));
  const [otherPlChecked, setOtherPlChecked] = React.useState<boolean>(
    () => doDiff<string>(beProfile.plangs, plArr).length > 0 && beProfile !== DEFAULT_PROFILE.beProfile
  );

  const [newBeProfState, setnewBeProfState] = React.useState<BeProfileI>(beProfile);
  
  React.useEffect(() => {
    setNewUserProfile(prevState => ({
      ...(prevState || {}),
      beProfile: {...newBeProfState},
    }));
  }, [setNewUserProfile, newBeProfState]);

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked, value } = e.target;
    if (value === 'other') {
      if (name === 'fws') {
        setOtherFwChecked(prev => !prev);
      } else {
        setOtherPlChecked(prev => !prev);
      }
      return;
    }
    if (checked) {
      if (name === 'fws') {
        setnewBeProfState(prevState => ({
          ...prevState,
          fws: [...prevState.fws, value]
        }));
      } else {
        setnewBeProfState(prevState => ({
          ...prevState,
          plangs: [...prevState.plangs, value]
        }));
      }
    } else {
      if (name === 'fws') {
        setnewBeProfState((prevState: BeProfileI) => {
          const aux: BeProfileI = {...prevState};
          aux.fws = aux.fws.filter(el => el !== value);
          return aux;
        });
      } else {
        setnewBeProfState((prevState: BeProfileI) => {
          const aux: BeProfileI = {...prevState};
          aux.plangs = aux.plangs.filter(el => el !== value);
          return aux;
        });
      }
    }
  };

  const setLvl = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setnewBeProfState(prevState => ({
      ...prevState,
      [name]: Number(value),
    }));
  };

  const updateFwTxt = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const inputFws = Array.from(new Set(value.split(',').map(item => item.trim()).filter(Boolean)));

    setnewBeProfState(prevState => {
      const currentFwsSet = new Set(prevState.fws);
      const inputFwsSet = new Set(inputFws);

      const additions = inputFws.filter(item => !currentFwsSet.has(item));
      const deletions = prevState.fws.filter(item => !inputFwsSet.has(item));

      const updatedFws = [...prevState.fws, ...additions];

      for (const item of deletions) {
        const index = updatedFws.indexOf(item);
        if (index > -1 && !doInter<string>(fwArr, prevState.fws).includes(item)) {
          updatedFws.splice(index, 1);
        }
      }

      return {
        ...prevState,
        fws: updatedFws
      };
    });
  };

  const updatePlTxt = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const inputPlans = Array.from(new Set(value.split(',').map(item => item.trim()).filter(Boolean)));

    setnewBeProfState(prevState => {
      const currentPlangsSet = new Set(prevState.plangs);
      const inputPlangsSet = new Set(inputPlans);

      const additions = inputPlans.filter(item => !currentPlangsSet.has(item));
      const deletions = prevState.plangs.filter(item => !inputPlangsSet.has(item));

      const updatedPlangs = [...prevState.plangs, ...additions];

      for (const item of deletions) {
        const index = updatedPlangs.indexOf(item);
        if (index > -1 && !doInter<string>(plArr, prevState.plangs).includes(item)) {
          updatedPlangs.splice(index, 1);
        }
      }

      return {
        ...prevState,
        plangs: updatedPlangs
      };
    });
  };

  React.useEffect(() => {
    if (!otherFwChecked) {
      setnewBeProfState(prevState => ({
        ...prevState,
        fws: doInter<string>(fwArr, beProfile.fws)
      }));
    }
  }, [otherFwChecked, beProfile]);

  React.useEffect(() => {
    if (!otherPlChecked) {
      setnewBeProfState(prevState => ({
        ...prevState,
        plangs: doInter<string>(plArr, beProfile.plangs)
      }));
    }
  }, [otherPlChecked, beProfile]);

  const toolCategories = [
    { key: 'dockerLvl', label: 'Docker', current: beProfile.dockerLvl },
    { key: 'kuberLvl', label: 'Kubernetes', current: beProfile.kuberLvl },
    { key: 'awsAzureGcpLvl', label: 'AWS / Azure / GCP', current: beProfile.awsAzureGcpLvl },
    { key: 'sqlLvl', label: 'MySQL / PostgreSQL', current: beProfile.sqlLvl },
  ];

  return (
    <div>
      <h4 className="fw-semibold text-dark mb-1">Backend Development</h4>
      <p className="text-muted small mb-4">Specify your server-side frameworks, languages, and infrastructure skills</p>

      {/* Frameworks */}
      <Form.Group className="mb-4">
        <Form.Label className="fw-semibold text-secondary small mb-2 d-block">
          Backend Frameworks
        </Form.Label>
        <Row className="g-2">
          {fwArr.map(fw => (
            <Col sm={6} md={4} key={fw}>
              <Card className="border p-2 bg-light rounded-3">
                <Form.Check
                  type="checkbox"
                  name="fws"
                  value={fw}
                  id={`fw-${fw}`}
                  label={fwDisplayNames[fw] || fw}
                  defaultChecked={
                    fw === 'Node' ? nodeChecked :
                    fw === 'Django' ? djangoChecked :
                    fw === 'Ror' ? rorChecked :
                    fw === 'Spring' ? springChecked : aspChecked
                  }
                  onChange={handleCheckboxChange}
                />
              </Card>
            </Col>
          ))}
          <Col sm={6} md={4}>
            <Card className="border p-2 bg-light rounded-3">
              <Form.Check
                type="checkbox"
                name="fws"
                value="other"
                id="fw-other"
                label="Other"
                defaultChecked={otherFwChecked}
                onChange={handleCheckboxChange}
              />
            </Card>
          </Col>
        </Row>
        {otherFwChecked && (
          <div className="mt-3">
            <Form.Label className="small text-muted">Other backend frameworks (comma-separated):</Form.Label>
            <Form.Control
              type="text"
              placeholder="e.g. FastAPI, Go Fiber, NestJS"
              defaultValue={!otherFwChecked ? undefined : doDiff<string>(beProfile.fws, fwArr).join(', ')}
              onBlur={updateFwTxt}
            />
          </div>
        )}
      </Form.Group>

      {/* Programming Languages */}
      <Form.Group className="mb-4">
        <Form.Label className="fw-semibold text-secondary small mb-2 d-block">
          Programming Languages
        </Form.Label>
        <Row className="g-2">
          {plArr.map(pl => (
            <Col sm={6} md={4} key={pl}>
              <Card className="border p-2 bg-light rounded-3">
                <Form.Check
                  type="checkbox"
                  name="plangs"
                  value={pl}
                  id={`pl-${pl}`}
                  label={pl}
                  defaultChecked={
                    pl === 'Java' ? javaChecked :
                    pl === 'Python' ? pyChecked :
                    pl === 'Ruby' ? rubyChecked :
                    pl === 'Php' ? phpChecked : csChecked
                  }
                  onChange={handleCheckboxChange}
                />
              </Card>
            </Col>
          ))}
          <Col sm={6} md={4}>
            <Card className="border p-2 bg-light rounded-3">
              <Form.Check
                type="checkbox"
                name="plangs"
                value="other"
                id="pl-other"
                label="Other"
                defaultChecked={otherPlChecked}
                onChange={handleCheckboxChange}
              />
            </Card>
          </Col>
        </Row>
        {otherPlChecked && (
          <div className="mt-3">
            <Form.Label className="small text-muted">Other languages (comma-separated):</Form.Label>
            <Form.Control
              type="text"
              placeholder="e.g. Go, Rust, Kotlin"
              defaultValue={!otherPlChecked ? undefined : doDiff<string>(beProfile.plangs, plArr).join(', ')}
              onBlur={updatePlTxt}
            />
          </div>
        )}
      </Form.Group>

      {/* Infrastructure & Database Assessment Table */}
      <Form.Group className="mb-3">
        <Form.Label className="fw-semibold text-secondary small mb-2 d-block">
          Infrastructure & Database Competency (1 - Beginner to 5 - Expert)
        </Form.Label>
        <div className="table-responsive border rounded-3 p-2 bg-light">
          <Table hover className="align-middle mb-0 text-center">
            <thead>
              <tr className="text-secondary small">
                <th className="text-start ps-3">Tool / Tech</th>
                <th style={{ width: '60px' }}>1</th>
                <th style={{ width: '60px' }}>2</th>
                <th style={{ width: '60px' }}>3</th>
                <th style={{ width: '60px' }}>4</th>
                <th style={{ width: '60px' }}>5</th>
              </tr>
            </thead>
            <tbody>
              {toolCategories.map(cat => (
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
                        onChange={setLvl}
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

export default BeProfile;