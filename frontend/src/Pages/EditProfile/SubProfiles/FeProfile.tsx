import React from 'react';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import { DEFAULT_PROFILE, FeProfileI, Profile } from '../../../models/user.model';
import { doDiff, doInter } from '../../../utils/arrset';

const fwsArr = ['React', 'Ng', 'Vue'];

function FeProfile({ feProfile, setNewUserProfile }: { 
  feProfile: FeProfileI,
  setNewUserProfile: React.Dispatch<React.SetStateAction<Profile | undefined>>,
}): ReturnType<React.FC> {

  const [newFeProfile, setnewFeProfile] = React.useState<FeProfileI>(feProfile);
  const [otherChecked, setOtherChecked] = React.useState<boolean>(
    doDiff<string>(feProfile.fws, fwsArr).length > 0 && feProfile !== DEFAULT_PROFILE.feProfile
  );

  const handleCBChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name, checked } = e.target;
    if (checked) {
      setnewFeProfile((prevState: FeProfileI) => ({
        ...prevState,
        [name]: Array.from(new Set([...prevState[name as keyof FeProfileI] as string[], value])),
      }));
    } else {
      setnewFeProfile((prevState: FeProfileI): FeProfileI => {
        const auxState: FeProfileI = {...prevState};
        let aux: string[] = [...auxState[name as keyof FeProfileI] as string[]];
        aux = aux.filter(el => el !== value);
        if (name === 'fws') {
          auxState.fws = aux;
        } else {
          auxState.tools = aux;
        }
        return auxState;
      });
    }
  };

  const handleInpBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const inputFws = Array.from(new Set(value.split(',').map(item => item.trim()).filter(Boolean)));

    setnewFeProfile(prevState => {
      const currentFwsSet = new Set(prevState.fws);
      const inputFwsSet = new Set(inputFws);

      const additions = inputFws.filter(item => !currentFwsSet.has(item));
      const deletions = prevState.fws.filter(item => !inputFwsSet.has(item));

      const updatedFws = [...prevState.fws, ...additions];

      for (const item of deletions) {
        const index = updatedFws.indexOf(item);
        if (index > -1 && !doInter<string>(fwsArr, prevState.fws).includes(item)) {
          updatedFws.splice(index, 1);
        }
      }

      return {
        ...prevState,
        fws: updatedFws
      };
    });
  };

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setnewFeProfile(prevState => ({
      ...prevState,
      [name]: Number(value)
    }));
  };

  React.useEffect(() => {
    setNewUserProfile(prevState => ({
      ...(prevState || {}),
      feProfile: {...newFeProfile},
    }));
  }, [setNewUserProfile, newFeProfile]);

  React.useEffect(() => {
    if (!otherChecked) {
      setnewFeProfile(prevState => ({
        ...prevState,
        fws: doInter<string>(fwsArr, feProfile.fws)
      }));
    }
  }, [otherChecked, feProfile]);

  const levelCategories = [
    { key: 'jsLvl', label: 'JavaScript', current: feProfile.jsLvl },
    { key: 'tsLvl', label: 'TypeScript', current: feProfile.tsLvl },
    { key: 'htmlLvl', label: 'HTML', current: feProfile.htmlLvl },
    { key: 'cssLvl', label: 'CSS', current: feProfile.cssLvl },
  ];

  const toolsOptions = [
    { key: 'Npmyarn', label: 'NPM / Yarn' },
    { key: 'Webpack', label: 'Webpack' },
    { key: 'Gg', label: 'Grunt / Gulp' },
    { key: 'Babel', label: 'Babel' },
  ];

  return (
    <div>
      <h4 className="fw-semibold text-dark mb-1">Frontend Development</h4>
      <p className="text-muted small mb-4">Select your UI frameworks, experience ratings, and frontend build tools</p>

      {/* Frameworks */}
      <Form.Group className="mb-4">
        <Form.Label className="fw-semibold text-secondary small mb-2 d-block">
          Frontend Frameworks & Libraries
        </Form.Label>
        <Row className="g-2">
          <Col sm={6} md={3}>
            <Card className="border p-2 bg-light rounded-3">
              <Form.Check
                type="checkbox"
                name="fws"
                value="React"
                id="fe-react"
                label="React"
                defaultChecked={newFeProfile.fws.includes('React')}
                onChange={handleCBChange}
              />
            </Card>
          </Col>
          <Col sm={6} md={3}>
            <Card className="border p-2 bg-light rounded-3">
              <Form.Check
                type="checkbox"
                name="fws"
                value="Ng"
                id="fe-ng"
                label="Angular"
                defaultChecked={newFeProfile.fws.includes('Ng')}
                onChange={handleCBChange}
              />
            </Card>
          </Col>
          <Col sm={6} md={3}>
            <Card className="border p-2 bg-light rounded-3">
              <Form.Check
                type="checkbox"
                name="fws"
                value="Vue"
                id="fe-vue"
                label="Vue.js"
                defaultChecked={newFeProfile.fws.includes('Vue')}
                onChange={handleCBChange}
              />
            </Card>
          </Col>
          <Col sm={6} md={3}>
            <Card className="border p-2 bg-light rounded-3">
              <Form.Check
                type="checkbox"
                id="fe-other"
                label="Other"
                checked={otherChecked}
                onChange={() => setOtherChecked(prev => !prev)}
              />
            </Card>
          </Col>
        </Row>
        {otherChecked && (
          <div className="mt-3">
            <Form.Label className="small text-muted">Other frameworks (comma-separated):</Form.Label>
            <Form.Control
              type="text"
              name="fws"
              placeholder="e.g. Svelte, SolidJS"
              defaultValue={!otherChecked ? '' : doDiff<string>(feProfile.fws, fwsArr).join(', ')}
              onBlur={handleInpBlur}
            />
          </div>
        )}
      </Form.Group>

      {/* Level Ratings Table */}
      <Form.Group className="mb-4">
        <Form.Label className="fw-semibold text-secondary small mb-2 d-block">
          Skill Level Assessment (1 - Beginner to 5 - Expert)
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
              {levelCategories.map(cat => (
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
                        onChange={handleRadioChange}
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

      {/* Tools */}
      <Form.Group className="mb-3">
        <Form.Label className="fw-semibold text-secondary small mb-2 d-block">
          Frontend Build Tools & Package Managers
        </Form.Label>
        <Row className="g-2">
          {toolsOptions.map(tool => (
            <Col sm={6} md={3} key={tool.key}>
              <Card className="border p-2 bg-light rounded-3">
                <Form.Check
                  type="checkbox"
                  name="tools"
                  value={tool.key}
                  id={`tool-${tool.key}`}
                  label={tool.label}
                  defaultChecked={feProfile.tools.includes(tool.key)}
                  onChange={handleCBChange}
                />
              </Card>
            </Col>
          ))}
        </Row>
      </Form.Group>
    </div>
  );
}

export default FeProfile;