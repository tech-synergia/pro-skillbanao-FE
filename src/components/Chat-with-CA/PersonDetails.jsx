import React, { useState, useEffect } from "react";
import { Card } from "antd";
import { StarFilled, CheckCircleFilled } from "@ant-design/icons";
import profile from "../../assets/profile.webp";
import "./PersonDetails.scss";
import { NavLink } from "react-router-dom";
import axios from "axios";

const ProfileCard = () => {
  const [professionals, setProfessionals] = useState([]);

  const fetchProfessionals = async () => {
    try {
      const response = await axios.get(
        "https://skillbanaobe.onrender.com/professional/getAllPros"
      );
      const verifiedProfessionals = response.data.pros.filter(
        (professional) => professional.isVerified
      );
      setProfessionals(verifiedProfessionals);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProfessionals();
  }, []);

  return (
    <div className="details">
      {professionals.map((professional) => (
        <Card className="card" key={professional._id}>
          <div className="leftContent">
            <div className="imageContent">
              <img src={profile} alt="" />
              <div className="stars">
                <StarFilled />
                <StarFilled />
                <StarFilled />
                <StarFilled />
                <StarFilled />
              </div>
              <p>1315 orders</p>
            </div>
            <div className="info">
              <a href="#">{professional.name}</a>
              <span>{professional.role}</span>
              <span>{professional.language}</span>
              <span>Exp: {professional.experience} yr(s)</span>
              <span className="free">
                FREE <strike>20/min</strike>
              </span>
            </div>
          </div>
          <div className="chatBtn">
            <NavLink to="/chat">
              <button>
                <CheckCircleFilled className="chat" /> Chat
              </button>
            </NavLink>
          </div>
        </Card>
      ))}
    </div>
  );
};

function PersonDetails() {
  return <ProfileCard />;
}

export default PersonDetails;
