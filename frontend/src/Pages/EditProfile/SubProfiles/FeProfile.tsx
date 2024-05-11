import React from 'react';
import { FeProfileI } from '../../../models/user.model';

function FeProfile({ feProfile }: { feProfile: FeProfileI }): ReturnType<React.FC> {

  const [checkboxesState, setCheckboxesState] = React.useState({
    reactChecked: feProfile.fws.includes('React'),
    ngChecked: feProfile.fws.includes('Ng'),
    vueChecked: feProfile.fws.includes('Vue'),
    otherChecked: !(feProfile.fws.includes('React') || feProfile.fws.includes('Ng') || feProfile.fws.includes('Vue')),
    npmyarnChecked: feProfile.tools.includes('npmyarn'),
    webpackChecked: feProfile.tools.includes('webpack'),
    ggChecked: feProfile.tools.includes('gg'),
    babelChecked: feProfile.tools.includes('babel'),
  });
  const [fws, setFws] = React.useState<string[]>([]);
  const [tools, setTools] = React.useState<string[]>([]);

  const handleToolChange = (e: React.SyntheticEvent<HTMLInputElement>, isChecked: boolean) => {
    const { value } = e.target as HTMLInputElement;
    if (isChecked) {
      setTools(prev => {
        const aux = [...prev];
        aux.push(value);
        return aux;
      })
    } else {
      setTools(prev => {
        let aux = [...prev];
        aux = aux.filter(e => e !== value);
        return aux;
      });
    }
  }

  const handleFwChange = (e: React.SyntheticEvent<HTMLInputElement>, isChecked: boolean) => {
    const { value } = e.target as HTMLInputElement;
    if (isChecked) {
      setFws(prev => {
        const aux = [...prev];
        aux.push(value);
        return aux;
      })
    } else {
      setFws(prev => {
        let aux = [...prev];
        aux = aux.filter(e => e !== value);
        return aux;
      });
    }
  }

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setCheckboxesState(prevState => ({
      ...prevState,
      [name]: checked,
    }));
  };

  return (
    <div>
      <h4>Frameworks:</h4>
      <label>
        <input name="reactChecked" type="checkbox" checked={checkboxesState.reactChecked} onChange={handleCheckboxChange} />
        React
      </label><br />
      <label>
        <input name="ngChecked" type="checkbox" checked={checkboxesState.ngChecked} onChange={handleCheckboxChange} />
        Angular
      </label><br />
      <label>
        <input name="vueChecked" type="checkbox" checked={checkboxesState.vueChecked} onChange={handleCheckboxChange} />
        Vue
      </label><br />
      <label>
        <input name="otherChecked" type="checkbox" checked={checkboxesState.otherChecked} onChange={handleCheckboxChange} />
        Other:
      </label>
      <input type="text" disabled={!checkboxesState.otherChecked} /><br />
      <hr />
      <h4>Level of:</h4>
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
            <td>Javascript:</td>
            <td><input defaultChecked={feProfile.jsLvl === 1} type="radio" name='jsLvl' /></td>
            <td><input defaultChecked={feProfile.jsLvl === 2} type="radio" name='jsLvl' /></td>
            <td><input defaultChecked={feProfile.jsLvl === 3} type="radio" name='jsLvl' /></td>
            <td><input defaultChecked={feProfile.jsLvl === 4} type="radio" name='jsLvl' /></td>
            <td><input defaultChecked={feProfile.jsLvl === 5} type="radio" name='jsLvl' /></td>
          </tr>
          <tr>
            <td>Typescript:</td>
            <td><input defaultChecked={feProfile.tsLvl === 1} type="radio" name='tsLvl' /></td>
            <td><input defaultChecked={feProfile.tsLvl === 2} type="radio" name='tsLvl' /></td>
            <td><input defaultChecked={feProfile.tsLvl === 3} type="radio" name='tsLvl' /></td>
            <td><input defaultChecked={feProfile.tsLvl === 4} type="radio" name='tsLvl' /></td>
            <td><input defaultChecked={feProfile.tsLvl === 5} type="radio" name='tsLvl' /></td>
          </tr>
          <tr>
            <td>HTML:</td>
            <td><input defaultChecked={feProfile.htmlLvl === 1} type="radio" name='htmlLvl' /></td>
            <td><input defaultChecked={feProfile.htmlLvl === 2} type="radio" name='htmlLvl' /></td>
            <td><input defaultChecked={feProfile.htmlLvl === 3} type="radio" name='htmlLvl' /></td>
            <td><input defaultChecked={feProfile.htmlLvl === 4} type="radio" name='htmlLvl' /></td>
            <td><input defaultChecked={feProfile.htmlLvl === 5} type="radio" name='htmlLvl' /></td>
          </tr>
          <tr>
            <td>Css:</td>
            <td><input defaultChecked={feProfile.cssLvl === 1} type="radio" name='cssLvl' /></td>
            <td><input defaultChecked={feProfile.cssLvl === 2} type="radio" name='cssLvl' /></td>
            <td><input defaultChecked={feProfile.cssLvl === 3} type="radio" name='cssLvl' /></td>
            <td><input defaultChecked={feProfile.cssLvl === 4} type="radio" name='cssLvl' /></td>
            <td><input defaultChecked={feProfile.cssLvl === 5} type="radio" name='cssLvl' /></td>
          </tr>
        </tbody>
      </table>
      <h4>Tools:</h4>
      <label>
        <input name="npmyarnChecked" type="checkbox" checked={checkboxesState.npmyarnChecked} onChange={handleCheckboxChange} />
        NPM/Yarn
      </label><br />
      <label>
        <input name="webpackChecked" type="checkbox" checked={checkboxesState.webpackChecked} onChange={handleCheckboxChange} />
        Webpack
      </label><br />
      <label>
        <input name="ggChecked" type="checkbox" checked={checkboxesState.ggChecked} onChange={handleCheckboxChange} />
        Grunt/Gulp
      </label><br />
      <label>
        <input name="babelChecked" type="checkbox" checked={checkboxesState.babelChecked} onChange={handleCheckboxChange} />
        Babel
      </label><br />
    </div>
  );
}

export default FeProfile;