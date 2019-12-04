import React from 'react';

import onlineIcon from '../../images/onlineIcon.png';
import { Col, Row} from 'antd';

import './TextContainer.css';

const TextContainer = ({ users }) => (
  <Col md={12} sm={24} className="textContainer">
    <div>
      <h5>Application de chat<span role="img" aria-label="emoji">💬</span></h5>
    </div>
    {
      users
        ? (
          <div>
            <p>Personnes présentes sur le chat:</p>
            <div className="activeContainer">
              <h2>
                {users.map(({name}) => (
                  <div key={name} className="activeItem">
                    {name}
                    <img alt="Online Icon" src={onlineIcon}/>
                  </div>
                ))}
              </h2>
            </div>
          </div>
        )
        : null
    }
  </Col>
);

export default TextContainer;