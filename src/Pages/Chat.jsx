import axios from "axios";
import { useState, useEffect } from "react";
import io from "socket.io-client";

const socket = io.connect("https://skillbanaobe.onrender.com"); // Replace with your server URL

function Chat() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    (async () => {
      const res = await axios.post(
        "https://skillbanaobe.onrender.com/chat/start-chat",
        {
          userId: localStorage.getItem("userId"),
          professionalId: localStorage.getItem("professionalId"),
        }
      );
      if (res.status === 200) {
        socket.on(
          `${localStorage.getItem("userId")}-${localStorage.getItem(
            "professionalId"
          )}-chat`,
          (message) => {
            setMessages((prevMessages) => [...prevMessages, message]);
          }
        );
      }
    })();
  }, []);

  const handleSendMessage = () => {
    if (message.trim() !== "") {
      socket.emit(
        `${localStorage.getItem("userId")}-${localStorage.getItem(
          "professionalId"
        )}-chat`,
        message
      );
      setMessage("");
    }
  };

  return (
    <div>
      <div>
        <h1>Chat Application</h1>
        <div>
          {messages.map((msg, index) => (
            <div key={index}>{msg}</div>
          ))}
        </div>
      </div>
      <div>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
}

export default Chat;
