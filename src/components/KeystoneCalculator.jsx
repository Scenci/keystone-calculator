import React, { useState, useEffect } from 'react';
import './KeystoneCalculator.css';


//Keystone Calculator takes in the dungeons for each season on component (page) load.
//This is why MythicPlusCalcuator.jsx from dreadpl.us does not have this variable, but this one does.
const KeystoneCalculator = ({ sortedRuns, dungeons, searchResults }) => {

  //the dungeons prop simply tells us the dungeons that we need to use for the current season (we can ignore dungeonNametoShortName in the long run)
  //sortedRuns should contain the information of the currently searchCharacter.

  const [fortifiedRuns, setFortifiedRuns] = useState({});
  const [tyrannicalRuns, setTyrannicalRuns] = useState({});


    //We need character information from Search to load the calculator.
    
    const [error, setError] = useState("");
   
    //console.log("Character In Calculator: ",dungeons);

    //To eliminate the need for this manual conversion, we need to return the full Dungeon Name from sortedRuns()...
    const dungeonShortNameToLongName = {
      'AA'  : "Algeth'ar Academy",
      'COS' : "Court of Stars",
      'HOV' : "Halls of Valor" ,
      'RLP' : "Ruby Life Pools",
      'SBG' : "Shadowmoon Burial Grounds",
      'TJS' : "Temple of the Jade Serpent",
      'AV'  : "The Azure Vault",
      'NO'  : "The Nokhud Offensives",
    };

    useEffect(() => {
      const fortified = {};
      const tyrannical = {};
      console.log(sortedRuns);
    
      dungeons.forEach((shortDungeon) => {
        const longDungeon = dungeonShortNameToLongName[shortDungeon];
        const dungeonData = sortedRuns[shortDungeon];
    
        if (dungeonData) {
          fortified[longDungeon] =
            dungeonData.bestRun && dungeonData.bestRun.affixes.find((affix) => affix.name === "Fortified")
              ? dungeonData.bestRun.mythic_level
              : "";
          tyrannical[longDungeon] =
            dungeonData.bestRun && dungeonData.bestRun.affixes.find((affix) => affix.name === "Tyrannical")
              ? dungeonData.bestRun.mythic_level
              : "";
        } else {
          fortified[longDungeon] = "";
          tyrannical[longDungeon] = "";
        }
      });
      setFortifiedRuns(fortified);
      setTyrannicalRuns(tyrannical);
    }, [sortedRuns, dungeons,searchResults]);
    
    




    // =========================================== Hook Ends Here =====================================================
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


        const calculateKeyScore = (keyLevel1, keyLevel2, UP1, UP2) => {
          const calculateSingleKeyScore = (keyLevel, underPercentage) => {
            let score;
        
            if (keyLevel <= 10) {
              score = 30 + 5 * keyLevel;
              if (keyLevel >= 7) {
                score += 5;
              }
            } else {
              score = 85 + 7 * (keyLevel - 10);
              if (keyLevel >= 14) {
                score += 5;
              }
            }
            return score + calculateTimeBonus(underPercentage);
          };

          
          //We have no way of getting UP1 or UP2 right now, so we will usually assume it to be 0.05
          const TimeBonus1 = calculateTimeBonus(UP1);
          const TimeBonus2 = calculateTimeBonus(UP2);
        
          // Assign lowerKey and higherKey based on the key levels
          const [lowerKey, higherKey] = keyLevel1 <= keyLevel2 ? [keyLevel1, keyLevel2] : [keyLevel2, keyLevel1];
        
          // Calculate scores for each key
          const lowerKeyScore = calculateSingleKeyScore(lowerKey, UP1);
          const higherKeyScore = calculateSingleKeyScore(higherKey, UP2);

          const AlternateKeyScore = lowerKeyScore * 0.5;
          const BestKeyScore = higherKeyScore * 1.5;
        
          // Return the sum of both scores
          return (AlternateKeyScore + BestKeyScore).toFixed(2);
        };

        const totalScore = dungeons.map((dungeon) => {
            return calculateKeyScore(
              fortifiedRuns[dungeon] || 0,
              tyrannicalRuns[dungeon] || 0,
              underPercentageState[dungeon]?.[0] || 0.05,
              underPercentageState[dungeon]?.[1] || 0.05
            );
          })
          .reduce((accumulator, currentValue) => accumulator + parseFloat(currentValue), 0)
          .toFixed(2);
        
        
        return (
          <div className="center-container">
          <div className="calculator-container">
            <h2>Keystone Calculator</h2>
            <table>
              <thead>
                <tr>
                  <th>Dungeon</th>
                  <th>Fortified</th>
                  <th>Tyrannical</th>
                  <th>Score</th>
                </tr>
              </thead>
              <tbody>
                {dungeons.map((dungeon) => {
                  const score = calculateKeyScore(
                    fortifiedRuns[dungeon] || 0,
                    tyrannicalRuns[dungeon] || 0,
                    underPercentageState[dungeon]?.[0] || 0.05,
                    underPercentageState[dungeon]?.[1] || 0.05
                  );
                  const scoreColor = getScoreColor(score);
        
                  return (
                    <tr key={dungeon}>
                      <td>{dungeon}</td>
                      <td>
                        {/* Render input for Fortified */}
                        <input
                          type="number"
                          min="1"
                          max="35"
                          value={fortifiedRuns[dungeon] || ""}
                          onChange={(e) =>
                            handleFortifiedInputChange(dungeon, e.target.value)
                          }
                        />
                      </td>
                      <td>
                        {/* Render input for Tyrannical */}
                        <input
                          type="number"
                          min="1"
                          max="35"
                          value={tyrannicalRuns[dungeon] || ""}
                          onChange={(e) =>
                            handleTyrannicalInputChange(dungeon, e.target.value)
                          }
                        />
                      </td>
                      <td>{score}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            {error && <p className="error">{error}</p>}
            <div className="total-score-container">
              <p className="total-score-label">Approximate Mythic+ Score:</p>
              <p
                className="total-score"
                style={{ color: isNaN(totalScore) ? '#ed5b45' : getScoreColor(totalScore) }}
              >
                {totalScore}
              </p>
            </div>

          </div>
          </div>
        );
        
        
}

export default KeystoneCalculator;