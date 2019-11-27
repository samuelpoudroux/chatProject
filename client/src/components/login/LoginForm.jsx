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

const LoginForm = ({form}) => {
    const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched, validateFields } = form;
    const usernameError = isFieldTouched('username') && getFieldError('username');
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
    
      return (
        <Form onSubmit={handleSubmit} className="" style={{}} >
        <Form.Item>
          {getFieldDecorator('username', {
            rules: [{ required: true, message: 'Please input your username!' }],
          })(
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Username"
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="Password"
            />,
          )}
        </Form.Item>
        <Form.Item>
            <Row>
            {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true,
          })}
            </Row>
          <Row> 
          </Row>
                
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