import React from 'react';
import MainProfile from './SubProfiles/MainProfile';
import { axiosAuthInstToSv } from './../../network/server.net';
import { useParams } from 'react-router';
import { Profile } from './../../models/user.model';

function EditProfile(): ReturnType<React.FC> {
  
  const { userId } = useParams();

  const [userProfile, setProfile] = React.useState<Profile | null>(null);

  React.useEffect(() => {
    console.log(userProfile);
    
  }, [userProfile]);

  React.useEffect(() => {    
    axiosAuthInstToSv.get(`/user/${userId}`).then(res => {
      setProfile(res.data.profile);
    }).catch(err => {
      console.error(err);
      alert('ERROR')
    })
  }, [userId])

  return !userProfile ? null : (
    <div>
      <MainProfile profile={userProfile as Profile} setProfile={setProfile} />
    </div>
  );
}

export default EditProfile;