import React from 'react';
import MainProfile from './SubProfiles/MainProfile';
import { axiosAuthInstToSv } from './../../network/server.net';
import { useParams } from 'react-router';
import { FeProfileI, Profile } from './../../models/user.model';
import FeProfile from './SubProfiles/FeProfile';
import BeProfile from './SubProfiles/BeProfile';

function EditProfile(): ReturnType<React.FC> {
  
  const { userId } = useParams();

  const [userProfile, setUserProfile] = React.useState<Profile | null>(null);
  const [stack, setStack] = React.useState<string>('');
  const [forms, setForms] = React.useState<JSX.Element[]>([]);
  const setFormAtIndex = (elem: JSX.Element, id: number) => {
    setForms(prevState => {
      const tmp = [...prevState];
      tmp[id]= elem;
      return tmp;
    })
  }
  
  //const [currId, setCurrId] = React.useState<number>(0);

  React.useEffect(() => {
    console.log(userProfile);
    
  }, [userProfile]);

  React.useEffect(() => {
    if (stack != '') {      
      if (stack.includes('BE')) {
        console.log();
        
      }
      if (stack.includes('FE')) {
        console.log();
        
      }
    }
  }, [stack])

  React.useEffect(() => {
    if (userProfile == null) {
      return;
    }
    setForms([
      <MainProfile 
        profile={userProfile as Profile} 
        setUserProfile={setUserProfile} 
        setStack={setStack} 
      />
    ]);
  }, [userProfile])

  React.useEffect(() => {    
    axiosAuthInstToSv.get(`/user/${userId}`).then(res => {
      setUserProfile(res.data.profile);
    }).catch(err => {
      console.error(err);
      alert('ERROR')
    })
  }, [userId])
  const [formIndex, setFormIndex] = React.useState<number>(0);

  return !userProfile ? null : (
    <div>
      {/*forms[formIndex]*/}
      <FeProfile feProfile={userProfile.feProfile as FeProfileI} />
      <div>
        <hr />
        <button>prev</button>
        <button>next</button>
      </div>
    </div>
  );
}

export default EditProfile;
/**
 * 
 * <MainProfile profile={userProfile as Profile} setUserProfile={setUserProfile} setStack={setStack} />
 */