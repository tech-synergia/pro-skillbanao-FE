import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Button } from "antd";
import '../scss/RegistrationTable.scss'

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
    { title: "Name", dataIndex: "name", key: "name", className:"registration-table-column"  },
    { title: "Email", dataIndex: "email", key: "email", className:"registration-table-column hide-mobile" },
    { title: "Role", dataIndex: "role", key: "role", className:"registration-table-column"  },
    { title: "Phone", dataIndex: "phone", key: "phone", className:"registration-table-column"  },
    {
      title: "Actions",
      key: "actions",
      className:"registration-table-column",
      render: (text, record) => (
        <span>
          {record.isVerified ? (
            <Button className="btn3" onClick={() => handleReject(record)}>Delete</Button>
          ) : (
            <>
              <Button className="btn3" type="primary" onClick={() => handleAccept(record)}>
                Accept
              </Button>
              <Button className="btn3" onClick={() => handleReject(record)}>Reject</Button>
            </>
          )}
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
        const updatedData = professionalsData.map((prof) =>
          prof._id === record._id ? { ...prof, isVerified: true } : prof
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

  return <Table className="registration-table" dataSource={professionalsData} columns={columns} rowClassName={() => 'no-background'}/>
};

export default RegistrationTable;
