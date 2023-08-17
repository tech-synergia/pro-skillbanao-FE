import React from "react";
import { Layout, Menu } from "antd";
import { DashboardOutlined } from "@ant-design/icons";
import logo from "../images/logo.jpeg";
import '../scss/LeftPanel.scss'

const { Sider } = Layout;


const LeftPanel = () => {
  return (
    <Sider className="sidePanel" theme="light" width={300}>
      <div className="logo">
        <img src={logo} alt="" />
      </div>
      <Menu mode="inline" defaultSelectedKeys={["1"]}>
        <Menu.Item key="1" icon={<DashboardOutlined style={{fontSize: "18px"}}/>} style={{fontSize: "18px"}}>
          Dashboard
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default LeftPanel;
