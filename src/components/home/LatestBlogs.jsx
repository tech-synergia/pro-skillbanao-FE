import React, { useEffect, useState } from "react";
import { Card } from "antd";
import axios from "axios";

const { Meta } = Card;

export default function LatestBlogs() {
  const [latestBlogs, setLatestBlogs] = useState([]);

  useEffect(() => {
    async function fetchLatestBlogs() {
      try {
        const response = await axios.get(
          "https://skillbanaobe.onrender.com/blog/showBlogs"
        );
        setLatestBlogs(response.data.blogs);
      } catch (error) {
        console.error("Error fetching latest blogs:", error);
      }
    }
    fetchLatestBlogs();
  }, []);

  return (
    <div>
      <h2>LATEST FROM BLOG</h2>
      <div className="latest-blogs-container">
        {latestBlogs.map((blog) => (
          <Card
            key={blog._id}
            cover={<img alt="blog cover" src={blog.image} />}
          >
            <Meta title={blog.title} description={blog.content} />
          </Card>
        ))}
      </div>
    </div>
  );
}
