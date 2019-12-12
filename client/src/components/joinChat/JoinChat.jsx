import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Select, Icon, Divider, Input, Button, message, Col, Row } from 'antd';
import { Link } from "react-router-dom";
import './JoinChat.css';
import SocketContext from '../../socket-context.js'
import handlerPrompt from '../../services/handlePrompt.js'
import Card from './card/Card'


const { Option } = Select;

const mapDispatchToProps = (dispatch) => {
  return {
    // setUser: (userConnected, user) => dispatch(setUser(userConnected, user))

  };
};
const mapStateToProps = (state, ownProps) => {
  const { user: user } = state.user.login;
  // const { userConnected: userConnected} = state.socket.socket;
  return {
    ...ownProps,
    user,
  }
};

const JoinChat = ({ user, history, props, socket }) => {
  const [name, setName] = useState(user.pseudo);
  const [room, setRoom] = useState('');
  const [newRoom, setNewRoom] = useState('')
  const [rooms, setRooms] = useState(["test"]);
  const [users, setUsers] = useState([]);
  const [usersFilter, setUsersFilter] = useState([]);

  useEffect(() => {
    socket.on('rooms', (roomData) => {
      setRooms(roomData);
    })
  }, [rooms]);

  useEffect(() => {
    if (newRoom !== '') {
      socket.emit('rooms', newRoom)
    }
  }, [newRoom])

  useEffect(() => {
    socket.on('users', users => {
      setUsers(users)
    })
  }, [users])

  useEffect(() => {
    socket.connect()
    socket.emit('rooms')
  }, [])

  socket.on('users', users => {
    setUsers(users)
  })

  const goToRoom = () => {
    history.push(`/chat/${name}/${room}`)
  }

  useEffect(() => {
    socket.on('userByName', users => {
      setUsers(users)
    })
  }, [usersFilter]);

  const getUserByName = (e) => {
    if(e.target.value !== null && e.target.value !== '') {
      socket.emit('userByName', e.target.value )
    } else {
      socket.emit('getAllUser')
    }
  }

  const addNewRoom = async (e) => {
    const result = await handlerPrompt("room")
    setNewRoom(result)
  };
  return (
    <Row type='flex' className="joinOuterContainer" align="middle" >
      <Col md={{ span: 12 }} xs={{ span: 24 }} className="box colCenter" >
        <Col md={{ span: 12 }} xs={{ span: 24 }} className="" >
          <h5 className="heading"><span style={{ color: 'white' }}>Joindre une salle de chat</span></h5>

          <div>
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="pseudo"
              defaultValue={user.pseudo}
              onChange={(event) => setName(event.target.value)}
            />,
              </div>
          <Select
            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
            style={{ width: "100%" }}
            placeholder="Select ton salon"
            onChange={value => setRoom(value)}
            dropdownRender={menu => (
              <div>
                {menu}
                <Divider style={{ margin: '4px 0' }} />
                <div
                  style={{ padding: '4px 8px', cursor: 'pointer' }}
                  onMouseDown={e => e.preventDefault()}
                  onClick={e => addNewRoom(e)}
                >
                  <Icon type="plus" /> Ajouter un salon
                </div>
              </div>
            )}
          >
            {rooms.map(room => (
              <Option key={room}>{room}</Option>
            ))}
          </Select>
          <Button onClick={e => (!name || !room) ? e.preventDefault() : goToRoom()} type='dashed' className={'mt-2'}><span style={{ color: '#0089c8' }}>Rejoindre</span></Button>
        </Col>
      </Col>
      <Col md={{ span: 12 }} xs={{ span: 24 }} className='box'>
        <Row style={{marginTop:'10px'}} type='flex' align="space-around">
          <h5 style={{ color: 'white' }} >Utilisateurs connectés</h5 >
          <Input style={{width:'auto'}}placeholder='rechercher un utilisateur'
          prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} 
          onChange={ (e) => getUserByName(e)}/>
        </Row>
        <Row style={{marginTop:'10px'}} type='flex' align="middle" justify={users.length < 3 ? 'start' : "center"} >
          {users.map(user => {
            return <Card key={user} currentUser={name} history={history} user={user} bordered={true} />
          })}
        </Row>
      </Col>
    </Row>
  );
  alert("merci de renseigner au moins les champs room et pseudo")
}
JoinChat.propTypes = {
  userData: PropTypes.object,
  match: PropTypes.object,
};

const joinChatWithSocket = props => {
  return <SocketContext.Consumer>
    {socket => <JoinChat {...props} socket={socket} />}
  </SocketContext.Consumer>
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(joinChatWithSocket));