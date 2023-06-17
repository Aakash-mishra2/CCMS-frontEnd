import React, { Suspense, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import RegisteredCases from './court/pages/RegisteredCases';
import MainNavigation from './shared/Navigation/MainNavigation';
import { AuthContext } from './shared/context/authContext';
import LoadingSpinner from './shared/UIelements/LoadingSpinner';
import './App.css';
//no need to change how we use it just need to change how we import it.
const Citizens = React.lazy(() => import('./citizens/pages/Citizens'));
const NewCases = React.lazy(() => import('./court/pages/NewCases'));
const Authenticate = React.lazy(() => import('./citizens/pages/Authenticate'));
const UpdateCases = React.lazy(() => import('./court/pages/UpdateCases'));
export const App = () => {

  const [log_In, setLog_In] = useState(false);
  const [loginID, setLoginID] = useState();

  function logout() { setLog_In(false); setLoginID(null); }
  function login(cID) { setLog_In(true); setLoginID(cID); }
  //suspense is required to make lazy loading work..
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
          <Suspense
            fallback={
              <div className='center'><LoadingSpinner asOverlay /></div>
            }>
            {routes}
          </Suspense>
        </main>
      </BrowserRouter>
    </AuthContext.Provider >
  );
}

export default App;
