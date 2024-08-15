import React, { useState } from "react";
import "./navbar.css";
import { RiMenu3Line, RiCloseLine } from "react-icons/ri";
import logo from "../../assets/logo.svg";
import { Link, useNavigate } from 'react-router-dom';

const Menu = () => (
  <>
    <p><Link to="/">Home</Link></p>
    <p><a href="#wgpt3">What is GPT3?</a></p>
    <p><a href="#possibility">Open AI</a></p>
    <p><a href="#features">Case Studies</a></p>
    <p><a href="#blog">Library</a></p>
  </>
);

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="gpt3__navbar">
    <div className="gpt3__navbar-links">
      <div className="gpt3__navbar-links_logo">
        <img src={logo} alt="logo" />
      </div>
      <div className="gpt3__navbar-links_container">
        <Menu />
      </div>
    </div>
      <div className="gpt3__navbar-sign">
        <button type="button" className="gpt3__navbar-signinButton" onClick={() => navigate('/login')}>Sign in</button>
        <button type="button" className="gpt3__navbar-signoutButton" onClick={() => navigate('/signup')}>Sign up</button>
      </div>
      <div className="gpt3__navbar-menu">
        {toggleMenu ? (
          <RiCloseLine
            color="#fff"
            size={27}
            onClick={() => setToggleMenu(false)}
          />
        ) : (
          <RiMenu3Line
            color="#fff"
            size={27}
            onClick={() => setToggleMenu(true)}
          />
        )}
        {toggleMenu && (
          <div className="gpt3__navbar-menu_container scale-up-center">
            <div className="gpt3__navbar-menu_container-links">
              <Menu />
              <div className="gpt3__navbar-menu_container-links-sign">
                <button type="button" onClick={() => navigate('/login')}>Sign in</button>
                <button type="button" onClick={() => navigate('/signup')}>Sign up</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
