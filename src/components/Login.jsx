import React, { useState } from "react";
import { Button, Checkbox, Form, Input, Alert } from "antd";
import logo from "../images/logo.jpeg";
import Password from "antd/es/input/Password";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

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
      setSuccessMessage("Login successful! Redirecting...");
      setTimeout(() => {
        navigate("/");
      }, 1500);
    } catch (error) {
      setErrorMessage(error.response.data.msg);
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
      {successMessage && (
        <Alert
          message={successMessage}
          type="success"
          showIcon
          closable
          style={{ marginBottom: "16px" }}
          onClose={() => setSuccessMessage(null)}
        />
      )}
      {errorMessage && (
        <Alert
          message={errorMessage}
          type="error"
          showIcon
          closable
          style={{ marginBottom: "16px" }}
          onClose={() => setErrorMessage(null)}
        />
      )}
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
        Don't Have an Account? <a href="/signup">Register</a>
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
