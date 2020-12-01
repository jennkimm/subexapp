import React from 'react';
import { Route } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import MainPage from './pages/MainPage';
import ProfilePage from './pages/ProfilePage';
import RegisterPage from './pages/RegisterPage'; 

const App = () => {
  return (
    <>
      <Route component={MainPage} path="/" exact />
      <Route component={LoginPage} path="/login" />
      <Route component={ProfilePage} path="/profile" />
      <Route component={RegisterPage} path="/register" />
    </>
  )
}

export default App;
