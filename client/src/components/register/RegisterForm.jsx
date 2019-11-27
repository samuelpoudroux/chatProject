import React, {useEffect, useState} from 'react';
import { Redirect } from "react-router-dom";
import {Button, Divider, Form, Input, Icon,Checkbox, Col, notification, Select, Spin, Switch, Row} from 'antd';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

const mapDispatchToProps = () => {
    return {};
  };
const mapStateToProps = (state, ownProps) => {
    const {data: user} = state.user.getUserProfile;
    return {
      ...ownProps,
    user
    };
  };

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}



const RegisterForm = ({form,}) => {
    const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched, validateFields } = form;
    const userNameError = isFieldTouched('userName') && getFieldError('userName');
    const emailError = isFieldTouched('email') && getFieldError('email');
    const passwordError = isFieldTouched('password') && getFieldError('password');
    
    const handleSubmit = e => {
        e.preventDefault();
        // le scroll permet de scroller automatiquement vers un éventuel champ en erreur
        form.validateFieldsAndScroll((err, userInfo) => {
          if (!err) {
           console.log(userInfo)
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
        <Form.Item hasFeedback>
          {getFieldDecorator('userName', {
            rules: [{ required: true, message: 'Please input your username!' }],
          })(
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type='userName'
              placeholder="Username"
            />,
          )}
        </Form.Item>
        <Form.Item hasFeedback>
          {getFieldDecorator('email', {
            rules: [{ required: true, message: 'Please input your email!' }],
          })(
            <Input
              prefix={<Icon type="link" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="email"
              placeholder="Email"
            />,
          )}
        </Form.Item>
        <Form.Item hasFeedback>
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
        </Form.Item>
        <Form.Item hasFeedback>
          {getFieldDecorator('passwordConfirmation', {
            rules: [{ required: true, message: 'Please input your passwordConfirmation!' },
            {validator: compareToFirstPassword}],
          })(
            <Input.Password
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="passwordConfirmation"
              placeholder="PasswordConfirmation"
            />,
          )}
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