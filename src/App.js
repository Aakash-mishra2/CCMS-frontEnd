import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Citizens from './citizens/pages/Citizens';
import NewCases from './court/pages/NewCases';
import RegisteredCases from './court/pages/RegisteredCases';
import MainNavigation from './shared/Navigation/MainNavigation';
import UpdateCases from './court/pages/UpdateCases';
import Authenticate from './citizens/pages/Authenticate';
import { AuthContext } from './shared/context/authContext';

import './App.css';

export const App = () => {

  const [log_In, setLog_In] = useState(false);
  const [loginID, setLoginID] = useState();

  function logout() { setLog_In(false); setLoginID(null); }
  function login(cID) { setLog_In(true); setLoginID(cID); }

  let routes;
  if (log_In) {
    routes = (
      <Routes>
        <Route path="/" element={< Citizens />} />
        <Route path="/cases/new" element={<NewCases />} />
        <Route path="/:uid/cases" element={< RegisteredCases />} />
        <Route path="/update/:caseID" element={<UpdateCases />} />
        <Route path="/users/authenticate" element={<Navigate to="/" />} />
      </Routes>
    )
  }
  else {
    routes = (
      <Routes>
        <Route path="/" element={< Citizens />} />
        <Route path="/users/authenticate" element={<Authenticate />} />
        <Route path="/users/authenticate" element={<Navigate to="/users/authenticate" />} />
        <Route path="/cases/new" element={<Navigate to="/users/authenticate" />} />
        <Route path="/:uid/cases" element={<Navigate to="/users/authenticate" />} />
        <Route path="/update/:caseID" element={<Navigate to="/users/authenticate" />} />
      </Routes>
    )
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn: log_In, loginID: loginID, login: login, logout: logout }} >
      <BrowserRouter>
        <MainNavigation />
        <main>
          {routes}
        </main>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
