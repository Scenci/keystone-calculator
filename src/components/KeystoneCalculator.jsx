import React, { useState, useEffect } from 'react';
import './KeystoneCalculator.css';

const KeystoneCalculator = ({ rawData, seasonDungeonsShortNames, keyLevels, setKeyLevels }) => {

  const [error, setError] = useState("");

  const handleLoadData = (data) => {
    console.log("load data: ", data);
    const tyrannicalBestRuns = filterDungeonsByType(data.mythic_plus_best_runs, 'Tyrannical');
    const fortifiedBestRuns = filterDungeonsByType(data.mythic_plus_best_runs, 'Fortified');
    const tyrannicalAlternateRuns = filterDungeonsByType(data.mythic_plus_alternate_runs, 'Tyrannical');
    const fortifiedAlternateRuns = filterDungeonsByType(data.mythic_plus_alternate_runs, 'Fortified');
    
    const tyrannicalRuns = tyrannicalBestRuns.concat(tyrannicalAlternateRuns);
    const fortifiedRuns = fortifiedBestRuns.concat(fortifiedAlternateRuns);
  
    const newKeyLevels = seasonDungeonsShortNames.reduce((acc, dungeon) => {
      const tyrannicalRun = tyrannicalRuns.find(run => run.short_name === dungeon);
      const fortifiedRun = fortifiedRuns.find(run => run.short_name === dungeon);
      acc[dungeon] = [
        tyrannicalRun ? tyrannicalRun.mythic_level : '',
        fortifiedRun ? fortifiedRun.mythic_level : ''
      ];
      return acc;
    }, {});

    setKeyLevels(newKeyLevels);
  };

  function filterDungeonsByType(dungeonRuns, type) {
    
    const r = dungeonRuns
      .filter((run) => run.affixes.some((affix) => affix.name === type))
      .map((run) => ({ ...run, columnType: type }));
      console.log("r: ",r);

      return r;
  };

  
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

  const generateInitialUPState = () => {
    const initialState = {};
  
    seasonDungeonsShortNames.forEach((dungeon) => {
      initialState[dungeon] = { 0: 0.05, 1: 0.05 };
    });
  
    return initialState;
  };

  //Really important State Set here
  const [UPState, setUPState] = useState(generateInitialUPState());

  const getScoreColor = (score) => {
    const scoreRange = Object.keys(scoreColorMapping).find((range) => score > parseFloat(range));
    return scoreRange ? scoreColorMapping[scoreRange] : 'white';
  };

  const handleInputChange = (dungeon, index, value) => {
    if (value > 35) {
      setError("You wish");
      return;
    } else if( value < 0 ) {
      setError("Key Values must be greater than or equal to 1");
      return;
    }else{
        setError("");
    }
    
    const newKeyLevels = { ...keyLevels };
    if (!newKeyLevels[dungeon]) {
      newKeyLevels[dungeon] = ['', ''];
    }
    newKeyLevels[dungeon][index] = value;
    setKeyLevels(newKeyLevels);
  };

  
  const calculateTimeBonus = (UP) => {
    var timeBonus = 5;
    if(UP >= 0.4){
      return timeBonus;
    } else if(UP >= 0.2){
      timeBonus = 5 * UP / 0.4;
      return timeBonus;
    } else {
        timeBonus = 5 * Math.min(UP / 0.4 , 1);
        return timeBonus;
      }
    };
    

  const calculateKeyScore = (keyLevel1, keyLevel2, UP1, UP2) => {
    const calculateSingleKeyScore = (keyLevel, UP) => {
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
      return score + calculateTimeBonus(UP);
    };

    if (isNaN(keyLevel1) || isNaN(keyLevel2)) {
      return 0;
    }
    const TimeBonus1 = calculateTimeBonus(UP1);
    const TimeBonus2 = calculateTimeBonus(UP2);

    const higherKey = Math.max(keyLevel1, keyLevel2);
    const lowerKey = Math.min(keyLevel1, keyLevel2);

  // Calculate scores for each key
  const lowerKeyScore = calculateSingleKeyScore(lowerKey, UP1);
  const higherKeyScore = calculateSingleKeyScore(higherKey, UP2);

  const AlternateKeyScore = lowerKeyScore * 0.5;
  const BestKeyScore = higherKeyScore * 1.5;

  // Return the sum of both scores
  return (AlternateKeyScore + BestKeyScore).toFixed(2);
  };
  
  const calculateTotalMPS = () => {
    let total = 0;
    for (const dungeon in keyLevels) {
      total += parseFloat(calculateKeyScore(
        keyLevels[dungeon] ? keyLevels[dungeon][0] : "",
        keyLevels[dungeon] ? keyLevels[dungeon][1] : "",
        UPState[dungeon] ? UPState[dungeon][0] : 0.05,
        UPState[dungeon] ? UPState[dungeon][1] : 0.05
      ));
    }
    return isNaN(total.toFixed(2)) ? "Please Enter your Keys" : total.toFixed(2);
  };

  const handleToggleClick = (dungeon, index) => {
    setUPState((prevState) => {
      const currentValue = (prevState[dungeon] && prevState[dungeon][index]) || 0.05;
      const nextValue = (currentValue === 0.05) ? 0.2 : ((currentValue === 0.2) ? 0.4 : 0.05);
      return {
        ...prevState,
        [dungeon]: {
          ...prevState[dungeon],
          [index]: nextValue,
        },
      };
    });
  };

  const getCustomText = (value) => {
    if (value === 0.05) {
      return '+1';
    } else if (value === 0.2) {
      return '+2';
    } else {
      return '+3';
    }
  };

//RenderInputPairs Starts Here
const renderInputPairs = () => {
  return (
    <div className="dungeon-grid">
      <div className="header-row">
        <div className="dungeon-name" style={{ textDecoration: 'underline' }}>Dungeon</div>
        <div className="fortified-column">
          <label>Fortified</label>
        </div>
        <div className="tyrannical-column">
          <label>Tyrannical</label>
        </div>
        <div className="sum-display" style={{ textDecoration: 'underline' }}>Dungeon Score</div>
      </div>
      {seasonDungeonsShortNames.map((dungeon, i) => (
        <div key={i} className="dungeon-row">
          <div className="dungeon-name">{dungeon}</div>
          <div className="fortified-column">
            <button className="toggle-button" onClick={() => handleToggleClick(dungeon, 1)}>
              {getCustomText((UPState[dungeon] && UPState[dungeon][1]) || 0.05)}
            </button>
            <input
              id={`input-${i + 8}`}
              type="number"
              value={keyLevels[dungeon] ? keyLevels[dungeon][1] : ""}
              onChange={(e) => handleInputChange(dungeon, 1, e.target.value)}
              className="small-input"
            />
          </div>
          <div className="tyrannical-column">
            <button className="toggle-button" onClick={() => handleToggleClick(dungeon, 0)}>
              {getCustomText((UPState[dungeon] && UPState[dungeon][0]) || 0.05)}
            </button>
            <input
              id={`input-${i}`}
              type="number"
              value={keyLevels[dungeon] ? keyLevels[dungeon][0] : ""}
              onChange={(e) => handleInputChange(dungeon, 0, e.target.value)}
              className="small-input"
            />
          </div>
          <div className="sum-display">
            ={" "}
            {calculateKeyScore(
              keyLevels[dungeon] ? keyLevels[dungeon][0] : "",
              keyLevels[dungeon] ? keyLevels[dungeon][1] : "",
              UPState[dungeon] ? parseFloat(UPState[dungeon][0]) : 0.05,
              UPState[dungeon] ? parseFloat(UPState[dungeon][1]) : 0.05
            )}
          </div>
        </div>
      ))}
    </div>
  );
};


  

  
return (
  <div className="keystone-calculator">
    <h2>
      <u>Mythic Plus Calculator</u>
    </h2>
    {rawData && rawData.character && (
  <button onClick={() => handleLoadData(rawData)} className="load-data-button">
    Load {rawData.character.name}'s Keys
  </button>
)}


    {renderInputPairs()}
    {error && <p className="error-message">{error}</p>}
    <div>
      <h3 style={{ color: 'white' }}>Approximate Mythic Plus Score:
      <span 
        style={{ color: isNaN(calculateTotalMPS()) ? '#ed5b45' : getScoreColor(calculateTotalMPS()) }}> {calculateTotalMPS()}</span></h3>
    </div>
  </div>
);

};

export default KeystoneCalculator;

