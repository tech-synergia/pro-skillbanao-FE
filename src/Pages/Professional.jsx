import { useState } from "react";
import { Form, Input, Select, Radio, Upload, Button, Steps, Alert, Spin } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.jpeg";
import "../scss/Form.scss";
import axios from "axios";
const baseUrl = import.meta.env.VITE_BASE_URL;

const { Step } = Steps;
const { Option } = Select;

const App = () => {
  const [isImageUploaded, setIsImageUploaded] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [firstStepFieldsFilled, setFirstStepFieldsFilled] = useState(false);
  const [secondStepFieldsFilled, setSecondStepFieldsFilled] = useState(false);
  const [thirdStepFieldsFilled, setThirdStepFieldsFilled] = useState(false);

  const [alertData, setAlertData] = useState({
    type: "",
    message: "",
    show: false,
  });

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

  const allIndiaStates = [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Abroad",
    "Bihar",
    "Chattisgarh",
    "Delhi",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
  ];

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
      setUserData((prevData) => ({ ...prevData, [name]: value }));
      if (currentStep === 0) {
        setFirstStepFieldsFilled(areAllFirstStepFieldsFilled());
      } else if (currentStep === 1) {
        setSecondStepFieldsFilled(areAllSecondStepFieldsFilled());
      } else if (currentStep === 2) {
        setThirdStepFieldsFilled(areAllThirdStepFieldsFilled());
      }
  };

  const handleImageUpload = async (file) => {
    setIsImageUploaded(false);
    setUploading(true);
    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await axios.post(
        `${baseUrl}/professional/uploadImage`,
        formData
      );
      setUserData((prevData) => ({
        ...prevData,
        image: response.data.image.src,
      }));
      
      setIsImageUploaded(true);
    } catch (error) {
      console.error("Image upload error:", error);
    }finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    try {
      const response = await axios.post(
        `${baseUrl}/professional/register`,
        userData
      );
      setAlertData({
        type: "success",
        message: "Registration successful!",
        show: true,
      });
      navigate("/success");
    } catch (error) {
      setAlertData({
        type: "error",
        message: error.response.data.msg,
        show: true,
      });
    }
  };

  const areAllFirstStepFieldsFilled = () => {
    const { name, gender, dob } = userData;
    return name.trim() !== '' && gender !== '' && dob !== '';
  };
  
  const areAllSecondStepFieldsFilled = () => {
    const secondStepFields = ["role", "pSkills", "allSkills", "language", "experience", "hours", "reference", "working"];
    return secondStepFields.every((field) => userData[field].trim() !== '');
  };

  const areAllThirdStepFieldsFilled = () => {
    const {
      email,
      phone,
      password,
      hno,
      locality,
      state,
      pincode
    } = userData;
    return (
      email.trim() !== "" &&
      phone.trim() !== "" &&
      password.trim() !== "" &&
      hno.trim() !== "" &&
      locality.trim() !== "" &&
      state.trim() !== "" &&
      pincode.trim() !== ""
    );
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
              value={userData.name}
              onChange={handleInputChange}
              required
            />
          </Form.Item>
         
          
         
          <Form.Item label="Date of Birth" htmlFor="dob">
            <Input
              type="date"
              name="dob"
              id="dob"
              value={userData.dob}
              onChange={handleInputChange}
              required
            />
          </Form.Item>
          <Form.Item label="Gender" htmlFor="gender">
            <Radio.Group name="gender" id="gender" value={userData.gender} onChange={handleInputChange}>
              <Radio value="male">Male</Radio>
              <Radio value="female">Female</Radio>
              <Radio value="other">Other</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item label="Upload Profile Pic">
               <Upload beforeUpload={handleImageUpload} showUploadList={false}>
                {uploading ? (
                  <Spin spinning={uploading}>
                    <Button icon={<UploadOutlined />}>
                      {isImageUploaded ? "Image Uploaded" : "Uploading..."}
                    </Button>
                  </Spin>
                ) : (
                  <Button icon={<UploadOutlined />}>
                    {isImageUploaded ? "Image Uploaded" : "Upload"}
                  </Button>
                )}
              </Upload>

          </Form.Item>
            {isImageUploaded && (
              <p style={{ color: "green" }}>Image uploaded successfully</p>
            )}
      
          <Button type="primary" onClick={handleNext} disabled={!areAllFirstStepFieldsFilled()}>
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
              value={userData.role}
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
     

          <Form.Item label="Primary Skills" htmlFor="pSkills">
            <Select
              name="pSkills"
              id="pSkills"
              value={userData.pSkills}
              onChange={(value) =>
                handleInputChange({ target: { name: "pSkills", value } })
              }
              defaultValue="Select primary skills"
              required
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
              type="text"
              name="allSkills"
              id="allSkills"
              value={userData.allSkills}
              onChange={handleInputChange}
              required
            />
          </Form.Item>
          <Form.Item label="Language" htmlFor="language">
            <Input
              type="text"
              name="language"
              id="language"
              value={userData.language}
              onChange={handleInputChange}
              required
            />
          </Form.Item>
          <Form.Item label="Experience" htmlFor="experience">
            <Input
              type="text"
              name="experience"
              id="experience"
              value={userData.experience}
              onChange={handleInputChange}
              required
            />
          </Form.Item>
          <Form.Item
            label="How many hours you can contribute daily?"
            htmlFor="hours"
          >
            <Input
              type="text"
              name="hours"
              id="hours"
              value={userData.hours}
              onChange={handleInputChange}
              required
            />
          </Form.Item>
          <Form.Item
            label="Where did you hear about Skillbanao?"
            htmlFor="reference"
          >
            <Select
              name="reference"
              id="reference"
              value={userData.reference}
              onChange={(value) =>
                handleInputChange({ target: { name: "reference", value } })
              }
              placeholder="Select an Option"
            >
              <Option value="youtube">YouTube</Option>
              <Option value="facebook">Facebook</Option>
              <Option value="linked">LinkedIn</Option>
              <Option value="instagram">Instagram</Option>
              <Option value="twitter">Twitter</Option>
              <Option value="google">Search Engines(e.g., Google)</Option>
              <Option value="anotherWeb">Referral from Another Website</Option>
              <Option value="mouth">Word of Mouth</Option>
              <Option value="communities">Online Communities/Forums</Option>
              <Option value="otherPlatform">Other</Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="Are you working on any other online platform?"
            htmlFor="working"
          >
            <Select
              name="working"
              id="working"
              value={userData.working}
              onChange={(value) =>
                handleInputChange({ target: { name: "working", value } })
              }
              placeholder="Select an Option"
            >
              <Option value="YES">Yes</Option>
              <Option value="NO">No</Option>
            </Select>
          </Form.Item>
          <Button type="primary" onClick={handleNext} disabled={!areAllSecondStepFieldsFilled()}>
            Next
          </Button>
          <Button style={{ margin: "0 8px" }} onClick={handlePrev}>
            Previous
          </Button>
        </Form>
      ),
    },
    {
      title: "Contact Details",
      content: (
        <Form>
          <Form.Item label="Email" htmlFor="email">
            <Input
              type="email"
              name="email"
              id="email"
              value={userData.email}
              onChange={handleInputChange}
              required
            />
          </Form.Item>
          <Form.Item label="Phone Number" htmlFor="phone">
            <Input
              type="text"
              name="phone"
              id="phone"
              value={userData.phone}
              onChange={handleInputChange}
              required
              autocomplete="new-phone-number"
            />
          </Form.Item>
          <Form.Item label="Password" htmlFor="password">
            <Input
              type="password"
              name="password"
              id="password"
              value={userData.password}
              onChange={handleInputChange}
              required
              autocomplete="new-password"
            />
          </Form.Item>
          <Form.Item label="House No." htmlFor="hno">
            <Input
              type="text"
              name="hno"
              id="hno"
              value={userData.hno}
              onChange={handleInputChange}
              required
            />
          </Form.Item>
          <Form.Item label="Locality" htmlFor="locality">
            <Input
              type="text"
              name="locality"
              id="locality"
              value={userData.locality} 
              onChange={handleInputChange}
              required
            />
          </Form.Item>
          <Form.Item label="State" htmlFor="state">
            <Select
              showSearch
              name="state"
              id="state"
              value={userData.state}
              onChange={(value) =>
                handleInputChange({ target: { name: "state", value } })
              }
              required
              placeholder="Select Your State"
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {allIndiaStates.map((state) => (
                <Select.Option key={state} value={state}>
                  {state}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="Pin Code" htmlFor="pincode">
            <Input
              type="text"
              name="pincode"
              id="pincode"
              value={userData.pincode}
              onChange={handleInputChange}
              // maxLength={6}
              required
            />
          </Form.Item>
          <Button type="primary" onClick={handleSubmit} disabled={!thirdStepFieldsFilled}>
            Register
          </Button>
          <Button style={{ margin: "0 8px" }} onClick={handlePrev}>
            Previous
          </Button>
        </Form>
      )
    }
  ];

  return (
    <div className="form-container">
      <img id="logo" src={logo} alt="skillbanao_logo" />
      <h2>Register as Professional</h2>
      {alertData.show && (
        <Alert
          message={alertData.message}
          type={alertData.type}
          showIcon
          closable
          onClose={() => setAlertData({ ...alertData, show: false })}
          style={{ marginTop: "20px" }}
        />
      )}
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



