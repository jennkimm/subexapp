import React, { useState } from 'react';
import { Menu, Button, Icon } from 'antd';
import './Navbar.css';

const Navbar = () => {
    const [visible, setVisible] = useState(false);
    return (
        <nav className="menu" style={{ width: '100%' }}>
            <div className="menu__logo">
                Logo
            </div>
            <div className="menu__container">
                <Menu className="menu_left" mode="horizontal">
                    <Menu.Item key="home">
                        <a href="/">홈</a>
                    </Menu.Item>
                    <Menu.Item key="seeking">
                        <a href="/">내가 찾는 강의</a>
                    </Menu.Item>
                    <Menu.Item key="having">
                        <a href="/">내가 갖고 있는 강의</a>
                    </Menu.Item>
                    <Menu.Item key="exchanging">
                        <a href="/">1:1 교환을 원하는 강의</a>
                    </Menu.Item>
                </Menu>
                <div className="menu_right">
                    <span id="logger">Hi anonymous!</span>
                    <Button
                        className="menu__mobile-button"
                        type="primary"
                    >로그인</Button>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;