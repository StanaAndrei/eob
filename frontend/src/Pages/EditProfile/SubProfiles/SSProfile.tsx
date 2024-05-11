import React from 'react';
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
  )
  const [otherConfChecked, setOtherConfChecked] = React.useState<boolean>(
    !confArr.includes(ssProfile.conflictHandlingMethod)
  )

  React.useEffect(() => {
    setNewUserProfile((prevState) => ({
      ...prevState,
      ssProfile: {...newSSProfile},
    }));
  }, [setNewUserProfile, newSSProfile])

  const handleCommConfStyleCh = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    if (value === 'other') {
      return;
    }
    setNewSSProfile(prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  const handleRadio = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setNewSSProfile(prevState => ({
      ...prevState,
      [name]: Number(value)
    }));
  }

  return (
    <div>
      <h4>Communication style:</h4><br />
      <div onChange={handleCommConfStyleCh}>
        <input defaultChecked={ssProfile.commStyle === 'Assertive'} type="radio" value={'Assertive'} name='commStyle' /> Assertive <br />
        <input defaultChecked={ssProfile.commStyle === 'Passive'} type="radio" value={'Passive'} name='commStyle' /> Passive <br />
        <input defaultChecked={ssProfile.commStyle === 'Aggressive'} type="radio" value={'Aggressive'} name='commStyle' /> Aggressive <br />
        <input defaultChecked={ssProfile.commStyle === 'Collaborative'} type="radio" value={'Collaborative'} name='commStyle' /> Collaborative <br />
        <input defaultChecked={otherCommChecked} type="radio" value={'other'} name='commStyle' 
          onChange={() => setOtherCommChecked(prev => !prev)}
        /> Other:
        <input name='commStyle' type="text" defaultValue={
          !otherCommChecked ? '' : ssProfile.commStyle
        } disabled={!otherCommChecked} />
      </div>
      <h4>conflicts handling:</h4>
      <div onChange={handleCommConfStyleCh}>
        <input type="radio" defaultChecked={ssProfile.conflictHandlingMethod === 'Avoidance'} value={'Avoidance'} name='conflictHandlingMethod' /> Avoidance <br />
        <input type="radio" defaultChecked={ssProfile.conflictHandlingMethod === 'Confrontation'} value={'Confrontation'} name='conflictHandlingMethod' /> Confrontation <br />
        <input type="radio" defaultChecked={ssProfile.conflictHandlingMethod === 'Compromise'} value={'Compromise'} name='conflictHandlingMethod' /> Compromise <br />
        <input type="radio" defaultChecked={ssProfile.conflictHandlingMethod === 'Collaboration'} value={'Collaboration'} name='conflictHandlingMethod' /> Collaboration <br />
        <input type="radio" defaultChecked={otherConfChecked} value={'other'} name='conflictHandlingMethod'
          onChange={() => setOtherConfChecked(prev => !prev)}
        /> Other: 
        <input name='conflictHandlingMethod' type="text" defaultValue={
          !otherConfChecked ? '' : ssProfile.conflictHandlingMethod
        } disabled={!otherConfChecked} />
      </div>
      <h4>Rate your communication skills:</h4>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>1</th>
            <th>2</th>
            <th>3</th>
            <th>4</th>
            <th>5</th>
          </tr>
        </thead>
        <tbody>
          <tr>
              <td>Listening:</td>
              <td><input onChange={handleRadio} value={1} defaultChecked={ssProfile.listeningLvl === 1} type="radio" name='listeningLvl' /></td>
              <td><input onChange={handleRadio} value={2} defaultChecked={ssProfile.listeningLvl === 2} type="radio" name='listeningLvl' /></td>
              <td><input onChange={handleRadio} value={3} defaultChecked={ssProfile.listeningLvl === 3} type="radio" name='listeningLvl' /></td>
              <td><input onChange={handleRadio} value={4} defaultChecked={ssProfile.listeningLvl === 4} type="radio" name='listeningLvl' /></td>
              <td><input onChange={handleRadio} value={5} defaultChecked={ssProfile.listeningLvl === 5} type="radio" name='listeningLvl' /></td>
          </tr>
          <tr>
              <td>Verbal:</td>
              <td><input onChange={handleRadio} value={1} defaultChecked={ssProfile.verbalLvl === 1} type="radio" name='verbalLvl' /></td>
              <td><input onChange={handleRadio} value={2} defaultChecked={ssProfile.verbalLvl === 2} type="radio" name='verbalLvl' /></td>
              <td><input onChange={handleRadio} value={3} defaultChecked={ssProfile.verbalLvl === 3} type="radio" name='verbalLvl' /></td>
              <td><input onChange={handleRadio} value={4} defaultChecked={ssProfile.verbalLvl === 4} type="radio" name='verbalLvl' /></td>
              <td><input onChange={handleRadio} value={5} defaultChecked={ssProfile.verbalLvl === 5} type="radio" name='verbalLvl' /></td>
          </tr>
          <tr>
              <td>Written:</td>
              <td><input onChange={handleRadio} value={1} defaultChecked={ssProfile.writtenLvl === 1} type="radio" name='writtenLvl' /></td>
              <td><input onChange={handleRadio} value={2} defaultChecked={ssProfile.writtenLvl === 2} type="radio" name='writtenLvl' /></td>
              <td><input onChange={handleRadio} value={3} defaultChecked={ssProfile.writtenLvl === 3} type="radio" name='writtenLvl' /></td>
              <td><input onChange={handleRadio} value={4} defaultChecked={ssProfile.writtenLvl === 4} type="radio" name='writtenLvl' /></td>
              <td><input onChange={handleRadio} value={5} defaultChecked={ssProfile.writtenLvl === 5} type="radio" name='writtenLvl' /></td>
          </tr>
        </tbody>
      </table>
      <h4>Rate your ability to work in a team:</h4>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>1</th>
            <th>2</th>
            <th>3</th>
            <th>4</th>
            <th>5</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Collaborating:</td>
              <td><input onChange={handleRadio} value={1} defaultChecked={ssProfile.collabLvl === 1} type="radio" name='collabLvl' /></td>
              <td><input onChange={handleRadio} value={2} defaultChecked={ssProfile.collabLvl === 2} type="radio" name='collabLvl' /></td>
              <td><input onChange={handleRadio} value={3} defaultChecked={ssProfile.collabLvl === 3} type="radio" name='collabLvl' /></td>
              <td><input onChange={handleRadio} value={4} defaultChecked={ssProfile.collabLvl === 4} type="radio" name='collabLvl' /></td>
              <td><input onChange={handleRadio} value={5} defaultChecked={ssProfile.collabLvl === 5} type="radio" name='collabLvl' /></td>
          </tr>
          <tr>
            <td>Conflict resolution:</td>
              <td><input onChange={handleRadio} value={1} defaultChecked={ssProfile.conflictResolutionLvl === 1} type="radio" name='conflictResolutionLvl' /></td>
              <td><input onChange={handleRadio} value={2} defaultChecked={ssProfile.conflictResolutionLvl === 2} type="radio" name='conflictResolutionLvl' /></td>
              <td><input onChange={handleRadio} value={3} defaultChecked={ssProfile.conflictResolutionLvl === 3} type="radio" name='conflictResolutionLvl' /></td>
              <td><input onChange={handleRadio} value={4} defaultChecked={ssProfile.conflictResolutionLvl === 4} type="radio" name='conflictResolutionLvl' /></td>
              <td><input onChange={handleRadio} value={5} defaultChecked={ssProfile.conflictResolutionLvl === 5} type="radio" name='conflictResolutionLvl' /></td>
          </tr>
          <tr>
            <td>Leadership:</td>
              <td><input onChange={handleRadio} value={1} defaultChecked={ssProfile.leadershipLvl === 1} type="radio" name='leadershipLvl' /></td>
              <td><input onChange={handleRadio} value={2} defaultChecked={ssProfile.leadershipLvl === 2} type="radio" name='leadershipLvl' /></td>
              <td><input onChange={handleRadio} value={3} defaultChecked={ssProfile.leadershipLvl === 3} type="radio" name='leadershipLvl' /></td>
              <td><input onChange={handleRadio} value={4} defaultChecked={ssProfile.leadershipLvl === 4} type="radio" name='leadershipLvl' /></td>
              <td><input onChange={handleRadio} value={5} defaultChecked={ssProfile.leadershipLvl === 5} type="radio" name='leadershipLvl' /></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default SSProfile;