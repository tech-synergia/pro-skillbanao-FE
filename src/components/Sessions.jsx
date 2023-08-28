import React, { useEffect, useState } from "react";
import { List, Card } from "antd";
import axios from "axios";

const Sessions = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    async function fetchVideos() {
      try {
        const response = await axios.get("YOUR_VIDEO_ENDPOINT");
        setVideos(response.data.videos);
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    }
    fetchVideos();
  }, []);

  return (
    <div className="eBooks">
      <h2>Mini Coaching Sessions</h2>
      <List
        grid={{ gutter: 16, column: 3 }}
        dataSource={videos}
        renderItem={(video) => (
          <List.Item>
            <Card title={video.title}>
              <video width="100%" controls>
                <source src={video.url} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </Card>
          </List.Item>
        )}
      />
    </div>
  );
};

export default Sessions;
