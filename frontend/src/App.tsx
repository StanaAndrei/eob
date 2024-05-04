import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  //Navigate
} from "react-router-dom";
import Nav from './components/Nav/Nav';
import Login from './Pages/Login/Login';
import Home from './Pages/Home/Home';
import Register from './Pages/Register/Register';
import Logout from './Pages/Logout/Logout';

function App(): ReturnType<React.FC> {

  return <Router>
    <Nav />
    <Routes>

      <Route path='/home' element={ <Home /> } />
      <Route path='/logout' element={ <Logout /> } />

      <Route path='/login' element={ <Login /> } />
      <Route path='/register' element={ <Register /> } />

    </Routes>
  </Router>
}

export default App
