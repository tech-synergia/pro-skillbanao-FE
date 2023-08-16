import Prof from "../../assets/proffesional.jpeg";
import Chat from "../../assets/chatcoin-chat-logo.png";
import { useNavigate } from "react-router-dom";
function HomeS1() {
  const navigate = useNavigate(); // Initialize useNavigate

  const handelClick = async (e) => {
    navigate("/all-pro");
  };
  return (
    <div id="section_1">
      <div className="poster">
        <img src={Prof} alt="" />
        <div>Professionals at you Service</div>
      </div>
      <div className="boxes" onClick={handelClick}>
        Schedule your chat now <img src={Chat} alt="" />
      </div>
    </div>
  );
}

export default HomeS1;
