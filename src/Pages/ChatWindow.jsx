import React, { useState } from 'react';
import { List, Input, Button } from 'antd';
import { SendOutlined } from '@ant-design/icons';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import male_avatar from '../assets/male_avatar.jpg'
import '../scss/ChatWindow.scss'

const ChatWindow = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    if (newMessage.trim() !== '') {
      setMessages([...messages, newMessage]);
      setNewMessage('');
    }
  };

  return (
   <>
     <Navbar/>
    <div className='chatPage'>
        <div className="chatHead">
            <div className="profileContent">
                <img src={male_avatar} alt="no image" />
                <div className="profileInfo">
                    <h6>Subrahmanyam</h6>
                    <span>Balance: (04:35 mins)</span>
                    <p>Chat in progress</p>
                </div>
            </div>
            <div className="endBtn">
                <Button className='btn'>END</Button>
            </div>
        </div>
      <List
        dataSource={messages}
        renderItem={(item) => <List.Item>{item}</List.Item>}
        style={{ maxHeight: '600px', overflowY: 'auto' }}
      />
      <div className='typeField'>
        <Input.Search
            enterButton={<SendOutlined style={{display: "flex", alignItems: "center", justifyContent: "center"}}/>}
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onSearch={handleSendMessage}
            placeholder="Type a message..."
        />
      </div>
    </div>
    <Footer/>
   </>
  );
};

export default ChatWindow;
