import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import { List, Input, Button, Form } from "antd";
import { SendOutlined } from "@ant-design/icons";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { message } from "antd";

import male_avatar from "../assets/male_avatar.jpg";

import { useSelector } from "react-redux";
import "../scss/Chat.scss";
// import { useNavigate } from "react-router-dom";
const baseUrl = import.meta.env.VITE_BASE_URL;
const socket = io(baseUrl, { withCredentials: true });

// Replace with your server URL

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [name, setName] = useState("");
  const token = useSelector((state) => state.auth.token);
  const userId = useSelector((state) => state.auth.userId);
  const professionalId = useSelector((state) => state.auth.professionalId);
  const username = useSelector((state) => state.auth.username);
  const headers = { Authorization: `Bearer ${token}` };

  const [exitClicked, setExitClicked] = useState(false);
  const [timerInterval, setTimerInterval] = useState(null);
  const [timer, setTimer] = useState(5 * 60);
  const [chatStarted, setChatStarted] = useState(false);
  const [chatEnded, setChatEnded] = useState(false);
  const [chatEndedLocally, setChatEndedLocally] = useState(false);
  const [chatEndedMessageDisplayed, setChatEndedMessageDisplayed] =
    useState(false);

  // const navigate = useNavigate();

  const chatContainerRef = useRef(null);

  window.addEventListener("beforeunload", (e) => {
    socket.disconnect();
  });

  const [formRef] = Form.useForm();

  useEffect(() => {
    if (chatStarted && timer > 0 && !chatEnded) {
      const intervalId = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000); // Decrease timer every second
      setTimerInterval(intervalId);
      return () => {
        clearInterval(intervalId);
        if (chatEndedLocally && !chatEndedMessageDisplayed) {
          message.info("Chat has ended.");
          setChatEndedMessageDisplayed(true);
        }
      };
    } else if (timer === 0 && !chatEnded && timerInterval) {
      // Call the decline API here
      axios.post(
        `${baseUrl}/chat/decline-chat`,
        {
          userId,
          professionalId,
        },
        { headers }
      );
      clearInterval(timerInterval);
      setChatEnded(true); // Chat has ended
    }
  }, [
    chatStarted,
    chatEnded,
    timer,
    chatEndedLocally,
    chatEndedMessageDisplayed,
  ]);

  useEffect(() => {
    (async () => {
      await axios.post(
        `${baseUrl}/chat/start-chat`,
        {
          userId,
          professionalId,
        },
        { headers }
      );
    })();
    setChatStarted(true); // Chat has started
    setName(username);

    console.log("checking how much time this console gets called");
    return () => {
      socket.disconnect();
    };
  }, []);

  socket.on(`${userId}-${professionalId}-chat`, (message) => {
    console.log("received message", message);
    const updatedMessage = { ...message, sent: false };
    setMessages((prevMessages) => [...prevMessages, updatedMessage]);

    if (chatContainerRef.current) {
      const newMessageHeight = chatContainerRef.current.lastChild.clientHeight;
      chatContainerRef.current.scrollTop += newMessageHeight;
    }
  });

  const handleSendMessage = () => {
    const message = formRef.getFieldValue("message");

    if (chatEndedLocally) {
      // Display an alert message
      message.warning("Chat has ended. You can't send messages.");
      return;
    }

    if (message.trim() !== "") {
      socket.emit(`${userId}-${professionalId}-chat`, {
        name,
        message,
        sent: true,
      });

      formRef.setFieldValue("message", "");
    }
  };

  const seen = {};
  const uniqueArray = messages.filter((item) => {
    const key = JSON.stringify(item);
    return seen.hasOwnProperty(key) ? false : (seen[key] = true);
  });

  const handleEndButtonClicked = () => {
    if (!exitClicked) {
      setChatEndedLocally(true); // Mark the chat as ended locally
      setExitClicked(true);
      setChatEnded(true);

      clearInterval(timerInterval);

      // Display the chat ended alert message
      if (!chatEndedMessageDisplayed) {
        message.info("Chat has ended.");
        setChatEndedMessageDisplayed(true);
      }
    }
  };

  // const handleExitButtonClicked = () => {
  //   if (professionalId) {
  //     navigate('/propanel');
  //   } else if (userId) {
  //     navigate('/all-pro');
  //   } else {
  //     navigate('/');
  //   }
  // };

  return (
    <>
      <Navbar />
      <div className="chatPage">
        <div className="chatHead">
          <div className="profileContent">
            <img src={male_avatar} alt="no image" />
            <div className="profileInfo">
              <h6>Subrahmanyam</h6>
              {/* <span>Balance: (04:35 mins)</span> */}
              <span>
                Balance: (
                {Math.floor(timer / 60)
                  .toString()
                  .padStart(2, "0")}
                :{(timer % 60).toString().padStart(2, "0")} mins)
              </span>

              <p>{chatEnded ? "Chat has ended" : "Chat in progress"}</p>
            </div>
          </div>
          <div className="endBtn">
            {exitClicked ? (
              <Button className="btn">EXIT</Button>
            ) : (
              <Button className="btn" onClick={handleEndButtonClicked}>
                END
              </Button>
            )}
            {/* <Button className='btn' onClick={() => handleEndButtonClicked()}>END</Button> */}
          </div>
        </div>
        <div className="rechargeInfo">
          <div className="tipInfo">
            <a href="#">Balance &lt; 5min Quick Recharge?</a>
            <p>
              <i className="bi bi-lightbulb-fill"></i> Tip: 90% users recharge
              for 10min or more
            </p>
          </div>
          <div className="planCost">
            <Button className="btn1">
              <i className="bi bi-currency-rupee"></i> 200
            </Button>
            <Button className="btn1">
              <i className="bi bi-currency-rupee"></i> 500
            </Button>
            <Button className="btn1">
              <i className="bi bi-currency-rupee"></i> 1000
            </Button>
          </div>
        </div>
        <div ref={chatContainerRef} className="message-container">
          {/* {console.log("JSX messgae", uniqueArray)} */}
          <List>
            {uniqueArray.map((msg, index) => (
              <div
                key={msg.id || index}
                className={`message ${msg.sent ? "sent" : "received"}`}
              >
                {/* <div key={index} className={`message ${msg.sent ? 'sent' : 'received'}`} > */}
                <strong>{msg.name}</strong>: {msg.message}
              </div>
            ))}
          </List>
        </div>
        <div className="typeField">
          <Form form={formRef}>
            <Form.Item name="message">
              <Input.Search
                enterButton={
                  <SendOutlined
                    onClick={() => {
                      handleSendMessage();
                    }}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  />
                }
                placeholder={chatEnded ? "Chat has ended" : "Type a message..."}
                disabled={chatEnded}
              />
            </Form.Item>
          </Form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Chat;
