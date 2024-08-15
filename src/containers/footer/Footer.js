import React from 'react';
import gpt3Logo from '../../logo.svg';
import './footer.css';

const Footer = () => (
  <div className="gpt3__footer section__padding">
    <div className="gpt3__footer-heading">
      <h1 className="gradient__text">Do you want to step into the future before others?</h1>
    </div>

    <div className="gpt3__footer-btn">
      <p>Request Early Access</p>
    </div>

    <div className="gpt3__footer-links">
      <div className="gpt3__footer-links_logo">
        <img src={gpt3Logo} alt="gpt3_logo" />
        <p>74600, Karachi, <br /> All Rights Reserved</p>
      </div>
      <div className="gpt3__footer-links_div">
        <h4>Links</h4>
        <p>Overons</p>
        <p>Social Media</p>
        <p>Counters</p>
        <p>Contact</p>
      </div>
      <div className="gpt3__footer-links_div">
        <h4>Company</h4>
        <p>Terms & Conditions</p>
        <p>Privacy Policy</p>
        <p>Contact</p>
      </div>
      <div className="gpt3__footer-links_div">
        <h4>Get in touch</h4>
        <p>North Nazimabad, 74600, Karachi</p>
        <p>0318 - 2238844</p>
        <p>info@payme.net</p>
      </div>
    </div>

    <div className="gpt3__footer-copyright">
      <p>@2024 GPT-4. All rights reserved.</p>
      <p>Made with <span role="img" aria-label="heart">❤️</span> by <span style={{color:'yellow'}}>Afnan Iqbal</span></p>
    </div>
  </div>
);

export default Footer;
