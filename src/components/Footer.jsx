import React from 'react';
import './Footer.scss';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <h6 className="text-info">
          {new Date().getFullYear()} &copy; Happenly. All rights reserved.
        </h6>
      </div>
    </footer>
  );
};

export default Footer;
