import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import Messenger from '../messenger/Messenger';
import { Select, Icon, Divider, Input, } from 'antd';
import { Link } from "react-router-dom";
import './JoinChat.css'


import {setUser} from '../../store/actions/socket/socket'

const { Option } = Select;

const mapDispatchToProps = (dispatch) => {
  return {
    // setUser: (userConnected, user) => dispatch(setUser(userConnected, user))

  };
};
const mapStateToProps = (state, ownProps) => {
const { user: user} = state.user.login;
// const { userConnected: userConnected} = state.socket.socket;
return {
  ...ownProps,
  user,
}};


const ChatRooms = ({user, history}) => { 
  const [name, setName] = useState(user.pseudo);
  const [room, setRoom] = useState('');
  const [rooms, setRooms] = useState( ['gigot', 'cadomique']);
  const [roomToAdd, setRoomToAdd] = useState('');

  const goToRoom = () => {
    history.push(`/chat/${name}/${room}`)
  }


 const addRoom = (e) => {
   console.log("roomToAdd =>", roomToAdd)
     setRooms( [...rooms, roomToAdd])
  };
      return (
        <div className="joinOuterContainer">
        <div className="joinInnerContainer">
          <h1 className="heading">Join a room</h1>
          <div>
          <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="pseudo"
              defaultValue={user.pseudo}
              onChange={(event) => setName(event.target.value)}
            />,
              <Input
              prefix={<Icon type="plus-circle" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="RoomToAdd"
              onChange={(event) => setRoomToAdd(event.target.value)}            />,
          </div>
          <Select
         prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
        style={{ width:"100%" }}
        placeholder="Select your room"
        onChange = {value => setRoom(value)}
        dropdownRender={menu => (
          <div>
            {menu}
            <Divider style={{ margin: '4px 0' }} />
            <div
              style={{ padding: '4px 8px', cursor: 'pointer' }}
              onMouseDown={e => e.preventDefault()}
              onClick={e => (!roomToAdd) ? e.preventDefault() : addRoom()}
            >
              <Icon type="plus" /> Ajouter une room
            </div>
          </div>
        )}
      >
        {rooms.map(room => (
          <Option key={room}>{room}</Option>
        ))}
      </Select>
          <Link onClick={e => (!name || !room) ? e.preventDefault(alert("merci de renseigner au moins les champs room et pseudo"))  : goToRoom()}>
            <button className={'button mt-20'} type="submit">Rejoindre</button>
          </Link>
        </div>
      </div>
     );
    }
      ChatRooms.propTypes = {
        userData: PropTypes.object,
        match: PropTypes.object,
      };

  

export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(withRouter(ChatRooms));