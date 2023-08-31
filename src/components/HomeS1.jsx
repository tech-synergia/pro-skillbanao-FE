import React from "react";
import { Carousel } from "antd";
// import Chat from "../assets/chatcoin-chat-logo.png";
import prof from "../assets/proffesional.jpeg";
// import { useNavigate } from "react-router-dom";

function HomeS1() {
  // const navigate = useNavigate();

  // const handelClick = async (e) => {
  //   navigate("/all-pro");
  // };

  const onChange = (currentSlide) => {
    console.log(currentSlide);
  };

  return (
    <div id="section_1">
      <Carousel afterChange={onChange}>
        {/* Card 1 */}
        <div className="poster">
          <img src={prof} alt="" />
          <div>Professionals at your Service</div>
        </div>

        {/* Card 2 */}
        <div className="poster">
          <img src={prof} alt="" />
          <div>Professionals at your Service</div>
        </div>

        {/* Card 3 */}
        <div className="poster">
          <img src={prof} alt="" />
          <div>Professionals at your Service</div>
        </div>

        {/* Card 4 */}
        <div className="poster">
          <img src={prof} alt="" />
          <div>Professionals at your Service</div>
        </div>
      </Carousel>

      {/* <div className="boxes" onClick={handelClick}>
        Schedule your chat now <img src={Chat} alt="" />
      </div> */}
    </div>
  );
}

export default HomeS1;
