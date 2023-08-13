import Prof from "../../assets/proffesional.jpeg";
import Chat from "../../assets/chatcoin-chat-logo.png";
function HomeS1() {
  return (
    <div id="section_1">
      <div className="poster">
        <img src={Prof} alt="" />
        <div>Professionals at you Service</div>
      </div>
      <div className="boxes">
        Schedule your chat now <img src={Chat} alt="" />
      </div>
    </div>
  );
}

export default HomeS1;
