import React from 'react';
import {Layout, Row, Col,BackTop} from 'antd';
import AppBar from '../../components/AppBar';
import Footer from '../../components/Footer';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import ChatRoom from '../../components/chatRooms/ChatRooms';
import PropTypes from 'prop-types';


const {Content} = Layout;

const mapDispatchToProps = () => {
    return {};
  };
const mapStateToProps = (state, ownProps) => {
  
    return {
      ...ownProps,
    };
  };


const ChatRoomsPage = ({match}) => {
  return (
    <Layout className="layout" style={{minHeight: '100vh'}}>
      {console.log(match.params.userId)}
      <AppBar current="CHATROOMS"/>
      <Content>
        <Row>
          <BackTop/>
          <Col span={12} offset={6}>
            <ChatRoom />
          </Col>
        </Row>
      </Content>
      <Footer/>
    </Layout>
  );
};

ChatRoomsPage.propTypes = {
  match: PropTypes.object
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(withRouter(ChatRoomsPage));
  
