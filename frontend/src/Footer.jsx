import React from 'react';
import './Style/footer.css';
import './index.css';
import fb from './assets/fb.png';
import ig from './assets/ig.png';
import tg from './assets/tg.png';
import contact from './assets/contact.svg'

function Footer() {
  return (
    <footer>
      <div className='foot1'>
        <div className="socials">
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
            <img width="20px" src={fb} alt="Facebook" id="fb" />
          </a>
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
            <img width="20px" src={ig} alt="Instagram" id="ig" />
          </a>
          <a href="https://t.me" target="_blank" rel="noopener noreferrer">
            <img width="20px" src={tg} alt="Telegram" id="tg" />
          </a>
        </div>
        <div className='foot2'>
          <div><img className='invert' src={contact} alt="" />Contact Us</div>
          <div>&copy; 2024 FitBuddy. All rights reserved.</div>
        </div>
    </div>
    </footer >
  );
}

export default Footer;
