import React, { useState } from 'react';
import './App.css';

import infoIcon from './assets/icons8-info-512.png';

import AffixBanner from './components/AffixBanner';
import CharacterSearch from './components/CharacterSearch';
import Instructions from './components/Instructions';
import KeystoneCalculator from './components/KeystoneCalculator';
import HeaderBanner from './components/HeaderBanner';
import Footer from './components/Footer';

import useCharacterSearch from './hooks/useCharacterSearch';
import useSortedRuns from './hooks/useSortedRuns';
import useAffixes from './hooks/useAffixes';
import useStaticData from './hooks/useStaticData';




function App() {

  //The keyLevels are set by the API return and combinedData
  const [keyLevels, setKeyLevels] = useState({});
  const [showInstructions, setShowInstructions] = useState(false);


  //Contains only Character{...} from API - Could be used in future builds
  const [character, setCharacter] = useState({});


  //Hooks: Returns these variables
  const { affixes, isLoading: isLoadingAffixes } = useAffixes();
  const { seasons, currentSeason, currentDungeons, isLoading: isLoadingStaticData } = useStaticData();
  const {handleCharacterSearch, setErrorMessage, errorMessage, searchResults} = useCharacterSearch();
  const sortedRuns = useSortedRuns(searchResults);

  
  //Covnvert currentDungeons into object with just names and shortnames then pass that as the prop?
  

  return(
    
    <div className="page-container">
      
      <div className="App">
      <div style={{ 
          width: '100%', 
          backgroundColor: 'lightblue', 
          color: 'black',
          padding: '3px',
          textAlign: 'center',
          boxSizing: 'border-box'
   
        }}>
          Tip: Providing timing bonuses make the scores significantly more accurate.
        </div>
        
      {!isLoadingStaticData && currentSeason && (<HeaderBanner currentSeason={currentSeason} />)}
        {!isLoadingAffixes && affixes.length > 0 && <div className="affix-container"><AffixBanner affixes={affixes}/></div>}
        
        {!isLoadingStaticData && (
          <div className="search-container">
            <CharacterSearch 
              onSearch={handleCharacterSearch} 
              setErrorMessage={setErrorMessage}
              setSearchResults={searchResults}
            />
          </div>
        )}
  
        {errorMessage && (
          <div className="error-message">
            <p>{errorMessage}</p>
          </div>
        )}
      <div className="calculator-wrapper">
        <div className="calculator-content">
          <img
            className="info-icon"
            src={infoIcon}
            alt="Toggle Instructions"
            onClick={() => setShowInstructions(!showInstructions)}
            style={{ cursor: 'pointer' }}
          />
          <div className="components-container">
          {showInstructions && (
            <div className="instructions-container">
              <Instructions />
            </div>
          )}
        </div>
        {!isLoadingStaticData && currentDungeons.length > 0 && (
          <div className="keystone-calculator-container">
            <KeystoneCalculator
              rawData={searchResults}
              seasonDungeonsShortNames={currentDungeons.map(
                (dungeon) => dungeon.short_name
              )}
              keyLevels={keyLevels}
              setKeyLevels={setKeyLevels}
            />
          </div>
          )}
        </div>
        </div>
      <div className="app-footer-container">
          <Footer/>
      </div>
      </div>
    </div>
  );
  
} 
export default App;

