import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="editor-footer">
      <div className="footer-content">
        <div className="footer-item">MY STUDIO</div>
        <div className="footer-item">Script Editor</div>
        <div className="footer-item">v1.0.0</div>
        <div className="footer-item"></div>

        <div className="footer-item-spacer"></div>
        <div className="footer-item">UTF-8</div>
        <div className="footer-item">Script</div>
        <div className="footer-item">.gs</div>
      </div>
    </footer>
  );
};

export default Footer;
