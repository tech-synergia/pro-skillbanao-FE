import axios from "axios";
import { useState, useEffect } from "react";
import io from "socket.io-client";
import { Input, Form } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { clearCoupon } from "../store";

const baseUrl = import.meta.env.VITE_BASE_URL;
const socket = io.connect(baseUrl, { withCredentials: true });
import "../scss/Chat.scss";
import { useNavigate } from "react-router-dom";

const welcomeMessage = {
  // name: "Skillbanao",
  message:
    ": Hello, Welcome to the Skillbanao Chat! How may I assist you today?",
  sent: false, // Indicate that it's a received message
};

const Chat = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const minutes = useSelector((state) => state.auth.minutes);
  const [timer, setTimer] = useState(minutes ? minutes * 60 : null);
  const [messages, setMessages] = useState([welcomeMessage]);
  const [name, setName] = useState("");
  const token = useSelector((state) => state.auth.token);
  const userId = useSelector((state) => state.auth.userId);
  const professionalId = useSelector((state) => state.auth.professionalId);
  const username = useSelector((state) => state.auth.username);
  const mainRole = useSelector((state) => state.auth.mainRole);
  // const image = useSelector((state) => state.auth.image);
  const headers = { Authorization: `Bearer ${token}` };
  window.addEventListener("beforeunload", () => {
    socket.disconnect();
  });

  // useEffect(() => {
  //   // Fetch the timer value from the API
  //   const fetchTimer = async () => {
  //     try {
  //       const response = await axios.get(`${baseUrl}/get-timer`);
  //       setTimer(response.data.timer); // Adjust the API endpoint accordingly
  //     } catch (error) {
  //       console.error("Error fetching timer:", error);
  //     }
  //   };

  //   fetchTimer();
  // }, []);
  useEffect(() => {
    if (!mainRole === "user") return;
    if (timer === null) return; // Timer not fetched yet

    const intervalId = setInterval(() => {
      if (timer <= 0) {
        clearInterval(intervalId); // Clear the interval when timer is finished

        // Call the "decline-chat" API
        axios
          .post(
            `${baseUrl}/chat/decline-chat`,
            {
              userId,
              professionalId,
            },
            { headers }
          )
          .then(() => {
            dispatch(clearCoupon());
            navigate("/");
            console.log("Chat declined after timer finished.");
            // Handle any further actions after declining the chat
          })
          .catch((error) => {
            console.error("Error declining chat:", error);
            // Handle error
          });
      } else {
        setTimer((prevTimer) => prevTimer - 1);
      }
    }, 1000); // Update timer every second

    return () => {
      clearInterval(intervalId); // Clear the interval on component unmount
    };
  }, [timer, userId, professionalId, headers]);

  const [formRef] = Form.useForm();

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
    setName(username);

    console.log("checking how much time this console gets called");
    return () => {
      socket.disconnect();
    };
  }, []);

  socket.on(`${userId}-${professionalId}-chat`, (message) => {
    console.log("recieved message", message);
    setMessages((prevMessages) => [...prevMessages, message]);
  });

  const handleSendMessage = () => {
    const message = formRef.getFieldValue("message");
    if (message.trim() !== "") {
      socket.emit(`${userId}-${professionalId}-chat`, { name, message });

      formRef.setFieldValue("message", "");
    }
  };

  const seen = {};
  const uniqueArray = messages.filter((item) => {
    const key = JSON.stringify(item);
    return seen.hasOwnProperty(key) ? false : (seen[key] = true);
  });

  return (
    <div className="chatPage">
      <div className="chatHeaderContainer">
        <h2>Chat with your Professional</h2>
        {mainRole === "user" && (
          <div
            className="timer"
            style={{ fontSize: "12px", textAlign: "center" }}
          >
            Timer: {timer} seconds
          </div>
        )}
      </div>
      <div className="chatContainer">
        <div className="messageBox">
          {/* {console.log("JSX messgae", uniqueArray)} */}

          {uniqueArray.map((msg, index) => (
            <div className="msg" key={index}>
              <span className="dynamic-textbox">
                <strong>{msg.name}</strong>: {msg.message}
              </span>
            </div>
          ))}
        </div>
        <Form form={formRef}>
          <Form.Item name="message">
            <Input placeholder="Enter message" />
          </Form.Item>
          <button
            onClick={() => {
              handleSendMessage();
            }}
          >
            Send
          </button>
        </Form>
      </div>
    </div>
  );
};

export default Chat;
