import { useState, useEffect } from "react";
import { Button, Card, Avatar, Typography } from "antd";
import { StarFilled, CheckCircleFilled } from "@ant-design/icons";
import "./PersonDetails.scss";
import maleAvatar from "../../assets/male_avatar.jpg";
import femaleAvatar from "../../assets/female_avatar.jpg";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import io from "socket.io-client";
const { Text } = Typography;
const baseUrl = import.meta.env.VITE_BASE_URL;

const ProfileCard = () => {
  const [professionals, setProfessionals] = useState([]);
  const [selectedProfessional, setSelectedProfessional] = useState(null);
  const navigate = useNavigate();
  const socket = io.connect(`${baseUrl}`);
  

  const fetchProfessionals = async () => {
    try {
      const response = await axios.get(
        `${baseUrl}/professional/getAllPros`
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
    // Listen for requestAccepted notification
    // socket.on("requestAccepted", (professionalId) => {
    //   const acceptedProfessional = professionals.find(
    //     (professional) => professional._id === professionalId
    //   );
    //   setSelectedProfessional(acceptedProfessional);
    //   console.log(professionalId);
    // });

    // return () => {
    //   socket.disconnect(); // Disconnect when the component unmounts
    // };
  }, []);

  const handleChat = async (id) => {
    // localStorage.setItem("professionalId", id);
    // navigate("/chat");

    const userId = localStorage.getItem("userId");
    try {
      const response = await axios.post(
        `${baseUrl}/chat/add-chat`,
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

  const handleAccept = async (id) => {
    localStorage.setItem("professionalId", id);
    navigate("/chat");
  };

  return (
    <div className="details">
      {professionals.map((professional) => (
        <Card className="card" key={professional._id}>
          <div className="leftContent">
            <div className="imageContent">
              <Avatar
                src={professional.gender === "male" ? maleAvatar : femaleAvatar}
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
              <Button onClick={() => handleAccept(professional._id)}>
                <CheckCircleFilled className="chat" /> Chat
              </Button>
            </NavLink>
          </div>
          {selectedProfessional?._id === professional._id && (
            <div className="notification">
              <p>Your request has been accepted.</p>
              <button onClick={() => setSelectedProfessional(null)}>OK</button>
            </div>
          )}
        </Card>
      ))}
    </div>
  );
};

function PersonDetails() {
  return <ProfileCard />;
}

export default PersonDetails;
