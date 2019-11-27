import React from 'react';
import {Layout, Row, Col,BackTop} from 'antd';
import AppBar from '../../components/AppBar';
import Footer from '../../components/Footer';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import GroupChat from '../../components/groupChat/GroupChat'


const {Content} = Layout;

const mapDispatchToProps = () => {
    return {};
  };
const mapStateToProps = (state, ownProps) => {
    const {data: network} = state.network.single;
    const {data: grpOfLines} = state.groupOfLines.single;
    const {data: line} = state.line.single;
    return {
      ...ownProps,
      network,
      grpOfLines,
      line
    };
  };

const GroupChatPage = () => {
  return (
    <Layout className="layout" style={{minHeight: '100vh'}}>
      <AppBar current="GROUPCHAT"/>
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
  )(withRouter(GroupChatPage));
  
