import React from "react";
import "../scss/Footer.scss";
import Title from "antd/es/typography/Title";

function Footer() {
  return (
    <footer>
      <div className="headContent">
        <h5>SkillBanao</h5>
      </div>
      <div className="impLinks">
        <div className="links">
          <h5>Important Links</h5>
          <div className="linkContents">
            <a href="#about">About Us</a>
            {/* <a href="/career">Careers</a> */}
            <a href="#">Contact us</a>
            <a href="mailto:">support@skillbanao.com</a>
            Copyright @ skillbanao
          </div>
        </div>
        <div className="links">
          <h5>Corporate Links</h5>
          <div className="linkContents">
            <a href="/refund_cancellation">Refund & Cancellation Policy</a>
            <a href="/terms_conditions">Terms & Conditions</a>
            <a href="/privacy_policy">Privacy Policy</a>
          </div>
        </div>
        <div className="links">
          <h5>Our Social Media</h5>
          <div className="iconContents">
            <a href="#">
              <i className="bi bi-facebook"></i>
            </a>
            <a href="https://www.instagram.com/skill.banao/">
              <i className="bi bi-instagram"></i>
            </a>
            <a href="https://www.youtube.com/@Skillbanao_">
              <i className="bi bi-youtube"></i>
            </a>
            <a href="https://twitter.com/skillbanao_">
              <i className="bi bi-twitter"></i>
            </a>
          </div>
        </div>
      </div>
      <a
        style={{
          color: "lightblue",
          textDecoration: "none",
        }}
        href="https://techsynergia.com"
        target="_blank" rel="noreferrer"
      >
        Powered by Tech Synergia
      </a>
    </footer>
  );
}

export default Footer;
