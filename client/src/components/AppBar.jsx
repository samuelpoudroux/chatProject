import React from 'react';
import { Layout, Menu } from 'antd';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Icon, Row } from 'antd';
import { logoutUser } from '../store/actions/user/login'
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import './AppBar.css'

const { Header } = Layout;
const { Item, SubMenu } = Menu;

const mapDispatchToProps = (dispatch) => {
  return {
    logoutUser: (history) => dispatch(logoutUser(history))
  };
};
const mapStateToProps = (state, ownProps) => {
  const { isAuthenticated: authenticated, user: user } = state.user.login;
  return {
    ...ownProps,
    authenticated,
    user
  }
};

const AppBar = ({ current, authenticated, user, logoutUser, history }) => {
  return (
    <Header tagName={'header'} style={{ lineHeight: '64px', background: '#344E86', color: 'white' }}>
      <Menu
        mode="horizontal"
        selectedKeys={[current]}
        style={{ lineHeight: '64px', background: '#344E86', color: 'white' }}
      >
        <Item key='HOME'>
          <Icon type="user" style={{ color: 'white', height: "15px", }} />
        </Item>

        <Item key="JOINCHAT">
          <span className="submenu-title-wrapper">
            {authenticated && <NavLink to={`/joinChat/${user.id}`} className="nav-text">
              <Icon type="mail" style={{ color: 'white', height: "15px", }} />Joindre un salon</NavLink>}
          </span>
        </Item>

        <Item key="CHATROOMS">
              {authenticated && <Icon type='wechat' style={{ color: 'white', height: "15px", }} />}
        </Item>

        <Item style={{ float: 'right' }} key="LOGIN">
          {authenticated && <span className="" onClick={e => logoutUser(history)}>
            <img src={user.avatar} alt={user.name} title={user.name} className="rounded-circle" style={{ width: '25px', marginRight: '5px' }} />Logout</span>}
          {!authenticated && <NavLink to="/login" style={{color:'white'}} className="">Login</NavLink>}
        </Item>



      </Menu>
    </Header>
  );
};

AppBar.propTypes = {
  current: PropTypes.string,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(AppBar));
