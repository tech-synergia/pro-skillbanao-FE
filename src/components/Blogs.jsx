import React, { memo } from "react";
import { Button } from "antd";
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom

const Blogs = memo(() => {
  const navigate = useNavigate(); // Initialize useNavigate
  const hadelClick = () => {
    navigate("/");
  };
  return (
    <div style={{ textAlign: "justify", padding: "20px" }}>
      We are soon relising our blogs content to you. Thankyou for showing
      interest
      <Button
        style={{
          position: "absolute",
          top: "0",
          left: "0",
          bottom: "0",
          right: "0",
          margin: "auto",
          width: "200px",
        }}
        type="primary"
        onClick={hadelClick}
      >
        Take me to Home
      </Button>
    </div>
  );
});

export default Blogs;
