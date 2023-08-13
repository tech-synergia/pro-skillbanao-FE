import React, { useState } from 'react';
import { Form, Input, Radio, Upload, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import logo from '../../images/logo.png';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import './Form.scss';

const User = () => {
  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const [image, setImage] = useState('');
  const [dob, setDob] = useState('');
  const [phone, setPhone] = useState('');

  const navigate = useNavigate(); // Initialize useNavigate

  const handleImageUpload = (info) => {
    if (info.file.status === 'done') {
      // Show a preview of the uploaded image
      const reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target.result);
      };
      reader.readAsDataURL(info.file.originFileObj);
    }
  };

  const handleSubmit = async (values) => {
    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('gender', gender);
      formData.append('image', info.file.originFileObj); // Append the image file
      formData.append('dob', dob);
      formData.append('phoneNumber', phoneNumber);

      const response = await fetch('YOUR_API_ENDPOINT', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        // Handle successful response
        console.log('Form submitted successfully');
        navigate('/');
      } else {
        // Handle error response
        console.error('Form submission error');
      }
    } catch (error) {
      // Handle fetch error
      console.error('Fetch error:', error);
    }
  };

  const handleReload = () => {
    navigate(0); // Navigate to home page using navigate
  };

  return (
    <div className="form-container">
      <Form onFinish={handleSubmit}>
        <img id="logo" src={logo} alt="" />
        <h2>Start Your Journey</h2>
        <Form.Item label="Name" rules={[{ required: true, message: 'Please enter your name' }]}>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
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
        <Form.Item label="Upload Profile Pic" >
          <Upload customRequest={handleImageUpload} showUploadList={false}>
            <Button icon={<UploadOutlined />}>Upload</Button>
          </Upload>
          {image && <img className="uploaded-image" src={image} alt="Uploaded" />}
        </Form.Item>
        <Form.Item label="Date of Birth" rules={[{ required: true, message: 'Please select your date of birth' }]}>
          <Input
            type='date'
            value={dob}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </Form.Item>
        <Form.Item label="Phone Number" name="phone" rules={[{ required: true, message: 'Please enter your phone number' }]}>
          <Input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} />
        </Form.Item>
        <div className="button-group">
          <Button type="primary" htmlType="submit" className="send-button">
            Send
          </Button>
          <Button type="button" className="go-back-button" onClick={handleReload}>
            Back
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default User;
