import React from 'react';
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
    const { value, name } = e.target;
    setnewFeProfile((prevState: FeProfileI) => ({
      ...prevState,
      [name]: Array.from(new Set([...prevState[name as keyof FeProfileI] as string[], value])),
    }));
  };
    
  const handleInpBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setnewFeProfile((prevState: FeProfileI) => ({
      ...prevState,
      [name]: name.split(',').length > doDiff<string>([...prevState[name as keyof FeProfileI] as string[]], fwsArr).length ?
      Array.from(new Set(Array.from(new Set([...prevState[name as keyof FeProfileI] as string[], ...value.split(',')]))))
      : doInter<string>(Array.from(
        new Set(Array.from(new Set([...prevState[name as keyof FeProfileI] as string[], ...value.split(',')])))),
        [...prevState[name as keyof FeProfileI] as string[]]
      ),
    }));
  };

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setnewFeProfile(prevState => ({
      ...prevState,
      [name]: Number(value)
    }))
  }

  React.useEffect(() => {
    setNewUserProfile(prevState => ({
      ...(prevState || {}),
      feProfile: {...newFeProfile},
    }))
  }, [setNewUserProfile, newFeProfile])

  React.useEffect(() => {
    if (!otherChecked) {
      setnewFeProfile(prevState => ({
        ...prevState,
        fws: doInter<string>(fwsArr, feProfile.fws)
      }));
    }
  }, [otherChecked, feProfile])

  return (
    <div>
      <h4>Frameworks:</h4>
      <label>
        <input value={'React'} name='fws' type="checkbox" defaultChecked={newFeProfile.fws.includes('React')} onChange={handleCBChange} />
        React
      </label><br />
      <label>
        <input value={'Ng'} name='fws' type="checkbox" defaultChecked={newFeProfile.fws.includes('Ng')} onChange={handleCBChange} />
        Angular
      </label><br />
      <label>
        <input value={'Vue'} name='fws' type="checkbox" defaultChecked={newFeProfile.fws.includes('Vue')} onChange={handleCBChange} />
        Vue
      </label><br />
      <label>
        <input  type="checkbox" checked={otherChecked} onChange={() => setOtherChecked(prev => !prev)} />
        Other:
      </label>
      <input type="text" disabled={!otherChecked} name='fws' onBlur={handleInpBlur} 
        defaultValue={!otherChecked ? '' : doDiff<string>(feProfile.fws, fwsArr).join(',')}
      /><br />
      <hr />
      <h4>Level of:</h4>
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
            <td>Javascript:</td>
            <td><input value={1} defaultChecked={feProfile.jsLvl === 1} type="radio" name='jsLvl' onChange={handleRadioChange} /></td>
            <td><input value={2}  defaultChecked={feProfile.jsLvl === 2} type="radio" name='jsLvl' onChange={handleRadioChange} /></td>
            <td><input value={3}  defaultChecked={feProfile.jsLvl === 3} type="radio" name='jsLvl' onChange={handleRadioChange} /></td>
            <td><input value={4}  defaultChecked={feProfile.jsLvl === 4} type="radio" name='jsLvl' onChange={handleRadioChange} /></td>
            <td><input value={5}  defaultChecked={feProfile.jsLvl === 5} type="radio" name='jsLvl' onChange={handleRadioChange} /></td>
          </tr>
          <tr>
            <td>Typescript:</td>
            <td><input value={1}  defaultChecked={feProfile.tsLvl === 1} type="radio" name='tsLvl' onChange={handleRadioChange} /></td>
            <td><input value={2}  defaultChecked={feProfile.tsLvl === 2} type="radio" name='tsLvl' onChange={handleRadioChange} /></td>
            <td><input value={3}  defaultChecked={feProfile.tsLvl === 3} type="radio" name='tsLvl' onChange={handleRadioChange} /></td>
            <td><input value={4}  defaultChecked={feProfile.tsLvl === 4} type="radio" name='tsLvl' onChange={handleRadioChange} /></td>
            <td><input value={5}  defaultChecked={feProfile.tsLvl === 5} type="radio" name='tsLvl' onChange={handleRadioChange} /></td>
          </tr>
          <tr>
            <td>HTML:</td>
            <td><input value={1}  defaultChecked={feProfile.htmlLvl === 1} type="radio" name='htmlLvl' onChange={handleRadioChange} /></td>
            <td><input value={2}  defaultChecked={feProfile.htmlLvl === 2} type="radio" name='htmlLvl' onChange={handleRadioChange} /></td>
            <td><input value={3}  defaultChecked={feProfile.htmlLvl === 3} type="radio" name='htmlLvl' onChange={handleRadioChange} /></td>
            <td><input value={4}  defaultChecked={feProfile.htmlLvl === 4} type="radio" name='htmlLvl' onChange={handleRadioChange} /></td>
            <td><input value={5}  defaultChecked={feProfile.htmlLvl === 5} type="radio" name='htmlLvl' onChange={handleRadioChange} /></td>
          </tr>
          <tr>
            <td>Css:</td>
            <td><input value={1}  defaultChecked={feProfile.cssLvl === 1} type="radio" name='cssLvl' onChange={handleRadioChange} /></td>
            <td><input value={2}  defaultChecked={feProfile.cssLvl === 2} type="radio" name='cssLvl' onChange={handleRadioChange} /></td>
            <td><input value={3}  defaultChecked={feProfile.cssLvl === 3} type="radio" name='cssLvl' onChange={handleRadioChange} /></td>
            <td><input value={4}  defaultChecked={feProfile.cssLvl === 4} type="radio" name='cssLvl' onChange={handleRadioChange} /></td>
            <td><input value={5}  defaultChecked={feProfile.cssLvl === 5} type="radio" name='cssLvl' onChange={handleRadioChange} /></td>
          </tr>
        </tbody>
      </table>
      <h4>Tools:</h4>
      <label>
        <input name="tools" value={'Npmyarn'} type="checkbox" defaultChecked={feProfile.tools.includes('Npmyarn')} onChange={handleCBChange} />
        NPM/Yarn
      </label><br />
      <label>
        <input name="tools" value={'Webpack'} type="checkbox" defaultChecked={feProfile.tools.includes('Webpack')} onChange={handleCBChange} />
        Webpack
      </label><br />
      <label>
        <input name="tools" value={'Gg'} type="checkbox" defaultChecked={feProfile.tools.includes('Gg')} onChange={handleCBChange} />
        Grunt/Gulp
      </label><br />
      <label>
        <input name="tools" value={'Babel'} type="checkbox" defaultChecked={feProfile.tools.includes('Babel')} onChange={handleCBChange} />
        Babel
      </label><br />
    </div>
  );
}

export default FeProfile;