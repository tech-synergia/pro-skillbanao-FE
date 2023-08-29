import { useState } from "react";
import { Button, Form, Radio, Input, Alert } from "antd";
import logo from "../assets/logo.jpeg";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setToken, userDetail } from "../store";
const baseUrl = import.meta.env.VITE_BASE_URL;

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const [userData, setUserData] = useState({
    phone: "",
    password: "",
    role: "user",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    try {
      const endpoint =
        userData.role === "professional"
          ? "/professional/login"
          : "/user/login";
      const response = await axios.post(`${baseUrl}${endpoint}`, userData);

      // console.log("response.data.user.token", response.data.user.token);

      dispatch(setToken(response.data.user.token));

      if (userData.role === "professional" && response.data.user.isVerified) {
        setSuccessMessage("Login successful! Redirecting...");

        dispatch(
          userDetail({
            professionalId: response.data.user.proId,
            username: response.data.user.name,
          })
        );

        setTimeout(() => {
          navigate("/propanel");
        }, 1500);
      } else if (
        userData.role === "professional" &&
        !response.data.user.isVerified
      ) {
        setErrorMessage(
          "You are not verified yet! Please wait until we accept your request!"
        );
      }
      if (userData.role === "user" && response.data.user.mainRole === "user") {
        setSuccessMessage("Login successful! Redirecting...");
        dispatch(
          userDetail({
            userId: response.data.user.userId,
            username: response.data.user.name,
          })
        );

        setTimeout(() => {
          navigate("/");
        }, 1500);
      } else if (
        userData.role === "user" &&
        response.data.user.mainRole === "admin"
      ) {
        setSuccessMessage("Login successful! Redirecting...");

        setTimeout(() => {
          navigate("/adminpanel");
        }, 1500);
      }
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
      <img
        id="logo"
        src={logo}
        alt=""
        style={{ display: "flex", justifyContent: "center" }}
      />
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

      <Form.Item
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Radio.Group
          name="role"
          onChange={handleInputChange}
          value={userData.role}
        >
          <Radio value="user">User</Radio>
          <Radio value="professional">Professional</Radio>
        </Radio.Group>
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
