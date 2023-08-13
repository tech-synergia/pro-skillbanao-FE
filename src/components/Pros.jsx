import "../scss/Pros.scss";
import Profile from "../assets/profile.webp";

function Pros() {
  return (
    <section id="section-1">
      <div className="content-container">
        <div className="content">
          <h2>Our Professionals</h2>
          <p>13000+ Professionals from India for Online Consultation</p>
          <div className="pros-grid">
            <div className="professional">
              <img src={Profile} alt="image" />
              <h3>Anurag</h3>
              <p>Lawyer</p>
            </div>
            <div className="professional">
              <img src={Profile} alt="image" />
              <h3>Sarita</h3>
              <p>CA</p>
            </div>
            <div className="professional">
              <img src={Profile} alt="image" />
              <h3>Vivek</h3>
              <p>Accountant</p>
            </div>
            <div className="professional">
              <img src={Profile} alt="image" />
              <h3>Nihaal</h3>
              <p>Lawyer</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Pros;
