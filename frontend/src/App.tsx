import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  //Navigate
} from "react-router-dom";
import Nav from './components/Nav/Nav';
import Login from './Pages/Auth/Login';
import Home from './Pages/Home/Home';
import Register from './Pages/Register/Register';
import Logout from './Pages/Auth/Logout';
import Profile from './Pages/Profile/Profile';
import Me from './Pages/Profile/Me';

function App(): ReturnType<React.FC> {

  return <Router>
    <Nav />
    <Routes>

      <Route path='/home' element={ <Home /> } />
      <Route path='/logout' element={ <Logout /> } />
      <Route path='/profile/:userId' element={ <Profile /> } />
      <Route path='/me' element={ <Me /> } />


      <Route path='/login' element={ <Login /> } />
      <Route path='/register' element={ <Register /> } />

    </Routes>
  </Router>
}

export default App
