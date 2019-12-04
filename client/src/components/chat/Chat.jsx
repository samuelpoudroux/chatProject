import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import TextContainer from '../textContainer/TextContainer';
import Messages from '../messages/Messages';
import Input from '../input/Input';
import { Col, Row} from 'antd';
import ChatHeader from "../chatHeader/ChatHeader";
import './Chat.css'

let socket;
const mapDispatchToProps = () => {
  return {};
};
const mapStateToProps = (state, ownProps) => {
  const { user: userData} = state.user.login;
  return {
    ...ownProps,
    userData
  };
};

const Chat = ({ match, userData}) => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [users, setUsers] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const ENDPOINT = 'http://127.0.0.1:5000';

  useEffect(() => {
const {name, room} = match.params    
socket = io(ENDPOINT);

    setRoom(room);
    setName(name)

    socket.emit('join', { name, room }, (error) => {
      if(error) {
        alert(error);
      }
    });
  }, [ENDPOINT, match.params]);

  useEffect(() => {
    socket.on('message', (message) => {
      setMessages([...messages, message ]);
    });

    socket.on('roomData', ({ users }) => {
      setUsers(users);
    })

    return () => {
      socket.emit('disconnect');
      socket.off();
    }
  }, [messages])

  const sendMessage = (event) => {
    event.preventDefault();
    if(message) {
      socket.emit('sendMessage', message, () => setMessage(''));
    }
  }

  return (
    <Row className="outerContainer">
      <Col md={12} sm={24} className="container">
          <ChatHeader room={room} />
          <Messages messages={messages} name={name} />
          <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
      </Col>
      <TextContainer users={users}/>
    </Row>
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(Chat));



