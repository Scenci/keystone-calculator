import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import './KeystoneCalculator.css';

const KeystoneCalculator = ({ sortedRuns, seasonDungeonsNames, seasonDungeonsShortNames }) => {
  const { register } = useForm();
  const [scores, setScores] = useState(Array(seasonDungeonsShortNames.length).fill({ fortifiedScore: 0, tyrannicalScore: 0 }));

  const handleInputChange = (index, fieldType, value) => {
    const newScores = [...scores];
    const score = calculateScore(fieldType, value);
    newScores[index] = { ...newScores[index], [`${fieldType}Score`]: score };
    setScores(newScores);
  };

  const totalScore = scores.reduce((acc, score) => acc + score.fortifiedScore + score.tyrannicalScore, 0);

  const calculateScore = (fieldType, value) => {
    // Example: simple score calculation based on key level
    const score = parseInt(value, 10) * 10;
  
    return score;
  };
  
  return (
    <div className="keystone-calculator">
      <form className="input-form">
        <div className="form-row">
          <div className="column-tyrannical">
            {seasonDungeonsShortNames.map((dungeon, index) => (
              <div key={index} className="dungeon-inputs">
                <label>{dungeon}</label>
                <input
                  defaultValue=""
                  {...register(`tyrannical_${index}`)}
                  onChange={(e) => handleInputChange(index, 'tyrannical', e.target.value)}
                />
              </div>
            ))}
          </div>
          <div className="column-fortified">
            {seasonDungeonsShortNames.map((dungeon, index) => (
              <div key={index} className="dungeon-inputs">
                <input
                  defaultValue=""
                  {...register(`fortified_${index}`)}
                  onChange={(e) => handleInputChange(index, 'fortified', e.target.value)}
                />
              </div>
            ))}
          </div>
          <div className="column-scores">
            {scores.map((score, index) => (
              <div key={index} className="dungeon-scores">
                <span>{score.fortifiedScore + score.tyrannicalScore}</span>
              </div>
            ))}
          </div>
        </div>
      </form>
      <div className="total-score">Total Score: {totalScore}</div>
    </div>
  );
};

export default KeystoneCalculator;
