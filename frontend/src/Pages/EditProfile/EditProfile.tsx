import React from 'react';
import MainProfile from './SubProfiles/MainProfile';
import { axiosAuthInstToSv } from './../../network/server.net';
import { useParams } from 'react-router';
import { BeProfileI, FeProfileI, Profile, SSProfileI } from './../../models/user.model';
import FeProfile from './SubProfiles/FeProfile';
import BeProfile from './SubProfiles/BeProfile';
import SSProfile from './SubProfiles/SSProfile';

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
  React.useEffect(() => {
    console.log(userProfile);
    
  }, [userProfile]);

  React.useEffect(() => {
    if (stack != '') {      
      
      if (stack.includes('BE') && userProfile) {
        setFormAtIndex(<BeProfile beProfile={userProfile.beProfile as  BeProfileI} />, 2);
      }
      if (stack.includes('FE') && userProfile) {
        setFormAtIndex(<FeProfile feProfile={userProfile.feProfile as FeProfileI} />, 1);
      }
    }
    setFormAtIndex( <SSProfile ssProfile={userProfile?.ssProfile as SSProfileI} />, 3 )
  }, [stack, userProfile])

  React.useEffect(() => {
    if (userProfile == null) {
      return;
    }
    setForms([
      <MainProfile 
        profile={userProfile as Profile} 
        setUserProfile={setUserProfile} 
        setStack={setStack} 
      />, <></>, <></>, <></>
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

  const goForward = () => {
    let nxtId = formIndex + 1;
    while (nxtId < forms.length && forms[nxtId].type === React.Fragment) {      
      nxtId++;
    }
    if (nxtId < forms.length) {
      setFormIndex(nxtId);
    }
  }

  return !userProfile ? null : (
    <div>
      {forms[formIndex]}
      <div>
        <hr />
        <button>prev</button>
        <button onClick={goForward}>next</button>
      </div>
    </div>
  );
}

export default EditProfile;
/**
 * <BeProfile beProfile={userProfile.beProfile as  BeProfileI} />
 *  <FeProfile feProfile={userProfile.feProfile as FeProfileI} />
 * <MainProfile profile={userProfile as Profile} setUserProfile={setUserProfile} setStack={setStack} />
 */