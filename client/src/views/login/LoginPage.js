import React from 'react';
import {Layout, Row, Col,BackTop} from 'antd';
import LoginForm from '../../components/login/LoginForm'
import AppBar from '../../components/AppBar';
import Footer from '../../components/Footer';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

const {Content} = Layout;

const mapDispatchToProps = () => {
    return {};
  };
const mapStateToProps = (state, ownProps) => {
    //const {data: user} = state.user.getUserProfile;
    return {
      ...ownProps,
    };
  };

const LoginPage = () => {
  return (
    <Layout className="layout" style={{minHeight: '100vh'}}>
      <AppBar current="LOGIN"/>
      <Content >
        <Row >
          <BackTop/>
          <Col span={12} offset={6} style={{minHeight: '70vh',display:'flex', alignItems:'center', justifyContent:'center'}}>
            <LoginForm />
          </Col>
        </Row>
      </Content>
      <Footer/>
    </Layout>
  );
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(withRouter(LoginPage));
  
