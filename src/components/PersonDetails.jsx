import { useState, useEffect } from "react";
import { Button, Card, Avatar, Typography, Modal, Form, Input } from "antd";
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
  const [description, setDescription] = useState("");
  const [visible, setVisible] = useState(false);
  const [loginAlert, setLoginAlert] = useState(false);
  const [DescriptionModalOpen, setDescriptionModalOpen] = useState(false);
  const [coupon, setCoupon] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const userId = useSelector((state) => state.auth.userId);
  const professionalId = useSelector((state) => state.auth.professionalId);

  const headers = { Authorization: `Bearer ${token}` };

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    fetchProfessionals();
  }, []);

  const fetchProfessionals = async () => {
    try {
      const response = await axios.get(`${baseUrl}/professional/getAllPros`);
      setProfessionals(response.data.pros);
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
          location.href = "/chat";
          // setTimeout(() => {
          //   navigate("/chat");
          //   window.location.reload(true);

          // }, 1500);
        }
      } catch (error) {
        console.error("Error checking request status:", error);
      }
    }, 5000); // Poll every 5 seconds (adjust as needed)
  };

  const handleShowAlert = () => {
    setVisible(true);
  };

  const handleLoginAlert = () => {
    setLoginAlert(true);
  };

  const handleCancel = async () => {
    try {
      await axios.post(
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

  const handleChat = (professionalId) => {
    setDescriptionModalOpen(true);
    dispatch(updateKey({ key: "professionalId", value: professionalId }));
  };

  const isCouponValid = async () => {
    try {
      const response = await axios.get(`${baseUrl}/coupon/${coupon}`, {
        headers,
      });
      dispatch(
        updateKey({ key: "minutes", value: response.data.coupon.minutes })
      );
      return true;
    } catch (error) {
      return false;
    }
  };

  const handleSubmit = async () => {
    if (coupon) {
      const minutes = await isCouponValid();
      if (!minutes) {
        alert("Coupon is not valid!");
        return;
      }
    }
    setDescriptionModalOpen(false);
    if (userId) pollRequestStatus(userId);
    try {
      await axios.post(
        `${baseUrl}/chat/add-chat`,
        {
          userId,
          professionalId,
          description,
          coupon,
        },
        { headers }
      );
      handleShowAlert();
    } catch (error) {
      console.log(error.response);
      if (error.response.data.msg === "Invalid Authentication!") {
        handleLoginAlert();
      } else {
        console.log(error.response.data);
        handleShowAlert();
      }
    }
  };

  const randomOrders = () => Math.floor(Math.random() * 500);

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
              <p>{randomOrders()}</p>
            </div>
            <div className="info">
              <NavLink
                to={"#"}
                className={isMobile ? "ellipsis-name" : ""}
                style={{ textTransform: "capitalize" }}
              >
                {professional.name}
              </NavLink>
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
              <Button onClick={() => handleChat(professional._id)}>
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
          <Button
            key="cancel"
            onClick={handleCancel}
            style={{ backgroundColor: "#f0df20" }}
          >
            Cancel
          </Button>,
        ]}
      >
        Please wait while your request is accepted!
      </Modal>
      <Modal
        title="Login Required!"
        open={loginAlert}
        onCancel={() => setLoginAlert(false)} // Prevent closing when clicking outside
        closable={true}
        footer={[
          <Button
            key="Login"
            onClick={() => navigate("/login")}
            style={{ backgroundColor: "#f0df20" }}
          >
            Login
          </Button>,
        ]}
      >
        Please login to continue with the chat!
      </Modal>
      <Modal
        title="Please give a short description..."
        open={DescriptionModalOpen}
        onCancel={() => setDescriptionModalOpen(false)}
        closable={true}
        footer={[
          <Button
            key="sumbmit"
            onClick={handleSubmit}
            style={{ backgroundColor: "#f0df20" }}
          >
            Submit
          </Button>,
        ]}
      >
        <Form>
          <Form.Item label="Description">
            <Input.TextArea
              rows={4}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Item>
          <Form.Item label="Coupon code">
            <Input
              type="text"
              placeholder="if any?"
              onChange={(e) => setCoupon(e.target.value)}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

function PersonDetails() {
  return <ProfileCard />;
}

export default PersonDetails;
