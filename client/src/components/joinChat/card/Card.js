import React, {useEffect, useState} from 'react';
import {  Col, Icon } from 'antd';

const Card = ({currentUser, user, history}) => {
    const goToRoom = () => {
        history.push(`/chat/${currentUser}/${user.room}`)
      }
    return <Col md={7} style={{background:'white', border:'1px solid grey', padding:'5px', margin:'1px', pointer:'cursor'}} onClick={goToRoom}>
      <Icon type='user'/>  {user.name} est connecté sur le salon {user.room}
    </Col>
}
export default Card