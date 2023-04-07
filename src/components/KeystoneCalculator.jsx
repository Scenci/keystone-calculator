import React, { useState, useEffect } from 'react';
import './KeystoneCalculator.css';


//Keystone Calculator takes in the dungeons for each season on component (page) load.
//This is why MythicPlusCalcuator.jsx from dreadpl.us does not have this variable, but this one does.
const KeystoneCalculator = ({ sortedRuns, dungeons }) => {

  const [fortifiedRuns, setFortifiedRuns] = useState({});
  const [tyrannicalRuns, setTyrannicalRuns] = useState({});


    //We need character information from Search to load the calculator.
    
    const [error, setError] = useState("");
    //console.log("dungeons in calculator: ",dungeons);
    //console.log("Character In Calculator: ",dungeons);

    useEffect(() => {
      const fortified = {};
      const tyrannical = {};
  
      dungeons.forEach((dungeon) => {
        const dungeonData = sortedRuns[dungeon];
        if (dungeonData) {
          fortified[dungeon] = dungeonData.bestRun && dungeonData.bestRun.affixes.includes('Fortified') ? dungeonData.bestRun.mythic_level : '';
          tyrannical[dungeon] = dungeonData.bestRun && dungeonData.bestRun.affixes.includes('Tyrannical') ? dungeonData.bestRun.mythic_level : '';
        } else {
          fortified[dungeon] = '';
          tyrannical[dungeon] = '';
        }
      });
      setFortifiedRuns(fortified);
      setTyrannicalRuns(tyrannical);
    }, [sortedRuns, dungeons]);


    const handleFortifiedInputChange = (dungeon, value) => {
      const updatedRuns = { ...fortifiedRuns };
    
      if (value >= 1 && value <= 35) {
        updatedRuns[dungeon] = value;
        setError("");
      } else if (value < 1) {
        updatedRuns[dungeon] = 1;
        setError("Please Input a Key Level value between 1 and 35");
      } else if (value > 35) {
        updatedRuns[dungeon] = 35;
        setError("Please Input a Key Level value between 1 and 35");
      }
    
      setFortifiedRuns(updatedRuns);
    };
    
    const handleTyrannicalInputChange = (dungeon, value) => {
      const updatedRuns = { ...tyrannicalRuns };
    
      if (value >= 1 && value <= 35) {
        updatedRuns[dungeon] = value;
        setError("");
      } else if (value < 1) {
        updatedRuns[dungeon] = 1;
        setError("Please Input a Key Level value between 1 and 35");
      } else if (value > 35) {
        updatedRuns[dungeon] = 35;
        setError("Please Input a Key Level value between 1 and 35");
      }
    
      setTyrannicalRuns(updatedRuns);
    };

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

  
      const calculateTimeBonus = (underPercentage) => {
        var timeBonus = 5;
        if(underPercentage >= 0.4){
          return timeBonus;
        } else if(underPercentage >= 0.2){
          timeBonus = 5 * underPercentage / 0.4;
          return timeBonus;
        } else {
            timeBonus = 5 * Math.min(underPercentage / 0.4 , 1);
            return timeBonus;
          }
        };
        

        return (
          <div className="calculator-container">
            <h2>Keystone Calculator</h2>
            <table>
              <thead>
                <tr>
                  <th>Dungeon</th>
                  <th>Fortified</th>
                  <th>Tyrannical</th>
                </tr>
              </thead>
              <tbody>
                {dungeons.map((dungeon) => (
                  <tr key={dungeon}>
                    <td>{dungeon}</td>
                    <td>
                      {/* Render input for Fortified */}
                    <input
                      type="number"
                      min = "1"
                      max = "35"
                      value={fortifiedRuns[dungeon] || ''}
                      onChange={(e) => handleFortifiedInputChange(dungeon, e.target.value)}
                    />
                    </td>
                    <td>
                      {/* Render input for Tyrannical */}
                      <input
                      type="number"
                      min = "1"
                      max = "35"
                      value={tyrannicalRuns[dungeon] || ''}
                      onChange={(e) => handleTyrannicalInputChange(dungeon, e.target.value)}
                    />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {error && <p className="error">{error}</p>}
          </div>
        
        );
}

export default KeystoneCalculator;