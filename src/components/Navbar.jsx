import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FaAlignJustify } from 'react-icons/fa6';
import { Menu, Dropdown } from 'antd';

import logo from '../assets/logo.jpeg';
import '../scss/Navbar.scss';

const menuStyle = {
  textDecoration: "none",
  fontSize: "17px"
}

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
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
    <Menu >
      <Menu.Item key="register">
        <NavLink to={"/registerUser"} onClick={toggleMenu} style={menuStyle}>
          Register
        </NavLink>
      </Menu.Item>
      <Menu.Item key="login">
        <NavLink to={"/login"} onClick={toggleMenu} style={menuStyle} >
          Login
        </NavLink>
      </Menu.Item>
    </Menu>
  );

  return (
    <nav id="navbar">
      <div className="content-container">
        <div className="content">
          <NavLink to={"/"}>
            <div className="logo-title">
              <img src={logo} alt="logo" />
            </div>
          </NavLink>
          <ul className={`links ${isMenuOpen ? 'open' : ''}`} style={{ zIndex: '3' }}>
            <li>
              <NavLink to={"/all-pro"} onClick={toggleMenu}>
                Chat with Professionals
              </NavLink>
            </li>
            <li>
              <NavLink to={"#"} onClick={toggleMenu}>
                <Dropdown overlay={professionalMenu} placement="bottomLeft" trigger={['hover']}>
                  <span>Professional <i class="bi bi-caret-down-fill" style={{fontSize: "12px"}}></i></span>
                </Dropdown>
              </NavLink>
            </li>
            <li>
            <NavLink to={"#"} onClick={toggleMenu}>
              <Dropdown overlay={userMenu} placement="bottomLeft" trigger={['hover']}>
                <span>User <i class="bi bi-caret-down-fill" style={{fontSize: "12px"}}></i></span>
              </Dropdown>
            </NavLink>
            </li>
            <li>
              <a href="/#latestBlog" onClick={toggleMenu}>
                Blog
              </a>
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

