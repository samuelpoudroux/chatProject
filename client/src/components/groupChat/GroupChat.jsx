import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

const GroupChat = ({}) => {    
      return (
        <h1>GROUPCHAT</h1>
      );
    }

    const mapDispatchToProps = () => {
        return {};
      };
    const mapStateToProps = (state, ownProps) => {
        const {data: user} = 'toto';
        return {
          ...ownProps,
          user
        };
      };

export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(withRouter(GroupChat));