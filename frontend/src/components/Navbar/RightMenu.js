import React from 'react';
import { Menu } from 'antd';
import axios from 'axios';
import { USER_SERVER } from '../Config';
import { withRouter } from 'react-router-dom';
import { useSelector } from 'react-redux';

const RightMenu = (props) => {
  const user = useSelector((state) => state.user);

  const logoutHandler = () => {
    axios.get(`${USER_SERVER}/logout`).then((response) => {
      if (response.status === 200 || response.status === 304) {
        console.log("logging out...");
        window.localStorage.removeItem('userId');
        props.history.push("/");
      } else {
        alert('Log Out Failed');
      }
    });
  };

  if (window.localStorage.getItem('userId') && !user.userData) {
    user.userData = { ...user.userData, userId: window.localStorage.getItem('userId')};
  }

console.log("window.localStorage = "+window.localStorage.getItem('userId'));
console.log("user.userData="+user.userData);
  if (!user.userData || !window.localStorage.getItem('userId')) {
    return (
      <Menu mode={props.mode}>
        <Menu.Item key="mail">
          <a href="/login">Signin</a>
        </Menu.Item>
        <Menu.Item key="app">
          <a href="/register">Signup</a>
        </Menu.Item>
      </Menu>
    );
  } else {
    return (
      <Menu mode={props.mode}>
        <Menu.Item key="message">
          <p>{user.userData.userId} 님</p>
        </Menu.Item>
        <Menu.Item key="logout">
          <a onClick={logoutHandler}>Logout</a>
        </Menu.Item>
      </Menu>
    );
  }
};

export default withRouter(RightMenu);
