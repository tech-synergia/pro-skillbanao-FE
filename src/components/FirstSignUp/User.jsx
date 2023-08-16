import React, { useState } from "react";
import { Form, Input, Radio, Upload, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import logo from "../../images/logo.jpeg";
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom
import "./Form.scss";
import axios from "axios";

const User = () => {
  const [userData, setUserData] = useState({
    name: "",
    gender: "",
    image: "",
    dob: "",
    phone: "",
    password: "",
  });

  const navigate = useNavigate(); // Initialize useNavigate

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleImageUpload = async (e) => {
    const imageFile = e.target.files[0];

    const formData = new FormData();
    formData.append("image", imageFile);

    try {
      const response = await axios.post(
        "https://skillbanaobe.onrender.com/user/uploadImage",
        formData
      );
      setUserData((prevData) => ({
        ...prevData,
        image: response.data.image.src,
      }));
    } catch (error) {
      console.error("Image upload error:", error);
    }
  };

  const handleSubmit = async (e) => {
    try {
      const response = await axios.post(
        "https://skillbanaobe.onrender.com/user/register",
        userData
      );
      navigate("/userSuccess");
    } catch (error) {
      alert(error.response.data.msg);
    }
  };

  const handleReload = () => {
    navigate(0); // Navigate to home page using navigate
  };

  return (
    <div className="form-container">
      <img id="logo" src={logo} alt="" />
      <Form>
        <h2>Register</h2>
        <Form.Item
          label="Name"
          rules={[{ required: true, message: "Please enter your name" }]}
        >
          <Input name="name" id="name" onChange={handleInputChange} required />
        </Form.Item>
        <Form.Item label="Gender">
          <Radio.Group name="gender" id="gender" onChange={handleInputChange}>
            <Radio value="male">Male</Radio>
            <Radio value="female">Female</Radio>
            <Radio value="other">Other</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          label="Date of Birth"
          rules={[
            { required: true, message: "Please select your date of birth" },
          ]}
        >
          <Input
            type="date"
            name="dob"
            id="dob"
            onChange={handleInputChange}
            required
          />
        </Form.Item>
        <Form.Item
          label="Phone Number"
          name="phone"
          rules={[
            { required: true, message: "Please enter your phone number" },
          ]}
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
          rules={[{ required: true, message: "Please enter your password" }]}
        >
          <Input
            type="password"
            name="password"
            id="password"
            onChange={handleInputChange}
          />
        </Form.Item>
        <div className="button-group">
          <Button
            type="primary"
            htmlType="submit"
            className="send-button"
            onClick={handleSubmit}
          >
            Register
          </Button>
          <Button
            type="button"
            className="go-back-button"
            onClick={handleReload}
          >
            Back
          </Button>
        </div>
        <p>
          Already have an account? <a href="/login">Login</a>
        </p>
      </Form>
    </div>
  );
};

export default User;
