import React from 'react';

function BeProfile(): ReturnType<React.FC> {
  return (
    <div>
      <h4>Frameworks:</h4>
      <input type="checkbox"  /> Node.js <br />
      <input type="checkbox"  /> Django <br />
      <input type="checkbox"  /> Ruby on rails <br />
      <input type="checkbox"  /> Spring boot <br />
      <input type="checkbox"  /> ASP.NET <br />
      <input type="checkbox"  /> Other: <input type="text" />

    </div>
  );
}

export default BeProfile;