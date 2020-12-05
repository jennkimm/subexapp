import React, { Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import LandingPage from './components/LandingPage/LandingPage';
import ProfilePage from './pages/ProfilePage';
import RegisterPage from './components/RegisterPage';
import Navbar from './components/Navbar/Navbar';
import Auth from './hoc/auth';

const App = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Navbar />
      <div style={{ paddingTop: '20px', minHeight: 'calc(100vh - 80px)' }}>
        <Switch>
          <Route component={Auth(LandingPage, null)} path="/" exact />
          <Route component={Auth(LoginPage, true)} path="/login" />
          <Route component={Auth(ProfilePage, false)} path="/profile" />
          <Route component={Auth(RegisterPage, true)} path="/register" />
        </Switch>
      </div>
    </Suspense>
  );
};

export default App;
