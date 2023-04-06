import React, { useState } from 'react';
import './KeystoneCalculator.css';

const KeystoneCalculator = ({keyLevels, setKeyLevels, dungeons}) => {

    //We need character information from Search to load the calculator.
    
    const [error, setError] = useState("");
    //console.log("dungeons in calculator: ",dungeons);
    //console.log("Character In Calculator: ",dungeons);


    //Define Color Mapping TODO: Include all colors for RaiderIO Addon
    const scoreColorMapping = {
        '3450.0': '#ff8000',
        '3290.0': '#f9753c',
        '3170.0': '#f26b5b',
        '3050.0': '#ea6078',
        '2930.0': '#df5693',
        '2810.0': '#d24cad',
        '2690.0': '#c242c8',
        '2570.0': '#ad38e3',
        '2430.0': '#9544eb',
        '2310.0': '#7c55e7',
        '2190.0': '#5e62e3',
        '2070.0': '#316cdf',
        '1905.0': '#2d79d4',
        '1785.0': '#4787c4',
        '1665.0': '#5496b5',
        '1545.0': '#5ca5a5',
        '0.0': 'white',
      };

      //For the "Normal Mode" of the calculator, we set all underPercentage Values to 5%
      const generateInitialUnderPercentageState = () => {
      const initialState = {};
        dungeons.forEach((dungeon) => {
          initialState[dungeon] = { 0: 0.05, 1: 0.05 };
        });
        return initialState;
      };
    
      const [underPercentageState, setUnderPercentageState] = useState(generateInitialUnderPercentageState());

      const getScoreColor = (score) => {
        const scoreRange = Object.keys(scoreColorMapping).find((range) => score > parseFloat(range));
        return scoreRange ? scoreColorMapping[scoreRange] : 'white';
      };









    return (
      <div></div>


    );
}

export default KeystoneCalculator;