import React from 'react';
import './Footer.css';
import githubLogo from '../assets/github_transparent_icon.png';
import patreonLogo from '../assets/patreon_transparent_logo.png';


const Footer = () => {
    return (
        <footer className="footer">
          <div className="footer-content">
            <div className="logos-container">

              <div className="github-logo">
              <a href="https://github.com/scenci" target="_blank" rel="noopener noreferrer">
                <img src={githubLogo} alt="Github Logo" />
                </a>
                <span className="github-text">COMING<br/>SOON</span>
              </div>

              <div className="patreon-logo"> 
              <a href="https://www.patreon.com/KeystoneCalculator" target="_blank" rel="noopener noreferrer">
                <img src={patreonLogo} alt="Patreon Logo" />
                </a>
                <span className="patreon-text">SUPPORT</span>
              </div>
            </div>
          </div>
        </footer>
      );
}
export default Footer;