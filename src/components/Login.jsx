import React, { useState } from "react";
import { Button, Checkbox, Form, Input } from "antd";
import logo from "../images/logo.png";
import Password from "antd/es/input/Password";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    phone: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    try {
      const response = await axios.post(
        "https://skillbanaobe.onrender.com/user/login",
        userData
      );

      console.log(response);
      navigate("/home");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Form
      name="basic"
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 16 }}
      style={{
        maxWidth: 600,
        margin: "20vh auto",
        border: "1px solid lightgrey",
        padding: "20px",
      }}
      initialValues={{ remember: false }}
    >
      <img id="logo" src={logo} alt="" />
      <h2 className="text-center mb-3">Login</h2>
      <Form.Item
        label="Mobile Number"
        rules={[
          { required: true, message: "Please input your Mobile Number!" },
        ]}
        htmlFor="phone"
      >
        <Input
          type="phone"
          name="phone"
          id="phone"
          onChange={handleInputChange}
        />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input.Password
          type="password"
          name="password"
          id="password"
          onChange={handleInputChange}
        />
      </Form.Item>
      <p className="text-center">
        Don't Have an Account? <a href="/">Sign Up Here</a>
      </p>

      <Form.Item wrapperCol={{ offset: 10, span: 16 }}>
        <Button type="primary" htmlType="submit" onClick={handleSubmit}>
          Sign In
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Login;
