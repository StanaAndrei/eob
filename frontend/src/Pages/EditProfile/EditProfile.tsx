import React from 'react';
import MainProfile from './SubProfiles/MainProfile';
import { axiosAuthInstToSv } from './../../network/server.net';
import { useParams } from 'react-router';
import { Profile } from './../../models/user.model';
import MultiStep from 'react-multistep'

function EditProfile(): ReturnType<React.FC> {
  
  const { userId } = useParams();

  const [userProfile, setUserProfile] = React.useState<Profile | null>(null);
  const [stack, setStack] = React.useState<string>('');
  const [forms, setForms] = React.useState<Array<React.FC<{ onNext: () => void; onPrevious: () => void; }>>>(() => {
    // Initialize forms based on userProfile or any other data
    if (userProfile === null) {
      return [];
    } else {
      return [<MainProfile profile={userProfile as Profile} setUserProfile={setUserProfile} setStack={setStack} />];
    }
  });
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
  }, [userProfile])

  React.useEffect(() => {    
    axiosAuthInstToSv.get(`/user/${userId}`).then(res => {
      setUserProfile(res.data.profile);
    }).catch(err => {
      console.error(err);
      alert('ERROR')
    })
  }, [userId])

  return !userProfile ? null : (
    <div>
      {/*<MultiStep 
        activeStep={0}
        steps={forms.map((FormComponent, index) => ({
          name: `Step ${index + 1}`,
          component: <FormComponent onNext={() => ({})} onPrevious={() => ({})} />,
        }))}
      />*/}
    </div>
  );
}

export default EditProfile;