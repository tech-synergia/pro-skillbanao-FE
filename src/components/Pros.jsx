import "../scss/Pros.scss";
import Profile from "../assets/profile.webp";
import axios from "axios";
import React, { useEffect, useState } from "react";
import male_avatar from '../assets/male_avatar.jpg'
import female_avatar from '../assets/female_avatar.jpg'

function Pros() {
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
    <section id="section-1">
      <div className="content-container">
        <div className="content">
          <h2 className="mt-5">Our Professionals</h2>
          <p>13000+ Professionals from India for Online Consultation</p>
          <div className="pros-grid">
            {professionals.map((professional) => (
              <div className="professional" key={professional._id}>
                 <img
                src={
                  professional.gender === "male" ? male_avatar : female_avatar
                }
                alt=""
              />
                <h3 className="text-center">{professional.name}</h3>
                <p>{professional.role}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Pros;
