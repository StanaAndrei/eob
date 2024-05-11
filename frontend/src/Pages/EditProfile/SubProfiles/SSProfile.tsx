import React from 'react';
import { SSProfileI } from '../../../models/user.model';

function SSProfile({ ssProfile }: { ssProfile: SSProfileI }): ReturnType<React.FC> {

  const handleCommStyleCh = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    console.log(value, name);
    
  }

  return (
    <div>
      <h4>Communication style:</h4><br />
      <div onChange={handleCommStyleCh}>
        <input type="radio" value={'Assertive'} name='comm' /> Assertive <br />
        <input type="radio" value={'Passive'} name='comm' /> Passive <br />
        <input type="radio" value={'Aggressive'} name='comm' /> Aggressive <br />
        <input type="radio" value={'Collaborative'} name='comm' /> Collaborative <br />
        <input type="radio" value={'other'} name='comm' /> Other: <input type="text" />
      </div>
      <div onChange={undefined}>
        <input type="radio" name='confhand' /> Avoidance <br />
        <input type="radio" name='confhand' /> Confrontation <br />
        <input type="radio" name='confhand' /> Compromise <br />
        <input type="radio" name='confhand' /> Collaboration <br />
        <input type="radio" name='confhand' /> Other: <input type="text" />
      </div>
      <h4>Rate your communication skills:</h4>
      <table>
        <thead>
          <tr>
            <th>1</th>
            <th>2</th>
            <th>3</th>
            <th>4</th>
            <th>5</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>Listening:</th>
              <td><input value={1} type="radio" name='listening' /></td>
              <td><input value={2} type="radio" name='listening' /></td>
              <td><input value={3} type="radio" name='listening' /></td>
              <td><input value={4} type="radio" name='listening' /></td>
              <td><input value={5} type="radio" name='listening' /></td>
          </tr>
          <tr>
            <th>Verbal:</th>
              <td><input value={1} type="radio" name='verbal' /></td>
              <td><input value={2} type="radio" name='verbal' /></td>
              <td><input value={3} type="radio" name='verbal' /></td>
              <td><input value={4} type="radio" name='verbal' /></td>
              <td><input value={5} type="radio" name='verbal' /></td>
          </tr>
          <tr>
            <td>Written:</td>
              <td><input value={1} type="radio" name='written' /></td>
              <td><input value={2} type="radio" name='written' /></td>
              <td><input value={3} type="radio" name='written' /></td>
              <td><input value={4} type="radio" name='written' /></td>
              <td><input value={5} type="radio" name='written' /></td>
          </tr>
        </tbody>
      </table>
      <h4>Rate your ability to work in a team:</h4>
      <table>
        <thead>
          <tr>
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
              <td><input value={1} type="radio" name='collab' /></td>
              <td><input value={2} type="radio" name='collab' /></td>
              <td><input value={3} type="radio" name='collab' /></td>
              <td><input value={4} type="radio" name='collab' /></td>
              <td><input value={5} type="radio" name='collab' /></td>
          </tr>
          <tr>
            <td>Conflict resolution:</td>
              <td><input value={1} type="radio" name='confres' /></td>
              <td><input value={2}  type="radio" name='confres' /></td>
              <td><input value={3}  type="radio" name='confres' /></td>
              <td><input value={4}  type="radio" name='confres' /></td>
              <td><input value={5}  type="radio" name='confres' /></td>
          </tr>
          <tr>
            <td>Leadership:</td>
              <td><input value={1} type="radio" name='leadership' /></td>
              <td><input value={2} type="radio" name='leadership' /></td>
              <td><input value={3} type="radio" name='leadership' /></td>
              <td><input value={4} type="radio" name='leadership' /></td>
              <td><input value={5} type="radio" name='leadership' /></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default SSProfile;