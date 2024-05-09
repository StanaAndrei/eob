import React from 'react';
import { BeProfileI } from '../../../models/user.model';

function BeProfile({ beProfile }: {beProfile: BeProfileI}): ReturnType<React.FC> {

  const [nodeChecked, setNodeChecked] = React.useState<boolean>(beProfile.fws.includes('Node'));
  const [djangoChecked, setDjangoChecked] = React.useState<boolean>(beProfile.fws.includes('Django'));
  const [rorChecked, setRorChecked] = React.useState<boolean>(beProfile.fws.includes('Ror'));
  const [springChecked, setSpringChecked] = React.useState<boolean>(beProfile.fws.includes('Spring'));
  const [aspChecked, setAspChecked] = React.useState<boolean>(beProfile.fws.includes('.net'));
  const [otherFwChecked, setOtherFwChecked] = React.useState<boolean>(
    nodeChecked && djangoChecked && rorChecked && springChecked && aspChecked
  );
  const otherFwRef: React.LegacyRef<HTMLInputElement> = React.useRef(null);


  const [javaChecked, setJavaChecked] = React.useState<boolean>(beProfile.plangs.includes('Java'));
  const [pyChecked, setPyChecked] = React.useState<boolean>(beProfile.plangs.includes('Py'));
  const [rubyChecked, setRubyChecked] = React.useState<boolean>(beProfile.plangs.includes('Ruby'));
  const [phpChecked, setPhpChecked] = React.useState<boolean>(beProfile.plangs.includes('Php'));
  const [csChecked, setCsChecked] = React.useState<boolean>(beProfile.plangs.includes('Cs'));
  const [othePlChecked, setOtherPlChecked] = React.useState<boolean>(
    javaChecked && pyChecked && rubyChecked && phpChecked && csChecked
  );
  const otherPlRef: React.LegacyRef<HTMLInputElement> = React.useRef(null);

  return (
    <div>
      <h4>Frameworks:</h4>
      <input defaultChecked={nodeChecked} type="checkbox"  /> Node.js <br />
      <input defaultChecked={djangoChecked} type="checkbox"  /> Django <br />
      <input defaultChecked={rorChecked} type="checkbox"  /> Ruby on rails <br />
      <input defaultChecked={springChecked} type="checkbox"  /> Spring boot <br />
      <input defaultChecked={aspChecked} type="checkbox"  /> ASP.NET <br />
      <input defaultChecked={otherFwChecked} type="checkbox"  /> Other: 
      <input ref={otherFwRef} type="text" />
      <h4>Programming languages:</h4>
      <input defaultChecked={javaChecked} type="checkbox"  /> Java <br />
      <input defaultChecked={pyChecked} type="checkbox"  /> Python <br />
      <input defaultChecked={rubyChecked} type="checkbox"  /> Ruby <br />
      <input defaultChecked={phpChecked} type="checkbox"  /> Php <br />
      <input defaultChecked={csChecked} type="checkbox"  /> C# <br />
      <input defaultChecked={othePlChecked} type="checkbox"  /> Other: 
      <input ref={otherPlRef} type="text" />
      <h4>Tools:</h4>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>1</th>
            <th>2</th>
            <th>3</th>
            <th>4</th>
            <th>5</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>Docker</th>
            <th><input type="checkbox" name="" id="" /></th>
            <th><input type="checkbox" name="" id="" /></th>
            <th><input type="checkbox" name="" id="" /></th>
            <th><input type="checkbox" name="" id="" /></th>
            <th><input type="checkbox" name="" id="" /></th>
          </tr>
          <tr>
            <th>Kuber</th>
            <th><input type="checkbox" name="" id="" /></th>
            <th><input type="checkbox" name="" id="" /></th>
            <th><input type="checkbox" name="" id="" /></th>
            <th><input type="checkbox" name="" id="" /></th>
            <th><input type="checkbox" name="" id="" /></th>
          </tr>
          <tr>
            <th>Aws/Azure/Gcp</th>
            <th><input type="checkbox" name="" id="" /></th>
            <th><input type="checkbox" name="" id="" /></th>
            <th><input type="checkbox" name="" id="" /></th>
            <th><input type="checkbox" name="" id="" /></th>
            <th><input type="checkbox" name="" id="" /></th>
          </tr>
          <tr>
            <th>Mysql/Pgsql</th>
            <th><input type="checkbox" name="" id="" /></th>
            <th><input type="checkbox" name="" id="" /></th>
            <th><input type="checkbox" name="" id="" /></th>
            <th><input type="checkbox" name="" id="" /></th>
            <th><input type="checkbox" name="" id="" /></th>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default BeProfile;