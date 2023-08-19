import React, { useState, useEffect } from "react";
import { Button, Card, Avatar, Typography} from "antd";
import { StarFilled, CheckCircleFilled } from "@ant-design/icons";
import "./PersonDetails.scss";
import maleAvatar from '../../assets/male_avatar.jpg'
import femaleAvatar from '../../assets/female_avatar.jpg'
import { NavLink } from "react-router-dom";
import axios from "axios";

const { Text } = Typography;

const ProfileCard = () => {
  const [professionals, setProfessionals] = useState([]);

  const fetchProfessionals = async () => {
    try {
      const response = await axios.get(
        "https://skillbanaobe.onrender.com/professional/getAllPros"
      );
      const verifiedProfessionals = response.data.pros.filter(
        (professional) => professional.isVerified
      );
      setProfessionals(verifiedProfessionals);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProfessionals();
  }, []);

  const handleChat = async (id) => {
    const userId = localStorage.getItem("userId");
    try {
      const response = await axios.post(
        "https://skillbanaobe.onrender.com/chat/add-chat",
        {
          userId,
          professionalId: id,
        }
      );
      alert(response.data.message);
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <div className="details">
      {professionals.map((professional) => (
        <Card className="card" key={professional._id}>
          <div className="leftContent">
            <div className="imageContent">
                 <Avatar
                  src={
                    professional.gender === "male" ? maleAvatar : femaleAvatar
                  }
                  size={70}
                />
              <div className="stars">
                <StarFilled />
                <StarFilled />
                <StarFilled />
                <StarFilled />
                <StarFilled />
              </div>
              <p>1315 orders</p>
            </div>
            <div className="info">
              <NavLink to={"#"}>{professional.name}</NavLink>
              <Text>{professional.role}</Text>
              <Text>{professional.language}</Text>
              <Text>Exp: {professional.experience} yr(s)</Text>
              <Text className="free">
                FREE <Text delete>20/min</Text>
              </Text>
            </div>
          </div>
          <div
            className="chatBtn"
            onClick={(e) => handleChat(professional._id)}
          >
            <NavLink className="text-decoration-none">
              <Button>
                <CheckCircleFilled className="chat" /> Chat
              </Button>
            </NavLink>
          </div>
        </Card>
      ))}
    </div>
  );
};

function PersonDetails() {
  return <ProfileCard />;
}

export default PersonDetails;