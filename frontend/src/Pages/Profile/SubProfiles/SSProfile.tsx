import React from 'react';
import { SSProfileI } from '../../../models/user.model'; // Assuming the path to the interface

function SSProfile({ ssProfile }: { ssProfile: SSProfileI }): ReturnType<React.FC> {
  return (
    <div>
      <p>Communication Style: {ssProfile?.commStyle}</p>
      <p>Conflict Handling Method: {ssProfile?.conflictHandlingMethod}</p>
      <p>Listening Level: {ssProfile?.listeningLvl}</p>
      <p>Verbal Level: {ssProfile?.verbalLvl}</p>
      <p>Written Level: {ssProfile?.writtenLvl}</p>
      <p>Collaboration Level: {ssProfile?.collabLvl}</p>
      <p>Conflict Resolution Level: {ssProfile?.conflictResolutionLvl}</p>
      <p>Leadership Level: {ssProfile?.leadershipLvl}</p>
    </div>
  );
}

export default SSProfile;
