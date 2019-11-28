import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';

const mapDispatchToProps = () => {
  return {};
};
const mapStateToProps = (state, ownProps) => {
const { user: user} = state.user.login;
return {
  ...ownProps,
  user
}
};

const ChatRooms = ({user}) => {  
      return (
        <h1>bienvenu {user.pseudo}</h1>
      );
    }
      ChatRooms.propTypes = {
        userData: PropTypes.object
      };

export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(withRouter(ChatRooms));