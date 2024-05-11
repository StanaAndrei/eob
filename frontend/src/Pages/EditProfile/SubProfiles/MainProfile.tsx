import React from 'react';
import { Profile } from '../../../models/user.model';
import { doDiff, doInter } from '../../../utils/arrset';


const indArr = ['TECH', 'HEALTH', 'FINANCE', 'EDU', 'RETAIL'];

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
        aux = aux.filter(e => e !== value);
        return aux;
      })
    }
  }

  const handleTxtInpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setIndType(prevState => [...prevState, ...value.split(',')]);
  }

  React.useEffect(() => {
    if (!otherChecked) {
      setIndType(prevState => doInter<string>(prevState, indArr));
    }
  }, [otherChecked])

  return (
    <div>
      <form>
        <label>xp:</label>
        <input type="number" defaultValue={profile.xp} 
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
            setXp(Number(e.target.value))
          }
        /><br />
        <div>
          <input defaultChecked={profile.indType?.includes('TECH')} type="checkbox" value={'TECH'} onChange={handleIndChange} /> Technology <br />
          <input defaultChecked={profile.indType?.includes('HEALTH')} type="checkbox" value={'HEALTH'} onChange={handleIndChange} /> Health <br />
          <input defaultChecked={profile.indType?.includes('FINANCE')} type="checkbox" value={'FINANCE'} onChange={handleIndChange} /> Finance <br />
          <input defaultChecked={profile.indType?.includes('EDU')} type="checkbox" value={'EDU'} onChange={handleIndChange} /> Education <br />
          <input defaultChecked={profile.indType?.includes('RETAIL')} type="checkbox" value={'RETAIL'} onChange={handleIndChange} /> Retail <br />
          <input defaultChecked={otherChecked} type="checkbox" value={'OTHER'} onChange={
            () => {
              setOtherChecked(prev => !prev);
            }
          } /> Other:
           <input type='text'
              defaultValue={doDiff<string>(profile.indType as string[], indArr).join(',')}
              disabled={!otherChecked} onBlur={handleTxtInpChange} 
            />
        </div>
        <br />
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