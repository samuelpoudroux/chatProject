import React, {useEffect, useState} from 'react';
import { Redirect } from "react-router-dom";
import {Button,  Form, Input, Icon, Row} from 'antd';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

import {loginUser} from '../../store/actions/user/login'

const mapDispatchToProps = (dispatch) => {
    return {
      loginUser: (userInfo, history) => dispatch(loginUser(userInfo, history))
    };
  };
const mapStateToProps = (state, ownProps) => {
  const {isAuthenticated: authenticated, user: user, errors:errors} = state.user.login;
    return {
      ...ownProps,
      authenticated,
      user, 
      errors
    }
  };

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

const LoginForm = ({form, loginUser, history, authenticated, user, errors}) => {
    const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched, validateFields } = form;
    const usernameError = isFieldTouched('email') && getFieldError('email');
    const passwordError = isFieldTouched('password') && getFieldError('password');

    useEffect(() => {
      if(authenticated) {
        history.push(`/chatRooms/${user.id}`);
      } 
    });
    
    
    const handleSubmit = e => {
        e.preventDefault();
        // le scroll permet de scroller automatiquement vers un éventuel champ en erreur
        form.validateFieldsAndScroll((err, userInfo) => {
          if (!err) {
           loginUser(userInfo, history)
          }
        });
      };
      return (
        <Form onSubmit={handleSubmit} className="" style={{}} >
          {console.log( 'log', errors.password)}
        <Form.Item>
          {getFieldDecorator('email', {
            rules: [{ required: true, message: 'Please input your email!'},
          ],
          })(
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="email"
            />,
          )}
          { errors.email ? <p style={{ color: 'red' }}> { errors.email}</p> : null}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="Password"
            />
          )}
                    { errors.password ? <p style={{ color: 'red' }}> { errors.password}</p> : null}
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Log in
          </Button>
          <Row>
          or <a href="/register">register now!</a>
          </Row>
        </Form.Item>
      </Form>
      );
    }

export default Form.create({})(connect(
    mapStateToProps,
    mapDispatchToProps
  )(withRouter(LoginForm)));