import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Button } from "antd";

const RegistrationTable = () => {
  const [professionalsData, setProfessionalsData] = useState([]);

  useEffect(() => {
    fetchProfessionals();
  }, []);

  const fetchProfessionals = async () => {
    try {
      const response = await axios.get(
        "https://skillbanaobe.onrender.com/professional/getAllPros"
      );
      setProfessionalsData(response.data.pros); // Use response.data.pros directly
    } catch (error) {
      console.error("Error fetching professionals:", error);
    }
  };

  const columns = [
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Role", dataIndex: "role", key: "role" },
    { title: "Phone", dataIndex: "phone", key: "phone" },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <span>
          <Button type="primary" onClick={() => handleAccept(record)}>
            Accept
          </Button>
          <Button onClick={() => handleReject(record)}>Reject</Button>
        </span>
      ),
    },
  ];

  const handleAccept = (record) => {
    // Implement the logic for accepting the professional
    console.log("Accepted:", record);
  };

  const handleReject = async (record) => {
    try {
      const response = await axios.delete(
        "https://skillbanaobe.onrender.com/professional/declinePro",
        {
          data: { id: record._id },
        }
      );
      if (response.status === 200) {
        console.log("Professional rejected and data deleted:", record);
        const updatedData = professionalsData.filter(
          (prof) => prof._id !== record._id
        );
        setProfessionalsData(updatedData);
      }
    } catch (error) {
      console.error("Error rejecting professional:", error);
    }
  };

  return <Table dataSource={professionalsData} columns={columns} />;
};

export default RegistrationTable;
