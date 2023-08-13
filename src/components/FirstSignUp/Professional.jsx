import React, { useState } from "react";
import { Form, Input, Select, Radio, Upload, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import logo from "../../images/logo.png";
import "./Form.scss";
import axios from "axios";

const { Option } = Select;

const App = () => {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [gender, setGender] = useState("");
  const [image, setImage] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://skillbanaobe.onrender.com/add-user",
        {
          name,
          role,
          gender,
          phoneNumber,
          image,
        }
      );

      console.log(response);
      alert("Success!");
      navigate("/success");
    } catch (error) {
      console.log(error);
    }
  };

  const handleimageUpload = (info) => {
    if (info.file.status === "done") {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPhoto(e.target.result);
      };
      reader.onerror = (error) => {
        console.error("Error reading the image:", error);
      };
      reader.readAsDataURL(info.file.originFileObj);
    }
  };

  const handleimageChange = (info) => {
    if (info.file.status === "done") {
      // Update the image state after successful upload
      setImage(info.file.response.url);
    }
  };

  const handleReload = () => {
    navigate(0); // Navigate to home page using navigate
  };

  return (
    <div className="form-container">
      <Form onSubmit={handleSubmit}>
        <img id="logo" src={logo} alt="" />
        <h2>Start As Professional</h2>
        <Form.Item label="Name">
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </Form.Item>
        <Form.Item label="Role">
          <Select value={role} onChange={(value) => setRole(value)} required>
            <Option value="">Select Role</Option>
            <Option value="CA">CA</Option>
            <Option value="CA">CS</Option>
            <Option value="CA">MBA</Option>
            <Option value="CA">Lawyer</Option>
            <Option value="CA">Makeup Artist</Option>
            <Option value="Lawyer">Hair Stylist</Option>
            <Option value="Lawyer">Astrologer</Option>
          </Select>
        </Form.Item>
        <Form.Item label="Gender">
          <Radio.Group
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <Radio value="male">Male</Radio>
            <Radio value="female">Female</Radio>
            <Radio value="other">Other</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="Upload Profile Pic">
          <Upload
            accept="image/*"
            customRequest={handleimageUpload}
            showUploadList={false}
            onChange={handleimageChange}
          >
            <Button icon={<UploadOutlined />}>Upload</Button>
          </Upload>

          {image && (
            <img className="uploaded-image" src={image} alt="Uploaded" />
          )}
        </Form.Item>
        <Form.Item label="Phone Number">
          <Input
            value={phoneNumber}
            pattern="[0-9]{10}"
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />
        </Form.Item>
        <div className="button-group">
          <Button type="primary" htmlType="submit" onClick={handleSubmit}>
            Send
          </Button>
          <Button onClick={handleReload}>Back</Button>
        </div>
      </Form>
    </div>
  );
};

export default App;
