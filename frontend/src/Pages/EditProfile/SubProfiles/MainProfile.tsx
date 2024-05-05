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

function MainProfile({ profile, setProfile }: { 
  profile: Profile, 
  setProfile: React.Dispatch<React.SetStateAction<Profile | null>> 
}): ReturnType<React.FC> {
  
  const [selected, setSelected] = React.useState<Option[]>(() => profile.indType.map(
    (elem: string): Option => ({ label: options.find(opt => opt.value === elem)?.label as string, value: elem })
  ));

  React.useEffect(() => {
    setProfile((prevState: Profile | null): Profile | null => {
      if (prevState == null) {
        return null;
      }
      prevState.indType = selected.map(opt => opt.value);      
      return prevState;
    })
  }, [selected, setProfile])
  

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
            setProfile((prevState: Profile | null): Profile => ({ ...prevState!, xp: Number(e.target.value) }))
          }
        /><br />
        <MultiSelect 
          options={options} 
          value={selected} 
          onChange={setSelected} labelledBy='Industry type:' 
          hasSelectAll={false}
        /> <br />
        
      </form>
    </div>
  );
}

export default MainProfile;
/**
 * 
 * 
 */