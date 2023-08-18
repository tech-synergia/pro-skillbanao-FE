import React from 'react';
import { Card } from 'antd';
import { StarFilled, CheckCircleFilled } from '@ant-design/icons';
import profile from '../../assets/profile.webp';
import './PersonDetails.scss';
import { NavLink } from 'react-router-dom';

const { Meta } = Card;

const ProfileCard = () => {
  return (
    <div className="details">
      {Array(20).fill(null).map((_, index) => (  // Use map instead of fill
        <Card className="card" key={index}>
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
              <a href="#">Deepikash</a>
              <span>Vedic, KP</span>
              <span>English, Hindi, Telugu</span>
              <span>Exp: 6 Years</span>
              <span className="free">FREE <strike>20/min</strike></span>
            </div>
          </div>
          <div className="chatBtn">
            <NavLink to="/chat">
              <button>
                <CheckCircleFilled className='chat'/> Chat
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

