import { useState, useEffect } from "react";
import axios from "axios";
import { Table } from "antd";
import { useSelector } from "react-redux";
// import "../scss/BlogsList.scss";
const baseUrl = import.meta.env.VITE_BASE_URL;

const PendingChats = () => {
  const [data, setData] = useState([]);

  const token = useSelector((state) => state.auth.token);
  const headers = { Authorization: `Bearer ${token}` };

  useEffect(() => {
    pendingChats();
    const interval = setInterval(() => {
      pendingChats();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const pendingChats = async () => {
    try {
      const response = await axios.get(`${baseUrl}/chat/pending`, { headers });
      const chats = response.data.chats;

      // Fetch user profiles for each chat
      const chatsWithUsernames = await Promise.all(
        chats.map(async (chat) => {
          const inQueueWithUsernames = await Promise.all(
            chat.inQueue.map(async (queueItem) => {
              const username = await fetchUserProfile(queueItem.userId);
              return { ...queueItem, username }; // Add username to queue item
            })
          );
          return { ...chat, inQueue: inQueueWithUsernames }; // Add usernames to chat
        })
      );

      setData(chatsWithUsernames);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchUserProfile = async (userId) => {
    try {
      const response = await axios.get(`${baseUrl}/user/getUser/${userId}`, {
        headers,
      });
      return response.data.user.name; // Assuming username is returned in the response
    } catch (error) {
      console.log("Error fetching user profile:", error);
      return null;
    }
  };

  const columns = [
    {
      title: "Professional",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "In Queue",
      dataIndex: "inQueue",
      key: "inQueue",
      render: (inQueue) => {
        return inQueue.map((queueItem, index) => (
          <div key={index} style={{ marginBottom: "15px" }}>
            <h6>{queueItem.username}</h6>
            <cite>Req Time:</cite>{" "}
            {new Date(queueItem.timestamp)
              .toLocaleString("en-US", { timeZone: "Asia/Kolkata" })
              .split(",")
              .join(" ")}
          </div>
        ));
      },
    },
  ];

  return (
    <Table
      dataSource={data}
      style={{ textTransform: "capitalize" }}
      columns={columns}
      rowKey={(record) => record._id} // Assuming _id is the unique identifier
    />
  );
};

export default PendingChats;
