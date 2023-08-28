import React from "react";
import { Layout, Button } from "antd";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import RegistrationTable from "../components/RegistrationTable";

const { Content } = Layout;

function AdminPanel() {
  return (
    <Layout>
      <Content style={{ padding: "20px" }}>
        <div>
          <Button type="primary">
            <Link to="/blogs">Add Blogs</Link>
          </Button>
        </div>
        <RegistrationTable />
      </Content>
    </Layout>
  );
}

export default AdminPanel;
