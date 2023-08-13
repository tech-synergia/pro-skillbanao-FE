import React, { useState } from "react";
import User from "./FirstSignUp/User";
import Professional from "./FirstSignUp/Professional";
import './FirstSignUp/Form.scss';
import logo from '../images/logo.png';

const FirstSignUp = () => {
  const [showform, setShowform] = useState(false);
  const [isuser, setIsuser] = useState(true);

  const handleUserClick = () => {
    setIsuser(true);
    setShowform(true);
  };

  const handleProfessionalClick = () => {
    setIsuser(false);
    setShowform(true);
  };

  return (
    <div className="first-sign-up">
      {showform ? (
        <>{isuser ? <User /> : <Professional /> }</>
      ) : (
        <div className="select-user-type">
        <img id="logo" src={logo} alt="" />
          <h3>You Are Here As</h3>
          <div className="btns">
            <button onClick={handleUserClick}>User</button>
            <button onClick={handleProfessionalClick}>Professional</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FirstSignUp;
