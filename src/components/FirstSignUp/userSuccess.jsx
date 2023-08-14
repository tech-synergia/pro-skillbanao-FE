import React from "react";
import { CheckCircleOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import "./Success.scss"; // Create this CSS file for styling

export default function userSuccess() {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/login");
  };
  return (
    <div className="success-container">
      <CheckCircleOutlined className="success-icon" />
      <p className="success-text">
        Welcome Aboard.You have successfully registered with us.
      </p>
      <Button
        className="navigate-button"
        type="primary"
        onClick={handleNavigate}
      >
        Login
      </Button>
    </div>
  );
}
