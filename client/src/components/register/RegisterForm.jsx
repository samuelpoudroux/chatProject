import React, {useEffect, useState} from 'react';
import { Redirect } from "react-router-dom";
import {Button, Divider, Form, Input, Icon,Checkbox, Col, notification, Select, Spin, Switch, Row} from 'antd';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import { registerUser } from '../../store/actions/user/register';

const mapDispatchToProps = (dispatch) => {
    return {
      registerUser: (userInfo, history) => dispatch(registerUser(userInfo, history))
    };
  };
const mapStateToProps = (state, ownProps) => {
  const { errors:errors} = state.user.register;
    return {
      ...ownProps,
      errors
    };
  };

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

const RegisterForm = ({form,registerUser, history, errors}) => {
    const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched, validateFields } = form;
    const userNameError = isFieldTouched('userName') && getFieldError('userName');
    const emailError = isFieldTouched('email') && getFieldError('email');
    const passwordError = isFieldTouched('password') && getFieldError('password');
    
    const handleSubmit = e => {
        e.preventDefault();
        form.validateFieldsAndScroll((err, userInfo) => {
          if (!err) {
           registerUser(userInfo, history)
          }
        });
      };
      const compareToFirstPassword = (rule, value, callback) => {
        if (value && value !== form.getFieldValue('password')) {
          callback('Two passwords that you enter is inconsistent!');
        } else {
          callback();
        }
      };
      
      const validateToNextPassword = (rule, value, callback) => {
        if (value) {
          form.validateFields(['confirm'], { force: true });
        }
        callback();
      };
    
      return (
        <Form onSubmit={handleSubmit} className="" style={{}} >
        <Form.Item >
          {console.log("jsx error", errors)}
          {getFieldDecorator('pseudo', {
            rules: [{ required: true, message: 'Please input your pseudo!' }],
          })(
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type='pseudo'
              placeholder="pseudo"
            />,
          )}
          { errors.pseudo ? <p style={{ color: 'red' }}> { errors.pseudo}</p> : null}
        </Form.Item>
        <Form.Item >
          {getFieldDecorator('email', {
            rules: [{ required: true, message: 'Please input your email!' }],
          })(
            <Input
              prefix={<Icon type="link" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="email"
              placeholder="Email"
            />,
          )}
          { errors.email ? <p style={{ color: 'red' }}> { errors.email}</p> : null}
        </Form.Item>
        <Form.Item >
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' },
            {
              validator: validateToNextPassword,
            },],
          })(
            <Input.Password
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="Password"
            />,
          )}
          { errors.password ? <p style={{ color: 'red' }}> { errors.password}</p> : null}

        </Form.Item>
        <Form.Item >
          {getFieldDecorator('passwordConfirm', {
            rules: [{ required: true, message: 'Please input your passwordConfirm!' },
            {validator: compareToFirstPassword}],
          })(
            <Input.Password
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="passwordConfirm"
              placeholder="PasswordConfirm"
            />,
          )}
                              { errors.passwordConfirm ? <p style={{ color: 'red' }}> { errors.passwordConfirm}</p> : null}

        </Form.Item>  
          <Button type="primary" htmlType="submit" className="login-form-button">
            S'inscrire
          </Button>
            </Form>
      );
    }

export default Form.create({})(connect(
    mapStateToProps,
    mapDispatchToProps
  )(withRouter(RegisterForm)));