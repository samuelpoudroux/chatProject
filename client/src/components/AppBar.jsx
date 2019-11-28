import React from 'react';
import {Layout, Menu} from 'antd';
import {NavLink} from 'react-router-dom';
import PropTypes from 'prop-types';
import {Icon} from 'antd';
import {logoutUser} from '../store/actions/user/login'
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

const {Header} = Layout;
const {Item, SubMenu} = Menu;

const mapDispatchToProps = (dispatch) => {
  return {
    logoutUser: (history) => dispatch(logoutUser(history))
  };
};
const mapStateToProps = (state, ownProps) => {
const {isAuthenticated: authenticated, user: user} = state.user.login;
  return {
    ...ownProps,
    authenticated,
    user
  }
};

const AppBar = ({current, authenticated, user, logoutUser, history}) => {
  return (
    <Header tagName={'header'}>
      <Menu
        theme="dark"
        mode="horizontal"
        selectedKeys={[current]}
        style={{lineHeight: '64px'}}
      >
        <Item disabled>
        <Icon type="user"  style={{ color: 'white', height:"15px",}} />   
          </Item>
     
        <Item key="CHATROOMS">
        {authenticated &&  <NavLink to={`/chatRooms/${user.id}`} className="nav-text">ChatRooms</NavLink> }
        </Item>

        <Item  style={{float:'right'}}>
        {authenticated &&  <span className="nav-text" onClick={ e => logoutUser(history)}> 
          <img src={user.avatar} alt={user.name} title={user.name} className="rounded-circle" style={{ width: '25px', marginRight: '5px' }}  />Logout</span> }
          {!authenticated &&  <NavLink to="/login" className="nav-text">Login</NavLink> }
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
