import { useState, useEffect } from "react";
import { DesktopOutlined, PieChartOutlined } from "@ant-design/icons";
import { List, Layout, Menu, theme, Button } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updateKey } from "../store";
const baseUrl = import.meta.env.VITE_BASE_URL;

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
  const token = useSelector((state) => state.auth.token);
  const professionalId = useSelector((state) => state.auth.professionalId);
  const headers = { Authorization: `Bearer ${token}` };
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    showRequestedUsers();
    const interval = setInterval(() => {
      showRequestedUsers();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const showRequestedUsers = async () => {
    try {
      const response = await axios.post(
        `${baseUrl}/chat/showUserList`,
        {
          professionalId,
        },
        { headers }
      );
      setUserList(response.data.result);
    } catch (error) {
      alert(error.response.data.msg);
    }
  };

  const declineChat = async (userId) => {
    try {
      const response = await axios.post(
        `${baseUrl}/chat/decline-chat`,
        {
          professionalId,
          userId,
        },
        { headers }
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
    dispatch(updateKey({ key: "userId", value: userId }));
    try {
      // Call the /chat/acceptReq API
      await axios.post(
        `${baseUrl}/chat/checkReq`,
        {
          userId, // User's ID who sent the request
          professionalId,
        },
        { headers }
      );

      setTimeout(() => {
        navigate("/chat");
      }, 1500);
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
