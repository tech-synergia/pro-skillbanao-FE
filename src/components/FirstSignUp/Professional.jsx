import React, { useState } from "react";
import { Form, Input, Select, Radio, Upload, Button, Steps } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import logo from "../../images/logo.jpeg";
import "./Form.scss";
import axios from "axios";

const { Step } = Steps;
const { Option } = Select;

const App = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [userData, setUserData] = useState({
    name: "",
    role: "",
    gender: "",
    phone: "",
    email: "",
    password: "",
    dob: "",
    image: "",
    hno: "",
    locality: "",
    state: "",
    pincode: "",
    pSkills: "",
    allSkills: "",
    language: "",
    experience: "",
    hours: "",
    working: "",
    reference: "",
  });

  const navigate = useNavigate();

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
        "https://skillbanaobe.onrender.com/professional/uploadImage",
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
        "https://skillbanaobe.onrender.com/professional/register",
        userData
      );

      console.log(response);
      navigate("/success");
    } catch (error) {
      console.log(error);
    }
  };

  const handlePrev = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleNext = () => {
    setCurrentStep(currentStep + 1);
  };

  const steps = [
    {
      title: "Personal Details",
      content: (
        <Form>
          <Form.Item label="Name" htmlFor="name">
            <Input
              type="text"
              name="name"
              id="name"
              onChange={handleInputChange}
              required
            />
          </Form.Item>
          <Form.Item label="Date of Birth" htmlFor="dob">
            <Input
              type="date"
              name="dob"
              id="dob"
              onChange={handleInputChange}
              required
            />
          </Form.Item>
          <Form.Item label="Gender" htmlFor="gender">
            <Radio.Group name="gender" id="gender" onChange={handleInputChange}>
              <Radio value="male">Male</Radio>
              <Radio value="female">Female</Radio>
              <Radio value="other">Other</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item label="Email" htmlFor="email">
            <Input
              type="email"
              name="email"
              id="email"
              onChange={handleInputChange}
              required
            />
          </Form.Item>
          <Form.Item label="Phone Number" htmlFor="phone">
            <Input
              type="text"
              name="phone"
              id="phone"
              onChange={handleInputChange}
              required
            />
          </Form.Item>
          <Form.Item label="Password" htmlFor="password">
            <Input
              type="password"
              name="password"
              id="password"
              onChange={handleInputChange}
              required
            />
          </Form.Item>
          <Button type="primary" onClick={handleNext}>
            Next
          </Button>
        </Form>
      ),
    },
    {
      title: "Professional Details",
      content: (
        <Form>
          <Form.Item label="Role" htmlFor="role">
            <Select
              name="role"
              id="role"
              onChange={(value) =>
                handleInputChange({ target: { name: "role", value } })
              }
              defaultValue="Select Role"
            >
              <Option value="">Select Role</Option>
              <Option value="CA">CA</Option>
              <Option value="CS">CS</Option>
              <Option value="MBA">MBA</Option>
              <Option value="Lawyer">Lawyer</Option>
              <Option value="Makeup Artist">Makeup Artist</Option>
              <Option value="Hair Stylist">Hair Stylist</Option>
              <Option value="Astrologer">Astrologer</Option>
            </Select>
          </Form.Item>
          <Form.Item label="Upload Profile Pic">
            <Upload onChange={handleImageUpload} showUploadList={false}>
              <Button
                className="custom-button"
                icon={<UploadOutlined style={{ fontSize: "20px" }} />}
              >
                Upload
              </Button>
            </Upload>
          </Form.Item>

          <h6>Permanent Address Details*</h6>
          <Form.Item label="House No." htmlFor="hno">
            <Input name="hno" id="hno" onChange={handleInputChange} required />
          </Form.Item>
          <Form.Item label="Locality" htmlFor="locality">
            <Input
              name="locality"
              id="locality"
              onChange={handleInputChange}
              required
            />
          </Form.Item>
          <Form.Item label="State" htmlFor="state">
            <Input
              name="state"
              id="state"
              onChange={handleInputChange}
              required
            />
          </Form.Item>
          <Form.Item label="Pin Code" htmlFor="pincode">
            <Input
              name="pincode"
              id="pincode"
              onChange={handleInputChange}
              required
            />
          </Form.Item>

          <Form.Item label="Primary Skills" htmlFor="pSkills">
            <Select
              name="pSkills"
              id="pSkills"
              onChange={(value) =>
                handleInputChange({ target: { name: "pSkills", value } })
              }
              defaultValue="Select primary skills"
            >
              <Option value="">Select primary skills</Option>
              <Option value="Financial Coach">Financial Coach</Option>
              <Option value="Love & Relationship Coach">
                Love & Relationship Coach
              </Option>
              <Option value="Mental Health & Stress Management Coach">
                Mental Health & Stress Management Coach
              </Option>
              <Option value="Fashion Coach">Fashion Coach</Option>
              <Option value=" Makeup & Hairstyle Coach">
                Makeup & Hairstyle Coach
              </Option>
              <Option value="Fitness & Nutrition Coach">
                Fitness & Nutrition Coach
              </Option>
              <Option value="Parenting Coach">Parenting Coach</Option>
              <Option value="Home Management Coach">
                Home Management Coach
              </Option>
              <Option value="Astrology Coach">Astrology Coach</Option>
            </Select>
          </Form.Item>
          <Form.Item label="All Skills" htmlFor="allSkills">
            <Input
              name="allSkills"
              id="allSkills"
              onChange={handleInputChange}
              required
            />
          </Form.Item>
          <Form.Item label="Language" htmlFor="language">
            <Input
              name="language"
              id="language"
              onChange={handleInputChange}
              required
            />
          </Form.Item>
          <Form.Item label="Experience" htmlFor="experience">
            <Input
              name="experience"
              id="experience"
              onChange={handleInputChange}
              required
            />
          </Form.Item>
          <Form.Item
            label="How many hours you can contribute daily?"
            htmlFor="hours"
          >
            <Input
              name="hours"
              id="hours"
              onChange={handleInputChange}
              required
            />
          </Form.Item>
          <Form.Item
            label="Where did you hear about Skillbanao?"
            htmlFor="reference"
          >
            <Input
              name="reference"
              id="reference"
              onChange={handleInputChange}
              required
            />
          </Form.Item>
          <Form.Item
            label="Are you working on any other online platform?"
            htmlFor="working"
          >
            <Input
              name="working"
              id="working"
              onChange={handleInputChange}
              required
            />
          </Form.Item>
          <Button type="primary" onClick={handleSubmit}>
            Register
          </Button>
          <Button style={{ margin: "0 8px" }} onClick={handlePrev}>
            Previous
          </Button>
        </Form>
      ),
    },
  ];

  return (
    <div className="form-container">
      <img id="logo" src={logo} alt="skillbanao_logo" />
      <h2>Register as Professional</h2>
      <Steps size="small" current={currentStep}>
        {steps.map((step) => (
          <Step key={step.title} title={step.title} />
        ))}
      </Steps>
      <div className="steps-content">{steps[currentStep].content}</div>
      <p>
        Already have an account? <a href="/login">Sign In Here</a>
      </p>
    </div>
  );
};

export default App;
