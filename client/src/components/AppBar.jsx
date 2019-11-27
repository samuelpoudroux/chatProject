import React from 'react';
import {Layout, Menu} from 'antd';
import {NavLink} from 'react-router-dom';
import PropTypes from 'prop-types';

const {Header} = Layout;
const {Item, SubMenu} = Menu;

const AppBar = ({current}) => {
  return (
    <Header tagName={'header'}>
      <Menu
        theme="dark"
        mode="horizontal"
        selectedKeys={[current]}
        style={{lineHeight: '64px'}}
      >
        <Item disabled>
          <img  className="App-logo" alt="logo" width="40px"/>
        </Item>
        <Item key="LOGIN">
          <NavLink to="/login" className="nav-text">
           Login
          </NavLink>
        </Item>
        <Item key="GROUPCHAT">
          <NavLink to="/groupChat" className="nav-text">
                groupChat
          </NavLink>
        </Item>
      </Menu>
    </Header>
  );
};

AppBar.propTypes = {
  current: PropTypes.string,
};

export default AppBar;
