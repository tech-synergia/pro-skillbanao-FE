

import React from 'react';
import { Button, Checkbox, Form, Input } from 'antd';
import logo from '../images/logo.png'

// const onFinish = (values: any) => {
//   console.log('Success:', values);
// };

// const onFinishFailed = (errorInfo: any) => {
//   console.log('Failed:', errorInfo);
// };

// type FieldType = {
//   username?: string;
//   password?: string;
//   remember?: string;
// };

const Login = () => (
  <Form
    name="basic"
    labelCol={{ span: 6 }}
    wrapperCol={{ span: 16 }}
    style={{ maxWidth: 600, margin: "20vh auto", border: "1px solid lightgrey", padding: "20px"}}
    initialValues={{ remember: false }}
  >
    <img id="logo" src={logo} alt="" />
    <h2 className='text-center mb-3'>Login</h2>
    <Form.Item
      label="Mobile Number"
      name="mobile"
      rules={[{ required: true, message: 'Please input your Mobile Number!' }]}
    >
      <Input />
    </Form.Item>

    <Form.Item
      label="Password"
      name="password"
      rules={[{ required: true, message: 'Please input your password!' }]}
    >
      <Input.Password />
    </Form.Item>

    {/* <Form.Item
      name="remember"
      valuePropName="checked"
      wrapperCol={{ offset: 8, span: 16 }}
    >
      <Checkbox>Remember me</Checkbox>
    </Form.Item> */}
    <p className='text-center'>Don't Have an Account? <a href="/">Sign Up Here</a></p>

    <Form.Item wrapperCol={{ offset: 10, span: 16 }}>
      <Button type="primary" htmlType="submit">
        Sign In
      </Button>
    </Form.Item>
  </Form>
);

export default Login;
