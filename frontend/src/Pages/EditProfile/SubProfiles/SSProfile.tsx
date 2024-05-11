import React from 'react';
import { SSProfileI } from '../../../models/user.model';

function SSProfile({ ssProfile }: { ssProfile: SSProfileI }): ReturnType<React.FC> {

  return (
    <div>
      <h4>Communication style:</h4><br />
      <div onChange={undefined}>
        <input type="radio" name='comm' /> Assertive <br />
        <input type="radio" name='comm' /> Passive <br />
        <input type="radio" name='comm' /> Aggressive <br />
        <input type="radio" name='comm' /> Collaborative <br />
        <input type="radio" name='comm' /> Other: <input type="text" />
      </div>
      <div onChange={undefined}>
        <input type="radio" name='confhand' /> Assertive <br />
        <input type="radio" name='confhand' /> Passive <br />
        <input type="radio" name='confhand' /> Aggressive <br />
        <input type="radio" name='confhand' /> Collaborative <br />
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
            <div>
              <td><input value={1} type="radio" name='listening' /></td>
              <td><input value={2} type="radio" name='listening' /></td>
              <td><input value={3} type="radio" name='listening' /></td>
              <td><input value={4} type="radio" name='listening' /></td>
              <td><input value={5} type="radio" name='listening' /></td>
            </div>
          </tr>
          <tr>
            <th>Verbal:</th>
            <div>
              <td><input value={1} type="radio" name='verbal' /></td>
              <td><input value={2} type="radio" name='verbal' /></td>
              <td><input value={3} type="radio" name='verbal' /></td>
              <td><input value={4} type="radio" name='verbal' /></td>
              <td><input value={5} type="radio" name='verbal' /></td>
            </div>
          </tr>
          <tr>
            <td>Written:</td>
            <div>
              <td><input value={1} type="radio" name='written' /></td>
              <td><input value={2} type="radio" name='written' /></td>
              <td><input value={3} type="radio" name='written' /></td>
              <td><input value={4} type="radio" name='written' /></td>
              <td><input value={5} type="radio" name='written' /></td>
            </div>
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
            <div>
              <td><input value={1} type="radio" name='collab' /></td>
              <td><input value={2} type="radio" name='collab' /></td>
              <td><input value={3} type="radio" name='collab' /></td>
              <td><input value={4} type="radio" name='collab' /></td>
              <td><input value={5} type="radio" name='collab' /></td>
            </div>
          </tr>
          <tr>
            <td>Conflict resolution:</td>
            <div>
              <td><input value={1} type="radio" name='confres' /></td>
              <td><input value={2}  type="radio" name='confres' /></td>
              <td><input value={3}  type="radio" name='confres' /></td>
              <td><input value={4}  type="radio" name='confres' /></td>
              <td><input value={5}  type="radio" name='confres' /></td>
            </div>
          </tr>
          <tr>
            <td>Leadership:</td>
            <div>
              <td><input value={1} type="radio" name='leadership' /></td>
              <td><input value={2} type="radio" name='leadership' /></td>
              <td><input value={3} type="radio" name='leadership' /></td>
              <td><input value={4} type="radio" name='leadership' /></td>
              <td><input value={5} type="radio" name='leadership' /></td>
            </div>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default SSProfile;