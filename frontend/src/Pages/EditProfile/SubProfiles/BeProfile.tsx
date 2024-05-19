import React from 'react';
import { BeProfileI, DEFAULT_PROFILE, Profile } from '../../../models/user.model';
import { doDiff, doInter } from '../../../utils/arrset';
const fwArr = ['Node', 'Django', 'Ror', 'Spring', '.net'];
const plArr = ['Java', 'Python', 'Ruby', 'Php', 'C#'];


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
    }))
  }, [setNewUserProfile, newBeProfState])

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
          aux.fws = aux.fws.filter(e => e !== value);
          return aux;
        })
      } else {
        setnewBeProfState((prevState: BeProfileI) => {
          const aux: BeProfileI = {...prevState};
          aux.plangs = aux.plangs.filter(e => e !== value);
          return aux;
        })
      }
    }
  };

  const setLvl = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setnewBeProfState(prevState => ({
      ...prevState,
      [name]: Number(value),
    }));
  }

  const updateFwTxt = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const inputFws = Array.from(new Set(value.split(',').map(item => item.trim()).filter(Boolean))); // Remove duplicates and empty strings

    setnewBeProfState(prevState => {
      const currentFwsSet = new Set(prevState.fws);
      const inputFwsSet = new Set(inputFws);

      const additions = inputFws.filter(item => !currentFwsSet.has(item));
      const deletions = prevState.fws.filter(item => !inputFwsSet.has(item));

      // Add new items
      const updatedFws = [...prevState.fws, ...additions];

      // Remove deleted items
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
  }

  const updatePlTxt = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const inputPlans = Array.from(new Set(value.split(',').map(item => item.trim()).filter(Boolean))); // Remove duplicates and empty strings

    setnewBeProfState(prevState => {
      const currentPlangsSet = new Set(prevState.plangs);
      const inputPlangsSet = new Set(inputPlans);

      const additions = inputPlans.filter(item => !currentPlangsSet.has(item));
      const deletions = prevState.plangs.filter(item => !inputPlangsSet.has(item));

      // Add new items
      const updatedPlangs = [...prevState.plangs, ...additions];

      // Remove deleted items
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
  }

  React.useEffect(() => {
    if (!otherFwChecked) {
      setnewBeProfState(prevState => ({
        ...prevState,
        fws: doInter<string>(fwArr, beProfile.fws)
      }))
    }
  }, [otherFwChecked, beProfile])

  React.useEffect(() => {
    if (!otherPlChecked) {
      setnewBeProfState(prevState => ({
        ...prevState,
        plangs: doInter<string>(plArr, beProfile.plangs)
      }))
    }
  }, [otherPlChecked, beProfile])

  return (
    <div>
      <h4>Frameworks:</h4>
      <input name="fws" value={'Node'} type="checkbox" defaultChecked={nodeChecked} onChange={handleCheckboxChange} /> Node.js <br />
      <input name="fws" value={'Django'} type="checkbox" defaultChecked={djangoChecked} onChange={handleCheckboxChange} /> Django <br />
      <input name="fws" value={'Ror'} type="checkbox" defaultChecked={rorChecked} onChange={handleCheckboxChange} /> Ruby on rails <br />
      <input name="fws" value={'Spring'} type="checkbox" defaultChecked={springChecked} onChange={handleCheckboxChange} /> Spring boot <br />
      <input name="fws" value={'.net'} type="checkbox" defaultChecked={aspChecked} onChange={handleCheckboxChange} /> ASP.NET <br />
      <input name="fws" value={'other'} type="checkbox" defaultChecked={otherFwChecked} onChange={handleCheckboxChange} /> Other: 
      <input type="text" disabled={!otherFwChecked} onBlur={updateFwTxt} 
        defaultValue={!otherFwChecked ? undefined : doDiff<string>(beProfile.fws, fwArr).join(',')}
      /> <br />
      <h4>Programming languages:</h4>
      <input name="plangs" value={'Java'} type="checkbox" defaultChecked={javaChecked} onChange={handleCheckboxChange} /> Java <br />
      <input name="plangs" value={'Python'} type="checkbox" defaultChecked={pyChecked} onChange={handleCheckboxChange} /> Python <br />
      <input name="plangs" value={'Ruby'} type="checkbox" defaultChecked={rubyChecked} onChange={handleCheckboxChange} /> Ruby <br />
      <input name="plangs" value={'Php'} type="checkbox" defaultChecked={phpChecked} onChange={handleCheckboxChange} /> Php <br />
      <input name="plangs" value={'C#'} type="checkbox" defaultChecked={csChecked} onChange={handleCheckboxChange} /> C# <br />
      <input name="plangs" value={'other'} type="checkbox" defaultChecked={otherPlChecked} onChange={handleCheckboxChange} /> Other: 
      <input type="text"
        defaultValue={!otherPlChecked ? undefined : doDiff<string>(beProfile.plangs, plArr).join(',')}
        disabled={!otherPlChecked} onBlur={updatePlTxt} 
      /> <br />
      <h4>Tools:</h4>
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
            <th>Docker</th>
            <th><input onChange={setLvl} value={1} defaultChecked={beProfile.dockerLvl === 1} type="radio" name="dockerLvl" id="" /></th>
            <th><input onChange={setLvl} value={2} defaultChecked={beProfile.dockerLvl === 2} type="radio" name="dockerLvl" id="" /></th>
            <th><input onChange={setLvl} value={3} defaultChecked={beProfile.dockerLvl === 3} type="radio" name="dockerLvl" id="" /></th>
            <th><input onChange={setLvl} value={4} defaultChecked={beProfile.dockerLvl === 4} type="radio" name="dockerLvl" id="" /></th>
            <th><input onChange={setLvl} value={5} defaultChecked={beProfile.dockerLvl === 5} type="radio" name="dockerLvl" id="" /></th>
          </tr>
          <tr>
            <th>Kuber</th>
            <th><input onChange={setLvl} value={1} defaultChecked={beProfile.kuberLvl === 1} type="radio" name="kuberLvl" id="" /></th>
            <th><input onChange={setLvl} value={2} defaultChecked={beProfile.kuberLvl === 2} type="radio" name="kuberLvl" id="" /></th>
            <th><input onChange={setLvl} value={3} defaultChecked={beProfile.kuberLvl === 3} type="radio" name="kuberLvl" id="" /></th>
            <th><input onChange={setLvl} value={4} defaultChecked={beProfile.kuberLvl === 4} type="radio" name="kuberLvl" id="" /></th>
            <th><input onChange={setLvl} value={5} defaultChecked={beProfile.kuberLvl === 5} type="radio" name="kuberLvl" id="" /></th>
          </tr>
          <tr>
            <th>Aws/Azure/Gcp</th>
            <th><input onChange={setLvl} value={1} defaultChecked={beProfile.awsAzureGcpLvl === 1} type="radio" name="awsAzureGcpLvl" id="" /></th>
            <th><input onChange={setLvl} value={2} defaultChecked={beProfile.awsAzureGcpLvl === 2} type="radio" name="awsAzureGcpLvl" id="" /></th>
            <th><input onChange={setLvl} value={3} defaultChecked={beProfile.awsAzureGcpLvl === 3} type="radio" name="awsAzureGcpLvl" id="" /></th>
            <th><input onChange={setLvl} value={4} defaultChecked={beProfile.awsAzureGcpLvl === 4} type="radio" name="awsAzureGcpLvl" id="" /></th>
            <th><input onChange={setLvl} value={5} defaultChecked={beProfile.awsAzureGcpLvl === 5} type="radio" name="awsAzureGcpLvl" id="" /></th>
          </tr>
          <tr>
            <th>Mysql/Pgsql</th>
            <th><input onChange={setLvl} value={1} defaultChecked={beProfile.sqlLvl === 1} type="radio" name="sqlLvl" id="" /></th>
            <th><input onChange={setLvl} value={2} defaultChecked={beProfile.sqlLvl === 2} type="radio" name="sqlLvl" id="" /></th>
            <th><input onChange={setLvl} value={3} defaultChecked={beProfile.sqlLvl === 3} type="radio" name="sqlLvl" id="" /></th>
            <th><input onChange={setLvl} value={4} defaultChecked={beProfile.sqlLvl === 4} type="radio" name="sqlLvl" id="" /></th>
            <th><input onChange={setLvl} value={5} defaultChecked={beProfile.sqlLvl === 5} type="radio" name="sqlLvl" id="" /></th>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default BeProfile;