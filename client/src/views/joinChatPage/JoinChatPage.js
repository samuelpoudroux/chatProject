import React, {useEffect} from 'react';
import {Layout, Row, Col, BackTop} from 'antd';
import AppBar from '../../components/AppBar';
import Footer from '../../components/Footer';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import JoinChat from '../../components/joinChat/JoinChat';
import './JoinChatPage.css'


const {Content} = Layout;

const mapDispatchToProps = () => {
  return {};
};
const mapStateToProps = (state, ownProps) => {
  return {
    ...ownProps,
  };
};


const JoinChatPage = ({match}) => {

  // useEffect(() => {
  //           window.location.reload()

  // }, [])
  return (
    <Layout className="layout" style={{minHeight: '100vh'}}>
      <AppBar current="CHATROOMS"/>
      <Content className="JoinChatPageContainer">
        <Row >
          <BackTop/>
          <Col>
            <JoinChat/>
          </Col>
        </Row>
      </Content>
      <Footer/>
    </Layout>
  );
};

JoinChatPage.propTypes = {
  match: PropTypes.object,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(withRouter(JoinChatPage));

