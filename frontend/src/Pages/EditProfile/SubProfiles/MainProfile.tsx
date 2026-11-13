import React from 'react';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import { Profile } from '../../../models/user.model';
import { doDiff, doInter } from '../../../utils/arrset';

const indArr = ['TECH', 'HEALTH', 'FINANCE', 'EDU', 'RETAIL'];

const indLabels: Record<string, string> = {
  TECH: 'Technology & IT',
  HEALTH: 'Healthcare & Biotech',
  FINANCE: 'Finance & Banking',
  EDU: 'Education & Training',
  RETAIL: 'Retail & E-commerce',
};

function MainProfile({ profile, setStack, setNewUserProfile }: { 
  profile: Profile, 
  setStack: React.Dispatch<React.SetStateAction<string>>,
  setNewUserProfile: React.Dispatch<React.SetStateAction<Profile | undefined>>,
}): ReturnType<React.FC> {

  const [xp, setXp] = React.useState<number>(profile.xp as number);
  const [indType, setIndType] = React.useState<string[]>(profile.indType as string[]);
  const [otherChecked, setOtherChecked] = React.useState<boolean>(
    doDiff<string>(profile.indType as string[], indArr).length > 0
  );

  React.useEffect(() => {
    setNewUserProfile((prevState) => ({
      ...prevState,
      indType,
      xp,
    }));
  }, [setNewUserProfile, indType, xp]);

  const handleIndChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    if (checked) {
      setIndType(prevState => [...prevState, value]);
    } else {
      setIndType(prevState => {
        let aux = [...prevState];
        aux = aux.filter(el => el !== value);
        return aux;
      });
    }
  };

  const handleInpBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const inputFws = Array.from(new Set(value.split(',').map(item => item.trim()).filter(Boolean)));
    setIndType((prevState: string[]) => {
      const currentFwsSet = new Set(prevState);
      const inputFwsSet = new Set(inputFws);

      const additions = inputFws.filter(item => !currentFwsSet.has(item));
      const deletions = prevState.filter(item => !inputFwsSet.has(item));

      const updatedFws = [...prevState, ...additions];

      for (const item of deletions) {
        const index = updatedFws.indexOf(item);
        if (index > -1 && !doInter<string>(indArr, prevState).includes(item)) {
          updatedFws.splice(index, 1);
        }
      }

      return updatedFws;
    });
  };

  React.useEffect(() => {
    if (!otherChecked) {
      setIndType(prevState => doInter<string>(prevState, indArr));
    }
  }, [otherChecked]);

  return (
    <div>
      <h4 className="fw-semibold text-dark mb-1">General Information</h4>
      <p className="text-muted small mb-4">Set up your general background and core focus areas</p>

      {/* Experience Input */}
      <Form.Group className="mb-4" controlId="profileXp">
        <Form.Label className="fw-semibold text-secondary small">Years of Professional Experience</Form.Label>
        <Form.Control
          type="number"
          min="0"
          max="50"
          defaultValue={profile.xp}
          style={{ maxWidth: '200px' }}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setXp(Number(e.target.value))}
        />
      </Form.Group>

      {/* Industry Checkboxes */}
      <Form.Group className="mb-4">
        <Form.Label className="fw-semibold text-secondary small mb-2 d-block">
          Industry Experience / Domains
        </Form.Label>
        <Row className="g-2">
          {indArr.map(item => (
            <Col sm={6} md={4} key={item}>
              <Card className="border p-2 bg-light rounded-3">
                <Form.Check
                  type="checkbox"
                  id={`ind-${item}`}
                  label={indLabels[item] || item}
                  value={item}
                  defaultChecked={profile.indType?.includes(item)}
                  onChange={handleIndChange}
                />
              </Card>
            </Col>
          ))}
          <Col sm={6} md={4}>
            <Card className="border p-2 bg-light rounded-3">
              <Form.Check
                type="checkbox"
                id="ind-other"
                label="Other (specify)"
                value="OTHER"
                defaultChecked={otherChecked}
                onChange={() => setOtherChecked(prev => !prev)}
              />
            </Card>
          </Col>
        </Row>

        {otherChecked && (
          <div className="mt-3">
            <Form.Label className="small text-muted">Other industries (comma-separated):</Form.Label>
            <Form.Control
              type="text"
              placeholder="e.g. Media, Aerospace, Automotive"
              defaultValue={doDiff<string>(profile.indType as string[], indArr).join(', ')}
              onBlur={handleInpBlur}
            />
          </div>
        )}
      </Form.Group>

      {/* Stack Selection */}
      <Form.Group className="mb-3">
        <Form.Label className="fw-semibold text-secondary small mb-2 d-block">
          Primary Engineering Stack Focus
        </Form.Label>
        <div
          className="d-flex flex-wrap gap-3"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setStack(e.target.value)}
        >
          <Card className="border p-3 flex-grow-1 bg-light rounded-3">
            <Form.Check
              type="radio"
              name="stack"
              id="stack-fe"
              value="FE"
              label={
                <div>
                  <div className="fw-semibold text-dark">Frontend</div>
                  <div className="small text-muted">UI, React, Angular, Vue, CSS</div>
                </div>
              }
            />
          </Card>
          <Card className="border p-3 flex-grow-1 bg-light rounded-3">
            <Form.Check
              type="radio"
              name="stack"
              id="stack-be"
              value="BE"
              label={
                <div>
                  <div className="fw-semibold text-dark">Backend</div>
                  <div className="small text-muted">Node.js, Django, Java, Cloud, DBs</div>
                </div>
              }
            />
          </Card>
          <Card className="border p-3 flex-grow-1 bg-light rounded-3">
            <Form.Check
              type="radio"
              name="stack"
              id="stack-befe"
              value="BEFE"
              label={
                <div>
                  <div className="fw-semibold text-dark">Full Stack (Both)</div>
                  <div className="small text-muted">Both Frontend and Backend skills</div>
                </div>
              }
            />
          </Card>
        </div>
      </Form.Group>
    </div>
  );
}

export default MainProfile;