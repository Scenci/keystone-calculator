import React from 'react';
import './Instructions.css';

const Instructions = () => {
  return (
    <div className="instructions">
      <h2>How it works</h2>
      <p>
        Enter key levels by searching or enter them manually.
      </p>
      <p>
        Scores are approximated, you may expect your the in-game score to be several points higher on average. 
      </p>
      <p className="dummy-buttons">
      <button className="dummy-toggle-button">+1</button>  +0.625 Points <b>(Default)</b> <br></br>
      <button className="dummy-toggle-button">+2</button>  +2.5 Points <br></br>
      <button className="dummy-toggle-button">+3</button>  +5 Points <br></br>
      <button className="negative-dummy-toggle-button">-1</button>  Flat -5 Points<br></br>
      </p>
      <p>
        For untimed Keys (-1), we assume -5 points with no considerations beyond this.
      </p>
      <p>
      <b>Dragonflight: Season 2 Scoring System</b>
        </p>
      {/* Add more instructions as needed */}
    </div>
  );
};

export default Instructions;
