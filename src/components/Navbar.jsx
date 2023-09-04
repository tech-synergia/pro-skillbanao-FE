import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { FaAlignJustify } from "react-icons/fa6";
import { Menu, Dropdown } from "antd";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { persistor } from "../store";

import logo from "../assets/logo.jpeg";
import "../scss/Navbar.scss";
const menuStyle = {
  textDecoration: "none",
  fontSize: "17px",
};

const baseUrl = import.meta.env.VITE_BASE_URL;

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfessionalMenuOpen, setIsProfessionalMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userAuthDetails, setUserAuthDetails] = useState({});

  const accessToken = useSelector((state) => state.auth.token);

  const authUser = async () => {
    try {
      const response = await axios.post(`${baseUrl}/auth/token`, {
        accessToken,
      });
      setIsLoggedIn(true);
      setUserAuthDetails(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    authUser();
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    persistor.purge();
    window.location.reload();
  };

  const professionalMenu = (
    <Menu>
      <Menu.Item key="register">
        <NavLink to={"/registerProf"} onClick={toggleMenu} style={menuStyle}>
          Register
        </NavLink>
      </Menu.Item>
      <Menu.Item key="login">
        <NavLink to={"/login"} onClick={toggleMenu} style={menuStyle}>
          Login
        </NavLink>
      </Menu.Item>
    </Menu>
  );

  const userMenu = (
    <Menu>
      <Menu.Item key="register">
        <NavLink to={"/registerUser"} onClick={toggleMenu} style={menuStyle}>
          Register
        </NavLink>
      </Menu.Item>
      <Menu.Item key="login">
        <NavLink to={"/login"} onClick={toggleMenu} style={menuStyle}>
          Login
        </NavLink>
      </Menu.Item>
    </Menu>
  );
  // console.log(userAuthDetails);
  return (
    <nav id="navbar">
      <div className="content-container">
        <div className="content">
          <NavLink to={"/"}>
            <div className="logo-title">
              <img src={logo} alt="logo" />
            </div>
          </NavLink>
          <ul
            className={`links ${isMenuOpen ? "open" : ""}`}
            style={{ zIndex: "3" }}
          >
            {userAuthDetails.mainRole === "professional" && (
              <li>
                <NavLink to={"/propanel"} onClick={toggleMenu}>
                  Professional Panel
                </NavLink>
              </li>
            )}

            {userAuthDetails.mainRole === "admin" && (
              <li>
                <NavLink to={"/adminPanel"} onClick={toggleMenu}>
                  Admin Panel
                </NavLink>
              </li>
            )}
            {userAuthDetails.mainRole !== "professional" && (
              <li>
                <NavLink to={"/all-pro"} onClick={toggleMenu}>
                  Chat with Professionals
                </NavLink>
              </li>
            )}
            {!isLoggedIn && (
              <li>
                <NavLink
                  to={"#"}
                  onMouseEnter={() => setIsProfessionalMenuOpen(true)}
                  onMouseLeave={() => setIsProfessionalMenuOpen(false)}
                >
                  <Dropdown
                    overlay={professionalMenu}
                    open={isProfessionalMenuOpen}
                    placement="bottomLeft"
                  >
                    <span>
                      Professional
                      <i
                        className="bi bi-caret-down-fill"
                        style={{ fontSize: "12px" }}
                      ></i>
                    </span>
                  </Dropdown>
                </NavLink>
              </li>
            )}
            {!isLoggedIn && (
              <li>
                <NavLink
                  to={"#"}
                  onMouseEnter={() => setIsUserMenuOpen(true)}
                  onMouseLeave={() => setIsUserMenuOpen(false)}
                >
                  <Dropdown
                    overlay={userMenu}
                    placement="bottomLeft"
                    open={isUserMenuOpen}
                  >
                    <span>
                      User
                      <i
                        className="bi bi-caret-down-fill"
                        style={{ fontSize: "12px" }}
                      ></i>
                    </span>
                  </Dropdown>
                </NavLink>
              </li>
            )}
            <li>
              <a href="/#latestBlog" onClick={toggleMenu}>
                Blog
              </a>
            </li>
            {isLoggedIn && (
              <li>
                <NavLink to={"/"} onClick={toggleMenu}>
                  {userAuthDetails.name}
                </NavLink>
              </li>
            )}
            {isLoggedIn && (
              <li>
                <NavLink onClick={handleLogout}>Logout</NavLink>
              </li>
            )}
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
