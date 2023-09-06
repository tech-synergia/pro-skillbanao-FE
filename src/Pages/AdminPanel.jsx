import { Layout, Button } from "antd";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import RegistrationTable from "../components/RegistrationTable";

const { Content } = Layout;

function AdminPanel() {
  return (
    <Layout>
      <Content style={{ padding: "20px" }}>
        <div>
          <Button
            type="primary"
            style={{ marginLeft: "5px", marginBottom: "5px" }}
          >
            <Link to="/blogs" style={{ textDecoration: "none" }}>
              Add Blogs
            </Link>
          </Button>
          <Button
            type="primary"
            danger
            style={{ marginLeft: "5px", marginBottom: "5px" }}
          >
            <Link to="/blogslist" style={{ textDecoration: "none" }}>
              Delete Blogs
            </Link>
          </Button>
          <Button type="primary" style={{ marginLeft: "5px" }}>
            <Link to="/coupon" style={{ textDecoration: "none" }}>
              Add Coupon
            </Link>
          </Button>
          <Button type="primary" danger style={{ marginLeft: "5px" }}>
            <Link to="/couponslist" style={{ textDecoration: "none" }}>
              Delete Coupon
            </Link>
          </Button>
          <Button type="primary" style={{ marginLeft: "5px" }}>
            <Link to="/changelist" style={{ textDecoration: "none" }}>
              Change Details
            </Link>
          </Button>
        </div>
        <RegistrationTable />
      </Content>
    </Layout>
  );
}

export default AdminPanel;
