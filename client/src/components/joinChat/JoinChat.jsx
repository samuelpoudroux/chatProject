import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes, { string } from 'prop-types';
import { Select, Icon, Divider, Input, Button, message, Col, Row, Alert} from 'antd';
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
  const [alert, setAlert] = useState(false);
  const [users, setUsers] = useState([]);
  const [usersFilter, setUsersFilter] = useState([]);
  const [error, setError] = useState();


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

  const goToRoom = (e) => {
    e.preventDefault()
    socket.emit('beforeJoin', { name, room }, (callback) => {
      if (callback === true) {
        history.push(`/chat/${name}/${room}`)
      }   else {
        setError(callback);
      }
  });
  }

  useEffect(() => {
  }, [usersFilter]);

  useEffect(() => {
    socket.on('userByName', users => {
      setUsers(users)
    })
  }, [usersFilter]);

  // useEffect(() => {
  //   socket.on('beforeJoin', errors => {
  //     console.log(errors)
  //     setErrors(errors)
  //   })
  // }, [errors]);

  const getUserByName = (e) => {
    if (e.target.value !== null && e.target.value !== '') {
      socket.emit('userByName', e.target.value.trim())
    } else {
      socket.emit('getAllUser')
    }
  }

  const addNewRoom = async (e) => {
    const result = await handlerPrompt("salon")
    setNewRoom(result)
  };
  return (
    <Row type='flex' className="joinOuterContainer" align="middle" >
      <Col md={{ span: 12 }} xs={{ span: 24 }} className="box" >

      {error && <Alert message={error} type="info" closeText="Close Now" />}
        <Row style={{ marginTop: '10px' }} type='flex' align="space-around">
          <h5 className="heading"><span style={{ color: 'white' }}>Joindre une salle de chat</span></h5>
        </Row>

        <Col style={{ color: '#344E86', marginTop: "5%" }} className="colCenter" >
          <Input
            prefix={<Icon type="user" style={{ color: '#344E86' }} />}
            placeholder="pseudo"
            defaultValue={user.pseudo}
            onChange={(event) => setName(event.target.value)}
            style={{ width: '250px' }}
          />,
          <Select
            prefix={<Icon type="user" style={{ color: '#344E86' }} />}
            showSearch
            style={{ width: "250px" }}
            placeholder="Choisis ton salon"
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
          <Button onClick={e => goToRoom(e)} type='dashed' className={'mt-2'}><span style={{ color: '#0089c8' }}>Rejoindre</span></Button>
        </Col>
      </Col>

      <Col md={{ span: 12 }} xs={{ span: 24 }} className='box'>
        <Row style={{ marginTop: '10px' }} type='flex' align="space-around">
          <h5 className='heading' style={{ color: 'white' }} >Utilisateurs connectés</h5 >
          <Input style={{ width: 'auto' }} placeholder='rechercher un utilisateur'
            prefix={<Icon type="user" style={{ color: '#344E86' }} />}
            onChange={(e) => getUserByName(e)} />
        </Row>
        <Row style={{ marginTop: '10px' }} type='flex' align="middle" justify={users.length < 3 ? 'start' : "center"} >
          {users.map(user => {
            return <Card key={user} currentUser={name} history={history} user={user} bordered={true} />
          })}
        </Row>
      </Col>
    </Row>
  );
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