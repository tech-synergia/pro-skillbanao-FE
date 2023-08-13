import { useState ,useEffect } from "react";
import { NavLink } from "react-router-dom";
import '../scss/Chat.scss';
import { FaArrowLeft ,FaEllipsisVertical , FaTelegram } from "react-icons/fa6";


const CountdownTimer = () => {
  const [minutes, setMinutes] = useState(30);
  const [seconds, setSeconds] = useState(20);

  useEffect(() => {
    let intervalId;

    const tick = () => {
      if (minutes === 0 && seconds === 0) {
        // Timer has reached zero, you can perform any action here
        clearInterval(intervalId);
        return;
      }

      if (seconds === 0) {
        setMinutes((prevMinutes) => prevMinutes - 1);
        setSeconds(59);
      } else {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }
    };

    intervalId = setInterval(tick, 1000);

    return () => clearInterval(intervalId);
  }, [minutes, seconds]);

  return (<>
    <span>Time Left </span>
        <span>
        {minutes.toString().padStart(2, '0')} : {seconds.toString().padStart(2, '0')}
        </span>
        </>
  );
};




const Chat = ()=>
{
       
        let [seconds, setSeconds] = useState(5);
        let [minute, setMinute] = useState(30);

        // setInterval(() => {
        //     //alert(seconds);
        //     setSeconds(seconds-=1);
        //     if (seconds <0) {
        //       setSeconds(59);
        //       setMinute(minute - 1);
        //     }
            
        // }, 1000);


    return(
        <div className="chat-page">
           <div className="chat-head">
             <NavLink to = {'/'}> <FaArrowLeft /> </NavLink>
             <div className="info">
                <img src="https://picsum.photos/800/600?random=2" alt="consultant Photo" />
                <h3>Consultant name</h3>
             </div>
             <div> <FaEllipsisVertical /> </div>
           </div>
           <div className="chat-timer">
            <CountdownTimer />
            
           </div>
           <div className="chat-area">
                  {
                    Array(20).fill(<>
                    <div class="recieved">
                        <img src="https://picsum.photos/800/600?random=2" alt="" width="50"></img>
                        <div class="chat">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum quaerat maxime soluta aut, nostrum
                            accusamus! Soluta ex beatae exercitationem, cupiditate delectus suscipit in illo. Sunt ad molestias
                            fugit ea repellat!
                        </div>
                    </div>
                   
        
                    <div class="sent">
                        <div class="chat">
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum quaerat maxime soluta aut, nostrum
                                    accusamus! Soluta ex beatae exercitationem, cupiditate delectus suscipit in illo. Sunt ad molestias
                                    fugit ea repellat!
                         </div>
                      </div>
                    </>)
                  }
           </div>
           <div className="send-box" >
            <textarea name="" id="" rows="2" placeholder="Type a message"></textarea> <button> <FaTelegram /></button>
           </div>
        </div>
    )
}
export default Chat;