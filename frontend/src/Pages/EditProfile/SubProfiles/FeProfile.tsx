import React from 'react';
import { FeProfileI } from '../../../models/user.model';

function FeProfile({ feProfile }: { feProfile: FeProfileI }): ReturnType<React.FC> {

  const [reactChecked, setReactChecked] = React.useState<boolean>(feProfile.fws.includes('React'));
  const [ngChecked, setNgChecked] = React.useState<boolean>(feProfile.fws.includes('Ng'));
  const [vueChecked, setVueChecked] = React.useState<boolean>(feProfile.fws.includes('Vue'));
  const [otherChecked, setOtherChecked] = React.useState<boolean>(!(reactChecked || ngChecked || vueChecked));
  const otherRef: React.LegacyRef<HTMLInputElement> = React.useRef(null);
  const [fws, setFws] = React.useState<string[]>([]);
  
  const [npmyarnChecked, setNpmyarnChecked] = React.useState<boolean>(feProfile.tools.includes('npmyarn'));
  const [webpackChecked, setWebpackChecked] = React.useState<boolean>(feProfile.tools.includes('webpack'));
  const [ggChecked, setGgChecked] = React.useState<boolean>(feProfile.tools.includes('gg'));
  const [babelChecked, setBabelChecked] = React.useState<boolean>(feProfile.tools.includes('babel'));
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


  return (
    <div>
      <h4>Frameworks:</h4>
      <label>
        <input value={'React'} defaultChecked={reactChecked} type="checkbox" onChange={e => {
          setReactChecked(!reactChecked);
          handleFwChange(e, reactChecked);
        }} />
        React
      </label><br />
      <label>
        <input value={'Ng'} defaultChecked={ngChecked} type="checkbox" onChange={e => {
          setNgChecked(!ngChecked);
          handleFwChange(e, ngChecked);
        }} />
        Angular
      </label><br />
      <label>
        <input value={'Vue'} defaultChecked={vueChecked} type="checkbox" onChange={e => {
          setVueChecked(!vueChecked);
          handleFwChange(e, vueChecked);
        }} />
        Vue
      </label><br />
      <label>
        <input value={'other'} defaultChecked={otherChecked} type="checkbox" onChange={e => {
          setOtherChecked(!otherChecked);
          handleFwChange(e, otherChecked);
        }} />
        Other:
      </label>
      <input type="text" ref={otherRef} disabled={!otherChecked} />
      <br />
      <hr />
      <br />
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
        <input type="checkbox" checked={npmyarnChecked} onChange={e => {
          setNpmyarnChecked(p => !p);
          handleToolChange(e, npmyarnChecked);
        }} />
        NPM/Yarn
      </label><br />
      <label>
        <input type="checkbox" checked={webpackChecked} onChange={e => {
          setWebpackChecked(p => !p);
          handleToolChange(e, webpackChecked);
        }} />
        Webpack
      </label><br />
      <label>
        <input type="checkbox" checked={ggChecked} onChange={e => {
          setGgChecked(p => !p);
          handleToolChange(e, ggChecked);
        }} />
        Grunt/Gulp
      </label><br />
      <label>
        <input type="checkbox" checked={babelChecked} onChange={e => {
          setBabelChecked(p => !p);
          handleToolChange(e, babelChecked);
        }} />
        Babel
      </label><br />
    </div>
  );
}

export default FeProfile;