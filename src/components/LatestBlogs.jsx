import React, { useEffect, useState } from "react";
import { Card, Carousel, Button } from "antd";
import { LeftCircleOutlined, RightCircleOutlined } from "@ant-design/icons";
import axios from "axios";

const { Meta } = Card;
const baseUrl = import.meta.env.VITE_BASE_URL;

export default function LatestBlogs() {
  const [latestBlogs, setLatestBlogs] = useState([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    async function fetchLatestBlogs() {
      try {
        const response = await axios.get(`${baseUrl}/blog/showBlogs`);
        setLatestBlogs(response.data.blogs);
      } catch (error) {
        console.error("Error fetching latest blogs:", error);
      }
    }
    fetchLatestBlogs();

    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const prevArrow = (
    <Button>
      <LeftCircleOutlined />
    </Button>
  );
  const nextArrow = (
    <Button>
      <RightCircleOutlined />
    </Button>
  );

  return (
    <div id="latestBlog">
      <h3>LATEST FROM BLOG</h3>
      <div className="latestBlogsContainer">
        {isMobile ? (
          <Carousel dots={true}>
            {latestBlogs.map((blog) => (
              <div key={blog._id}>
                <Card
                  cover={
                    <img
                      alt="blog cover"
                      src={blog.image}
                      className="cardImage"
                    />
                  }
                  className="cardStyle"
                >
                  <Meta title={blog.title} description={blog.content} />
                </Card>
              </div>
            ))}
          </Carousel>
        ) : (
          <Carousel
            slidesToShow={3}
            prevArrow={prevArrow}
            nextArrow={nextArrow}
          >
            {latestBlogs.map((blog) => (
              <div key={blog._id}>
                <Card
                  cover={
                    <img
                      alt="blog cover"
                      src={blog.image}
                      className="cardImage"
                    />
                  }
                  className="cardStyle"
                >
                  <Meta title={blog.title} description={blog.content} />
                </Card>
              </div>
            ))}
          </Carousel>
        )}
      </div>
    </div>
  );
}
