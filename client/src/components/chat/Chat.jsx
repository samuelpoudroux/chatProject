import React, { useState, useEffect } from "react";
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import TextContainer from '../textContainer/TextContainer';
import Messages from '../messages/Messages';
import Input from '../input/Input';
import { Col, Row } from 'antd';
import ChatHeader from "../chatHeader/ChatHeader";
import './Chat.css';
import SocketContext from '../../socket-context'

const mapDispatchToProps = () => {
  return {};
};
const mapStateToProps = (state, ownProps) => {
  const { user: userData } = state.user.login;
  return {
    ...ownProps,
    userData
  };
};

const Chat = ({ match, userData, props, socket, history }) => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [users, setUsers] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const { name, room } = match.params
    setRoom(room);
    setName(name);
    socket.emit('join', { name, room }, (error) => {
      if (error) {
        alert(error);
      };
      socket.emit('getAllUser')
    });
    return () => {
      socket.emit('getAllUser')
      socket.disconnect()
      socket.off()
    }
  }, [match.params]);

  useEffect(() => {
    socket.on('message', (message) => {
      setMessages([...messages, message]);
    });

    socket.on('roomData', ({ users }) => {
      setUsers(users);
    })
  }, [messages])

  const sendMessage = (event) => {
    event.preventDefault();
    if (message) {
      socket.emit('sendMessage', message, () => setMessage(''));
    }
  }
  const leaveRoom = (e) => {
    socket.emit('disconnect');
    socket.off();
    history.push(`/joinChat/${userData.id}`)
  }

  return (
    <Row className="outerContainer">
      <Col md={12} sm={24} className="container">
        <ChatHeader room={room} />
        <Messages messages={messages} name={name} />
        <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
      </Col>
      <TextContainer users={users} disconnect={leaveRoom} />
    </Row>
  );
}

const ChatWithSocket = props => {
  return <SocketContext.Consumer>
    {socket => <Chat {...props} socket={socket} />}
  </SocketContext.Consumer>
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(ChatWithSocket));



