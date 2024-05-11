import React from 'react';
import MainProfile from './SubProfiles/MainProfile';
import { axiosAuthInstToSv } from './../../network/server.net';
import { useNavigate, useParams } from 'react-router';
import { BeProfileI, FeProfileI, Profile, SSProfileI } from './../../models/user.model';
import FeProfile from './SubProfiles/FeProfile';
import BeProfile from './SubProfiles/BeProfile';
import SSProfile from './SubProfiles/SSProfile';

function EditProfile(): ReturnType<React.FC> {
  
  const navigate = useNavigate();
  const { userId } = useParams();

  const [userProfile, setUserProfile] = React.useState<Profile | null>(null);
  const [newUserProfile, setNewUserProfile] = React.useState<Profile>();
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
        setFormAtIndex(<BeProfile setNewUserProfile={setNewUserProfile} beProfile={userProfile.beProfile as  BeProfileI} />, 2);
      } else {
        setFormAtIndex(<></>, 2);
        setNewUserProfile((prevState) => {
          const aux = {...prevState};
          delete aux.beProfile;
          return aux;
        });
      }
      if (stack.includes('FE') && userProfile) {
        setFormAtIndex(<FeProfile setNewUserProfile={setNewUserProfile} feProfile={userProfile.feProfile as FeProfileI} />, 1);
      } else {
        setFormAtIndex(<></>, 1);
        setNewUserProfile(prevState => {
          const aux = {...prevState};
          delete aux.feProfile;
          return aux;
        });
      }
    }
    setFormAtIndex( <SSProfile setNewUserProfile={setNewUserProfile} ssProfile={userProfile?.ssProfile as SSProfileI} />, 3 )
  }, [stack, userProfile])

  React.useEffect(() => {
    if (userProfile == null) {
      return;
    }
    setNewUserProfile(userProfile);
    setForms([
      <MainProfile 
        profile={userProfile as Profile} 
        setStack={setStack} 
        setNewUserProfile={setNewUserProfile}
      />, 
      userProfile.feProfile != null ? <FeProfile setNewUserProfile={setNewUserProfile} feProfile={userProfile.feProfile as FeProfileI} /> : <></>, 
      userProfile.beProfile != null ? <BeProfile setNewUserProfile={setNewUserProfile} beProfile={userProfile.beProfile as BeProfileI} /> : <></>, 
      <SSProfile setNewUserProfile={setNewUserProfile} ssProfile={userProfile?.ssProfile as SSProfileI} />,
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
    if (nxtId === forms.length) {
      console.log(newUserProfile);
      axiosAuthInstToSv.patch(`/profile/${userId}`, newUserProfile).then(() => {
        navigate(`/profile/${userId}`);
        return
      }).catch(err => {
        console.error(err);
        alert('ERROR');
      })//*/
      return
    }//*/

    while (nxtId < forms.length && forms[nxtId].type === React.Fragment) {      
      nxtId++;
    }
    if (nxtId < forms.length) {
      setFormIndex(nxtId);
    }
  }

  const goBack = () => {
    let nxtId = formIndex - 1;
    while (nxtId >= 0 && forms[nxtId].type === React.Fragment) {      
      nxtId--;
    }
    if (nxtId >= 0) {
      setFormIndex(nxtId);
    }
  }

  return !userProfile ? null : (
    <div>
      {forms[formIndex]}
      <div>
        <hr />
        <button onClick={goBack}>prev</button>
        <button onClick={goForward}>next</button>
      </div>
    </div>
  );
}

export default EditProfile;