import React from 'react';

import { FeProfileI } from '../../../models/user.model';

function FeProfile({ feProfile }: { feProfile: FeProfileI }): ReturnType<React.FC> {
  return (
    <div>
      <p>HTML Level: {feProfile?.htmlLvl}</p>
      <p>JS Level: {feProfile?.jsLvl}</p>
      <p>CSS Level: {feProfile?.cssLvl}</p>
      <p>TypeScript Level: {feProfile?.tsLvl}</p>
      <p>Frameworks and Libraries: {feProfile?.fws.join(', ')}</p>
      <p>Tools: {feProfile?.tools.join(', ')}</p>
    </div>
  );
}

export default FeProfile;