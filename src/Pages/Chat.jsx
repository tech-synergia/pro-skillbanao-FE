import axios from "axios";
import { useState, useEffect } from "react";
import io from "socket.io-client";
import { Input, Form } from "antd";
import { useSelector } from "react-redux";
const baseUrl = import.meta.env.VITE_BASE_URL;
const socket = io.connect(baseUrl, { withCredentials: true });

// Replace with your server URL

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [name, setName] = useState("");
  const token = useSelector((state) => state.auth.token);
  const userId = useSelector((state) => state.auth.userId);
  const professionalId = useSelector((state) => state.auth.professionalId);
  const username = useSelector((state) => state.auth.username);
  // const image = useSelector((state) => state.auth.image);
  const headers = { Authorization: `Bearer ${token}` };
  window.addEventListener("beforeunload", () => {
    socket.disconnect();
  });

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
    <div>
      <div>
        <h1>Chat Application</h1>
        <div>
          {console.log("JSX messgae", uniqueArray)}

          {uniqueArray.map((msg, index) => (
            <div key={index}>
              <strong>{msg.name}</strong>: {msg.message}
            </div>
          ))}
        </div>
      </div>
      <div>
        <Form form={formRef}>
          <Form.Item name="message" label="Enter message">
            <Input />
          </Form.Item>
        </Form>
        <button
          onClick={() => {
            handleSendMessage();
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
