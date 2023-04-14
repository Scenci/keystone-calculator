import React from 'react';
import './HeaderBanner.css';

const HeaderBanner = ({ currentSeason }) => {

    const fullNameMap = {
        "DF Season 1" : "Dragonflight Season 2",
        "DF Season 2" : "Dragonflight Season 2",
        "DF Season 3" : "Dragonflight Season 3",
        "DF Season 4" : "Dragonflight Season 4"
    };

    const seasonFullName = fullNameMap[currentSeason.name] || currentSeason.name;

  return (
    <div className="header-banner">
        <h1 className="header-text">{seasonFullName}</h1>
    </div>
  );
};

export default HeaderBanner;
