import React from "react";
import { Layout, Menu } from "antd";
import { DashboardOutlined } from "@ant-design/icons";
import logo from "../images/logo.jpeg";

const { Sider } = Layout;

const LeftPanel = () => {
  return (
    <Sider width={200} theme="light">
      <div className="logo">
        <img src={logo} alt="" width={200} height={100} />
      </div>
      <Menu mode="inline" defaultSelectedKeys={["1"]}>
        <Menu.Item key="1" icon={<DashboardOutlined />}>
          Dashboard
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default LeftPanel;
