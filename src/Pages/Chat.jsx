import axios from "axios";
import { useState, useEffect } from "react";
import io from "socket.io-client";
import { List, Input, Button, Form } from 'antd';
import { SendOutlined } from '@ant-design/icons';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import male_avatar from '../assets/male_avatar.jpg'
import { useSelector } from "react-redux";
import '../scss/Chat.scss'
const baseUrl = import.meta.env.VITE_BASE_URL;
const socket = io.connect(baseUrl);

// Replace with your server URL

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [name, setName] = useState("");
  const token = useSelector((state) => state.auth.token);
  const userId = useSelector((state) => state.auth.userId);
  const professionalId = useSelector((state) => state.auth.professionalId);
  const username = useSelector((state) => state.auth.username);
  const headers = { Authorization: `Bearer ${token}` };

  window.addEventListener("beforeunload", (e) => {
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
    // console.log("recieved message", message);
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
  //   <>
  //    <Navbar/>
  //     <div className='chatPage'>
  //       <div className="chatHead">
  //           <div className="profileContent">
  //               <img src={male_avatar} alt="no image" />
  //               <div className="profileInfo">
  //                   <h6>Subrahmanyam</h6>
  //                   <span>Balance: (04:35 mins)</span>
  //                   <p>Chat in progress</p>
  //               </div>
  //           </div>
  //           <div className="endBtn">
  //               <Button className='btn'>END</Button>
  //           </div>
  //       </div>
  //       <div className="rechargeInfo">
  //           <div className="tipInfo">
  //               <a href='#'>Balance &lt; 5min Quick Recharge?</a>
  //               <p><i class="bi bi-lightbulb-fill"></i> Tip: 90% users recharge for 10min or more</p>
  //           </div>
  //           <div className="planCost">
  //               <Button className='btn1'><i class="bi bi-currency-rupee"></i> 200</Button>
  //               <Button className='btn1'><i class="bi bi-currency-rupee"></i> 500</Button>
  //               <Button className='btn1'><i class="bi bi-currency-rupee"></i> 1000</Button>
  //           </div>
  //       </div>
  //         <div>
  //           {/* {console.log("JSX messgae", uniqueArray)} */}
  //           <List>
  //             {uniqueArray.map((msg, index) => (
  //               <div key={index} className="message">
  //                 <strong className="msg">{msg.name}</strong>: {msg.message}
  //               </div>
  //             ))}
  //           </List>
  //         </div>
  //       <div className='typeField'>
  //           <Form form={formRef}>
  //             <Form.Item name="message">
  //               <Input.Search
  //               enterButton={<SendOutlined onClick={() => {handleSendMessage()}} style={{display: "flex", alignItems: "center", justifyContent: "center"}}/>}
  //               placeholder="Type a message..."
  //               />
  //             </Form.Item>
  //           </Form>

  //       </div>
  //     </div>
  //   <Footer/>
  //  </>


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
