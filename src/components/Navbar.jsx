import { NavLink } from "react-router-dom";
import "../scss/Navbar.scss";
import logo from "../images/logo.jpeg";
import { FaAlignJustify } from "react-icons/fa6";
import { useState } from "react";

function Navbar() {
  // Initialize state for the dropdown menu
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Function to toggle the dropdown menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav id="navbar">
      <div className="content-container">
        <div className="content">
          <NavLink to={"/"}>
            <div className="logo-title">
              <img src={logo} alt="logo" />
            </div>
          </NavLink>
          {/* Add a class based on the state to show/hide the menu */}
          <ul className={`links ${isMenuOpen ? "open" : ""}`}>
            <li>
              <NavLink to={"/all-pro"} onClick={toggleMenu}>
                Chat with Professionals
              </NavLink>
            </li>
            <li>
              <NavLink to={"/blogs"} onClick={toggleMenu}>
                Blogs
              </NavLink>
            </li>
            <li>
              <NavLink to={"/signup"} onClick={toggleMenu}>
                Register as Professional
              </NavLink>
            </li>
            <li>
              <NavLink to={"/login"} onClick={toggleMenu}>
                Login
              </NavLink>
            </li>
          </ul>
          <div className="nav-btn" onClick={toggleMenu}>
            <FaAlignJustify />
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
