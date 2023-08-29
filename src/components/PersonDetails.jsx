import { useState, useEffect } from "react";
import { Button, Card, Avatar, Typography, Modal } from "antd";
import { StarFilled, CheckCircleFilled } from "@ant-design/icons";
import "../scss/PersonDetails.scss";
import maleAvatar from "../assets/male_avatar.jpg";
import femaleAvatar from "../assets/female_avatar.jpg";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updateKey } from "../store";
import axios from "axios";

const { Text } = Typography;
const baseUrl = import.meta.env.VITE_BASE_URL;

const ProfileCard = () => {
  const [professionals, setProfessionals] = useState([]);
  const [selectedProfessional, setSelectedProfessional] = useState(null);
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const userId = useSelector((state) => state.auth.userId);
  const professionalId = useSelector((state) => state.auth.professionalId);

  const headers = { Authorization: `Bearer ${token}` };

  useEffect(() => {
    fetchProfessionals();
  }, []);

  const fetchProfessionals = async () => {
    try {
      const response = await axios.get(`${baseUrl}/professional/getAllPros`);
      const verifiedProfessionals = response.data.pros.filter(
        (professional) => professional.isVerified
      );
      setProfessionals(verifiedProfessionals);
    } catch (error) {
      console.log(error);
    }
  };

  let pollInterval;
  const pollRequestStatus = (userId) => {
    pollInterval = setInterval(async () => {
      try {
        const response = await axios.get(`${baseUrl}/chat/accepted/${userId}`, {
          headers,
        });
        const { isAccepted } = response.data;
        if (isAccepted) {
          clearInterval(pollInterval); // Stop polling when request is accepted
          setTimeout(() => {
            navigate("/chat");
          }, 1500);
        }
      } catch (error) {
        console.error("Error checking request status:", error);
      }
    }, 5000); // Poll every 5 seconds (adjust as needed)
  };

  const handleShowAlert = () => {
    setVisible(true);
  };

  const handleCancel = async () => {
    try {
      const response = await axios.post(
        `${baseUrl}/chat/decline-chat`,
        {
          userId,
          professionalId,
        },
        { headers }
      );
      clearInterval(pollInterval);
      // console.log(response.data);
      setVisible(false); // Close the modal
    } catch (error) {
      console.error("Error canceling:", error);
    }
  };

  const handleChat = async (professionalId) => {
    dispatch(updateKey({ key: "professionalId", value: professionalId }));
    if (userId) pollRequestStatus(userId);

    try {
      const response = await axios.post(
        `${baseUrl}/chat/add-chat`,
        {
          userId,
          professionalId,
        },
        { headers }
      );
      handleShowAlert();
    } catch (error) {
      // console.log(error.response.data);
      if (error.response.data.msg === "Invalid Authentication!") {
        alert("Please Sign-in!");
      } else {
        console.log(error.response.data);
        handleShowAlert();
      }
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
                  professional.image === ""
                    ? professional.gender === "male"
                      ? maleAvatar
                      : femaleAvatar
                    : professional.image
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
          <div className="chatBtn">
            <NavLink className="text-decoration-none">
              <Button onClick={(e) => handleChat(professional._id)}>
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
      {/* <Button onClick={handleShowAlert}>Show Alert</Button> */}
      <Modal
        title="Your request has been sent..."
        open={visible}
        onCancel={null} // Prevent closing when clicking outside
        closable={false}
        footer={[
          <Button key="cancel" onClick={handleCancel}>
            Cancel
          </Button>,
        ]}
      >
        Please wait while your request is accepted!
      </Modal>
    </div>
  );
};

function PersonDetails() {
  return <ProfileCard />;
}

export default PersonDetails;
