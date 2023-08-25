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
            <a href="#">Contact us</a>
            Copyright @ skillbanao
          </div>
        </div>
        <div className="links">
          <h5>Our Social Media</h5>
          <div className="linkContents">
            <a href="#">Facebook</a>
            <a href="#">Instagram</a>
            <a href="#">Twitter</a>
          </div>
        </div>
      </div>
      <a
        style={{
          color: "lightblue",
          textDecoration: "none",
        }}
        href="https://techsynergia.com"
        target="_blank"
      >
        Powered by Tech Synergia
      </a>
    </footer>
  );
}

export default Footer;
