import React from 'react';
import {Layout, Row, Col, BackTop} from 'antd';
import LoginForm from '../../components/login/LoginForm';
import AppBar from '../../components/AppBar';
import Footer from '../../components/Footer';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import Chat from '../../components/chat/Chat';
import PropTypes from 'prop-types';


const {Content} = Layout;

const mapDispatchToProps = () => {
  return {};
};
const mapStateToProps = (state, ownProps) => {
  // const {data: user} = state.user.getUserProfile;
  return {
    ...ownProps,
  };
};

const ChatPage = ({match}) => {
  return (
    <Layout className="layout" style={{minHeight: '100vh'}}>
      <AppBar current="LOGIN"/>
      <Content >
        <Row >
          <BackTop/>
           <Chat match= {match}/>
        </Row>
      </Content>
      <Footer/>
    </Layout>
  );
};

ChatPage.propTypes = {
        match: PropTypes.object,
      };

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(withRouter(ChatPage));

