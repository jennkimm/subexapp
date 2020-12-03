import React from 'react';
import { Menu, Button } from 'antd';
import axios from 'axios';
import { USER_SERVER } from '../Config';
import { withRouter } from 'react-router-dom';
import { auth } from '../../_actions/user_actions'
import { useSelector } from 'react-redux';
import { useDispatch } from "react-redux";

const RightMenu = (props) => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const logoutHandler = () => {
    axios.get(`${USER_SERVER}/logout`).then((response) => {
      if (response.status === 200 || response.status === 304) {
        console.log("logging out...");
        window.localStorage.removeItem('userId');
        window.localStorage.removeItem('isAuth');
        props.history.push("/");
      } else {
        alert('Log Out Failed');
      }
    });
  };

  if (window.localStorage.getItem('userId') && !user.userData) {
    dispatch(auth()).then(async response => {
      window.localStorage.setItem('isAuth', response.payload.isAuth);
    })
  }

  if (!user.userData || !window.localStorage.getItem('userId') || !window.localStorage.getItem('isAuth')) {
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
      <div className="userSession">
        <a href="/profile" className="userName">{window.localStorage.getItem('userId')} 님</a>
        <Button className="logoutButton" onClick={logoutHandler}>Logout</Button>
      </div>
      // <Menu mode={props.mode}>
      //   <Menu.Item key="message">
      //     <a>{window.localStorage.getItem('userId')} 님</a>
      //   </Menu.Item>
      //   <Button onClick={logoutHandler}>Logout</Button>
      // </Menu>
    );
  }
};

export default withRouter(RightMenu);
