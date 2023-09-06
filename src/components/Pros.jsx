import "../scss/Pros.scss";
// import Profile from "../assets/profile.webp";
import axios from "axios";
import { useEffect, useState } from "react";
import male_avatar from "../assets/male_avatar.jpg";
import female_avatar from "../assets/female_avatar.jpg";
import { useNavigate } from "react-router-dom";
const baseUrl = import.meta.env.VITE_BASE_URL;

function Pros({ webDetails }) {
  const [professionals, setProfessionals] = useState([]);
  const [displayCount, setDisplayCount] = useState(8); // Track the number of cards to display

  const navigate = useNavigate();

  const fetchProfessionals = async () => {
    try {
      const response = await axios.get(`${baseUrl}/professional/getAllPros`);
      // const verifiedProfessionals = response.data.pros.filter(
      //   (professional) => professional.isVerified
      // );
      setProfessionals(response.data.pros);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProfessionals();
  }, []);

  // console.log(webDetails);

  const handleViewMore = () => {
    navigate("/all-pro");
  };

  return (
    <section id="section-1">
      <div className="content-container">
        <div className="content">
          <h2 className="mt-5">Our Professionals</h2>
          <p>
            {webDetails.professionals}+ Professionals from India for Online
            Consultation
          </p>
          <div className="pros-grid">
            {professionals.slice(0, displayCount).map((professional) => (
              <div
                className="professional"
                key={professional._id}
                onClick={() => handleCardClick(professional._id)}
              >
                <img
                  src={
                    professional.image === ""
                      ? professional.gender === "male"
                        ? male_avatar
                        : female_avatar
                      : professional.image
                  }
                  alt=""
                />
                <h3 className="text-center">{professional.name}</h3>
                <p>{professional.role}</p>
              </div>
            ))}
          </div>
          {displayCount < professionals.length && (
            <button className="view-more-button" onClick={handleViewMore}>
              View More
            </button>
          )}
        </div>
      </div>
    </section>
  );
}

export default Pros;
