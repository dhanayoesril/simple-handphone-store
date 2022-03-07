import React from 'react';
import './Footer.css';
import Image from '../Image';

const Footer = () => {
  return (
      <div className="container-fluid">
        <div className="row footer">
            <div className="col-md-6 d-flex justify-content-center align-items-center pt-1 pb-1">
                <Image
                    src={require('../../images/ig.png')}
                />
                <Image
                    src={require('../../images/fb.png')}
                />
                <Image
                    src={require('../../images/twt.png')}
                />
            </div>
            <div className="col-md-6 d-flex align-items-center pt-2 pb-1">
                <p className="footer-text">Terms & Condition | Copyright © 2018. All rights reserved. PT Radya Gita Bahagi</p>
            </div>
        </div>
      </div>
  )
}

export default Footer;