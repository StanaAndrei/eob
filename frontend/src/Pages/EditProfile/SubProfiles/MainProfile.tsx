import React from 'react';
import { MultiSelect, Option } from "react-multi-select-component";
import { Profile } from '../../../models/user.model';

const options: Option[] = [
  { label: 'Technology', value: 'TECH' },
  { label: 'Health', value: 'HEALTH' },
  { label: 'Finance', value: 'FINANCE' },
  { label: 'Education', value: 'EDU' },
  { label: 'Retail', value: 'RETAIL' },
  { label: 'Other(complete)', value: 'OTHER' },
];

function MainProfile({ profile, setUserProfile, setStack }: { 
  profile: Profile, 
  setUserProfile: React.Dispatch<React.SetStateAction<Profile | null>>,
  setStack: React.Dispatch<React.SetStateAction<string>>,
}): ReturnType<React.FC> {
  
  const [selected, setSelected] = React.useState<Option[]>(() => profile.indType.map(
    (elem: string): Option => ({ label: options.find(opt => opt.value === elem)?.label as string, value: elem })
  ));

  React.useEffect(() => {
    setUserProfile((prevState: Profile | null): Profile | null => {
      if (prevState == null) {
        return null;
      }
      prevState.indType = selected.map(opt => opt.value);      
      return prevState;
    })
  }, [selected, setUserProfile])
  

  React.useEffect(() => {
    if (selected.find((elem: Option) => elem.value === 'OTHER') != null) {
      const customAns = prompt('What?:');
      const customOpt: Option = { label: '', value: customAns };
      setSelected((prevState: Option[]): Option[] => {
        const tmpArr = [...prevState];
        tmpArr.pop();
        return [...tmpArr, customOpt]
      })
    }
  }, [selected])

  return (
    <div>
      <form>
        <label>xp:</label>
        <input type="number" defaultValue={profile.xp} 
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
            setUserProfile((prevState: Profile | null): Profile => ({ ...prevState!, xp: Number(e.target.value) }))
          }
        /><br />
        <MultiSelect 
          options={options} 
          value={selected} 
          onChange={setSelected} labelledBy='Industry type:' 
          hasSelectAll={false}
        /> <br />
        <p>stack:</p>
        <div
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setStack(e.target.value)}
        >
          <input type="radio" value={'FE'} name='stack' /> Frontend <br />
          <input type="radio" value={'BE'} name='stack' /> Backend <br />
          <input type="radio" value={'BEFE'} name='stack' /> Both <br />
        </div>
      </form>
    </div>
  );
}

export default MainProfile;
/**
 * 
 * 
 */