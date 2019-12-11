import React from 'react';

import onlineIcon from '../../images/onlineIcon.png';
import { Col, Row, Button } from 'antd';

import './TextContainer.css';

const TextContainer = ({ users, disconnect }) => (
  <Col md={12} sm={24} className="textContainer">
    <div>
      <h5>Application de chat<span role="img" aria-label="emoji">💬</span></h5>
    </div>
    {
      users
        ? (
          <div>
            <p>Personnes présentes sur le chat:</p>
            <Col className="activeContainer">
              {users.map(({ name }) => (
                <Row key={name} className="activeItem">
                  <h3>{name}</h3>
                  <img alt="Online Icon" src={onlineIcon} />
                </Row>
              ))}

              <Button onClick={(e) => disconnect()} style={{backgroundColor:'#344E86', color:'white'}} >
                Se deconnecter
              </Button>
            </Col>
          </div>
        )
        : null
    }
  </Col>
);

export default TextContainer;