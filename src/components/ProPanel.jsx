import React, { useState, useEffect } from "react";
import { DesktopOutlined, PieChartOutlined } from "@ant-design/icons";
import { List, Layout, Menu, theme, Button } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import io from "socket.io-client";

const { Header, Content, Footer, Sider } = Layout;
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}
const items = [
  getItem("Interaction", "1", <DesktopOutlined />),
  getItem("History", "2", <PieChartOutlined />),
];
const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [userList, setUserList] = useState([]);
  const professionalId = localStorage.getItem("professionalId");
  const navigate = useNavigate();
  // const socket = io("http://localhost:5173");

  useEffect(() => {
    showRequestedUsers();
    // const interval = setInterval(() => {
    //   showRequestedUsers();
    // }, 5000);

    // return () => clearInterval(interval);
  }, []);

  const showRequestedUsers = async () => {
    try {
      const response = await axios.post(
        "https://skillbanaobe.onrender.com/chat/showUserList",
        {
          professionalId,
        }
      );
      setUserList(response.data.result);
    } catch (error) {
      alert(error.response.data);
    }
  };

  const startChat = async (userId) => {
    localStorage.setItem("userId", userId);
    navigate("/chat");
  };

  const declineChat = async (userId) => {
    try {
      const response = await axios.post(
        "https://skillbanaobe.onrender.com/chat/decline-chat",
        {
          professionalId,
          userId,
        }
      );
      // Handle success
      setUserList((prevUserList) =>
        prevUserList.filter((user) => user._id !== userId)
      );
      console.log("Chat declined:", response.data);
    } catch (error) {
      // Handle error
      alert(error.response.data);
    }
  };

  const handleAccept = async (userId) => {
    try {
      localStorage.setItem("userId", userId);
      const professionalId = localStorage.getItem("professionalId");

      // Call the /chat/acceptReq API
      await axios.post("https://skillbanaobe.onrender.com/chat/checkReq", {
        userId, // User's ID who sent the request
        professionalId,
      });

      // ... (rest of your logic)
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={items}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        />
        <Content
          style={{
            margin: "0 16px",
          }}
        >
          <List
            itemLayout="horizontal"
            dataSource={userList}
            renderItem={(user) => (
              <List.Item>
                <List.Item.Meta title={user.name} description={user.phone} />
                <Button type="primary" onClick={() => handleAccept(user._id)}>
                  Accept
                </Button>
                <Button danger onClick={() => declineChat(user._id)}>
                  Decline
                </Button>
              </List.Item>
            )}
          />
        </Content>
        <Footer
          style={{
            textAlign: "center",
          }}
        ></Footer>
      </Layout>
    </Layout>
  );
};
export default App;
