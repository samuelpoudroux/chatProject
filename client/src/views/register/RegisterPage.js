import React from 'react';
import {Layout, Row, Col, BackTop} from 'antd';
import AppBar from '../../components/AppBar';
import Footer from '../../components/Footer';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import RegisterForm from '../../components/register/RegisterForm';

const {Content} = Layout;

const mapDispatchToProps = () => {
  return {};
};
const mapStateToProps = (state, ownProps) => {
  // const {data: user} = state.user.getUserProfile;
  return {
    ...ownProps,
    // user
  };
};

const RegisterPage = () => {
  return (
    <Layout className="layout" style={{minHeight: '100vh'}}>
      <AppBar current="HOME"/>
      <Content >
        <Row >
          <BackTop/>
          <Col span={12} offset={6} style={{minHeight: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <RegisterForm />
          </Col>
        </Row>
      </Content>
      <Footer/>
    </Layout>
  );
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(withRouter(RegisterPage));

