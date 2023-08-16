import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table } from "antd";

const RegistrationTable = () => {
  const [professionalsData, setProfessionalsData] = useState([]);

  useEffect(() => {
    const fetchProfessionals = async () => {
      try {
        const response = await axios.get(
          "https://skillbanaobe.onrender.com/professional/getAllPros"
        );
        setProfessionalsData(response.data);
        console.log(professionalsData);
      } catch (error) {
        console.error("Error fetching professionals:", error);
      }
    };
    fetchProfessionals();
  }, []);

  useEffect(() => {
    console.log(professionalsData);
  }, [professionalsData]); 

  const columns = [
   
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Email", dataIndex: "email", key: "email" },
  ];

  return (
    <Table dataSource={professionalsData} columns={columns} />
   
  );
};

export default RegistrationTable;
