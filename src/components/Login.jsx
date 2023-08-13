import "../scss/Login.scss";
import google from '../assets/search.png'
import Navbar from "./Navbar";

function Login() {
  return (
    <div>
      <Navbar />
      <div class="intro">
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvQNPZghaHW-xOa_OTlaJNnAG0GKRDvuNgkSIplUOyEAslm8ug" alt="no image" />
      </div>
      <div class="container">
       
        <h2>Hi Welcome!</h2>
        <p>Submit your Mobile number</p>
       
        <br />
        <div class="login">
          <h6 class="choose"><span>Log in or Sign up</span></h6>
          <div class="number">
            <select>
              <option value="">+1</option>
              <option value="">+91</option>
              <option value="">+21</option>
            </select>
            <div class="vr"></div>
            <input
              type="number"
              name=""
              id=""
              placeholder="Enter Mobile number"
            />
          </div>
          <button>SEND OTP</button>
            <br />
          <p class="choose"><span>Or</span></p>

          <button>
          <img src={google} alt="no image" /> Sign in with Google
          </button>
          <br />
          <p class="privacy-policy">
            By signing up you agree to our <a href="#">Terms of Use</a> and
            <a href="">Privacy Policy</a>
          </p>
        </div>
      </div>
    </div>

  )
}

export default Login;
