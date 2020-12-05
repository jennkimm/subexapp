import React from 'react';
import { Route } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import LandingPage from './components/LandingPage/LandingPage';
import ProfilePage from './pages/ProfilePage';
import RegisterPage from './components/RegisterPage';
import Auth from './hoc/auth';

const App = () => {
  return (
    <>
      <Route component={Auth(LandingPage, null)} path="/" exact />
      <Route component={Auth(LoginPage, true)} path="/login" />
      <Route component={Auth(ProfilePage, false)} path="/profile" />
      <Route component={Auth(RegisterPage, true)} path="/register" />
    </>
  )
}

export default App;
