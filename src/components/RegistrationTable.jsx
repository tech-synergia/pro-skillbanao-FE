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
      const unverifiedProfessionals = response.data.pros.filter(
        (professional) => !professional.isVerified
      );
      setProfessionalsData(unverifiedProfessionals); // Use response.data.pros directly
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

  const handleAccept = async (record) => {
    try {
      const response = await axios.patch(
        "https://skillbanaobe.onrender.com/professional/verifyPro",
        {
          proId: record._id,
        }
      );
      if (response.status === 200) {
        console.log("Professional verified successfully:", record);
        const updatedData = professionalsData.filter(
          (prof) => prof._id !== record._id
        );
        setProfessionalsData(updatedData);
      }
    } catch (error) {
      console.error("Error verifying professional:", error);
    }
  };

  const handleReject = async (record) => {
    try {
      const response = await axios.delete(
        "https://skillbanaobe.onrender.com/professional/declinePro",
        {
          data: { proId: record._id },
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
