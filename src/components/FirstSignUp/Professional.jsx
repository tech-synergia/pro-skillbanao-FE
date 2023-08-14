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
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [dob, setDOB] = useState("");
  const [image, setImage] = useState('');
  const [houseNumber, setHouseNumber] = useState("");
  const [locality, setLocality] = useState("");
  const [state, setState] = useState("");
  const [pincode, setPincode] = useState("");
  const [primarySkills, setPrimarySkills] = useState([]);
  const [allSkills, setAllSkills] = useState([]);
  const [language, setLanguage] = useState("");
  const [experience, setExperience] = useState("");
  const [dailyContribution, setDailyContribution] = useState("");
  const [skillbanaoSource, setSkillbanaoSource] = useState("");

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
          email,
          password,
          dob,
          houseNumber,
          locality,
          state,
          pincode,
          primarySkills,
          allSkills,
          language,
          experience,
          dailyContribution,
          skillbanaoSource,
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

  const handleReload = () => {
    navigate(0); 
  };

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
        <Form.Item label="Phone Number">
          <Input
            value={phoneNumber}
            pattern="[0-9]{10}"
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />
        </Form.Item>
        <Form.Item label="Email">
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Item>
        <Form.Item label="Password">
          <Input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
            <Button className="custom-button" icon={<UploadOutlined style={{fontSize: "20px"}}/>}> Upload </Button>
          </Upload>
          {image && <img className="uploaded-image" src={image} alt="Uploaded" />}
        </Form.Item>
        <Form.Item label="Date of Birth">
          <Input
            type="date"
            value={dob}
            onChange={(e) => setDOB(e.target.value)}
            required
          />
        </Form.Item>
        <h6>Permanent Address Details*</h6>
        <Form.Item label="House No.">
          <Input
            value={houseNumber}
            onChange={(e) =>
              setHouseNumber({
                ...houseNumber,
                houseNumber: e.target.value,
              })
            }
            required
          />
          </Form.Item>
          <Form.Item label="Locality">
          <Input
            value={locality}
            onChange={(e) =>
              setLocality({
                ...locality,
                locality: e.target.value,
              })
            }
            required
          />
          </Form.Item>
          <Form.Item label="State">
          <Input
            value={state}
            onChange={(e) =>
            setState({
                ...state,
                state: e.target.value,
              })
            }
            required
          />
          </Form.Item>
          <Form.Item label="Pin Code">
          <Input
            value={pincode}
            onChange={(e) =>
              setPincode({
                ...pincode,
                pincode: e.target.value,
              })
            }
            required
          />
          </Form.Item>
          
         
        <Form.Item label="Primary Skills">
        <Input
            value={primarySkills}
            onChange={(e) =>
              setPrimarySkills({
                ...primarySkills,
                primarySkills: e.target.value,
              })
            }
            required
          />
        </Form.Item>
        <Form.Item label="All Skills">
        <Input
            value={allSkills}
            onChange={(e) =>
              setAllSkills({
                ...allSkills,
                allSkills: e.target.value,
              })
            }
            required
          />
        </Form.Item>
        <Form.Item label="Language">
        <Input
            value={language}
            onChange={(e) =>
              setLanguage({
                ...language,
                language: e.target.value,
              })
            }
            required
          />
        </Form.Item>
        <Form.Item label="Experience">
        <Input
            value={experience}
            onChange={(e) =>
              setExperience({
                ...experience,
                experience: e.target.value,
              })
            }
            required
          />
        </Form.Item>
        <Form.Item label="How many hours you can contribute daily?">
        <Input
            value={dailyContribution}
            onChange={(e) =>
              setDailyContribution({
                ...dailyContribution,
                dailyContribution: e.target.value,
              })
            }
            required
          />
        </Form.Item>
        <Form.Item label="Where did you hear about Skillbanao?">
        <Input
            value={skillbanaoSource}
            onChange={(e) =>
              setSkillbanaoSource({
                ...skillbanaoSource,
                skillbanaoSource: e.target.value,
              })
            }
            required
          />
        </Form.Item>
        <Form.Item label="Are you working on any other online platform BC?">
        <Input
            value={skillbanaoSource}
            onChange={(e) =>
              setSkillbanaoSource({
                ...skillbanaoSource,
                skillbanaoSource: e.target.value,
              })
            }
            required
          />
        </Form.Item>
        <div className="button-group">
          <Button type="primary" htmlType="submit" onClick={handleSubmit}>
            Send
          </Button>
          <Button onClick={handleReload}>Back</Button>
        </div>
        <p>Already have an account? <a href="/login">Sign In Here</a></p>
      </Form>
     
    </div>
  );
};

export default App;
