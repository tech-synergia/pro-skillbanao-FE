import { useState, useEffect } from "react";
import axios from "axios";
import { Table, Button } from "antd";
import { useSelector } from "react-redux";
import "../scss/BlogsList.scss";
const baseUrl = import.meta.env.VITE_BASE_URL;

const BlogsList = () => {
  const [blogsData, setBlogsData] = useState([]);

  const token = useSelector((state) => state.auth.token);
  const headers = { Authorization: `Bearer ${token}` };
  // console.log("🚀 ~ file: RegistrationTable.jsx:12 ~ RegistrationTable ~ token:", token)

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await axios.get(`${baseUrl}/blog/showBlogs`);
      setBlogsData(response.data.blogs); // Use response.data.pros directly
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      className: "registration-table-title",
    },
    {
      title: "Content",
      dataIndex: "content",
      key: "content",
      className: "registration-table-content",
    },

    {
      title: "Actions",
      key: "actions",
      className: "registration-table-actions",
      render: (text, record) => (
        <span>
          <Button className="btn3" danger onClick={() => handleDelete(record)}>
            Delete
          </Button>
        </span>
      ),
    },
  ];

  const handleDelete = async (record) => {
    try {
      const response = await axios.delete(`${baseUrl}/blog/deleteBlog`, {
        data: { blogId: record._id },
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.status === 200) {
        // console.log("Blogs removed:", record);
        const updatedData = blogsData.filter((blog) => blog._id !== record._id);
        setBlogsData(updatedData);
      }
    } catch (error) {
      console.error("Error removing blog:", error);
    }
  };

  return (
    <Table
      className="blogslist-table"
      style={{ width: "100%" }}
      dataSource={blogsData}
      columns={columns}
      rowClassName={() => "no-background"}
    />
  );
};

export default BlogsList;
