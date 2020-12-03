import React from 'react';
import { Route } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import MainPage from './pages/MainPage';
import ProfilePage from './pages/ProfilePage';
import RegisterPage from './pages/RegisterPage';
import Auth from './hoc/auth';

const App = () => {
  return (
    <>
      <Route component={Auth(MainPage, null)} path="/" exact />
      <Route component={Auth(LoginPage, true)} path="/login" />
      <Route component={Auth(ProfilePage, false)} path="/profile" />
      <Route component={Auth(RegisterPage, false)} path="/register" />
    </>
  )
}

export default App;
