import React from 'react';

import closeIcon from '../../assets/icons/closeIcon.png';

import './info-bar.css';

const InfoBar = ({ room }) => (
  <div className="infoBar">
    <div className="leftInnerContainer">
        <h3>{ room }</h3>
    </div>
    <div className="rightInnerContainer">
        <a href="/"><img src={closeIcon} alt="close" /></a>
    </div>
  </div>
);

export default InfoBar;
