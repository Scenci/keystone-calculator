import React, { useState, useEffect } from 'react';
import './App.css';

import AffixBanner from './components/AffixBanner';
import CharacterSearch from './components/CharacterSearch';
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
  
        {!isLoadingStaticData && currentDungeons.length > 0 && (
          <div className="keystone-calculator-container">
            <KeystoneCalculator
              rawData={searchResults}
              seasonDungeonsShortNames={currentDungeons.map(dungeon => dungeon.short_name)}
              keyLevels={keyLevels} 
              setKeyLevels={setKeyLevels}
            />
          </div>
        )}
      <div className="app-footer-container">
          <Footer/>
      </div>
      </div>
    </div>
  );
  
} 
export default App;

