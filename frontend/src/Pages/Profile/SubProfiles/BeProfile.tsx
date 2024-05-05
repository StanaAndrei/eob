import React from 'react';
import { BeProfileI } from '../../../models/user.model'; // Assuming the path to the interface

function BeProfile({ beProfile }: { beProfile: BeProfileI }): ReturnType<React.FC> {
  return (
    <div>
      <p>Frameworks: {beProfile?.fws.join(', ')}</p>
      <p>Programming Languages: {beProfile?.plangs.join(', ')}</p>
      <p>Docker Level: {beProfile?.dockerLvl}</p>
      <p>Kubernetes Level: {beProfile?.kuberLvl}</p>
      <p>AWS/Azure/GCP Level: {beProfile?.awsAzureGcpLvl}</p>
      <p>SQL Level: {beProfile?.sqlLvl}</p>
    </div>
  );
}

export default BeProfile;
