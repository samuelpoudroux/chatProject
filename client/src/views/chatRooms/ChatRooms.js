import React from 'react';
import {Layout, Row, Col,BackTop} from 'antd';
import AppBar from '../../components/AppBar';
import Footer from '../../components/Footer';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import GroupChat from '../../components/chatRooms/ChatRooms'


const {Content} = Layout;

const mapDispatchToProps = () => {
    return {};
  };
const mapStateToProps = (state, ownProps) => {
    return {
      ...ownProps,
    };
  };

const ChatRooms = () => {
  return (
    <Layout className="layout" style={{minHeight: '100vh'}}>
      <AppBar current="CHATROOMS"/>
      <Content>
        <Row>
          <BackTop/>
          <Col span={12} offset={6}>
            <GroupChat />
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
  )(withRouter(ChatRooms));
  
