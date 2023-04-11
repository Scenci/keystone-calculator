import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import AffixBanner from './components/AffixBanner';
import CharacterSearch from './components/CharacterSearch';
import KeystoneCalculator from './components/KeystoneCalculator';
//import KeystoneCalculator from './components/KeytoneCalculator';

import useCharacterSearch from './hooks/useCharacterSearch';
import useSortedRuns from './hooks/useSortedRuns';
import useAffixes from './hooks/useAffixes';
import useStaticData from './hooks/useStaticData';

function App() {
  //Contains { Character{...}, BestRuns{...}, AltRuns{...} } raw from API

  //Contains the sorted (by dungeon) Best and Alt runs.
  const [dungeonsData, setDungeonsData] = useState({});

  //Contains only Character{...} from API
  const [character, setCharacter] = useState({});


  //Hooks: Returns these variables
  const { affixes, isLoading: isLoadingAffixes } = useAffixes();
  const { seasons, currentSeason, currentDungeons, isLoading: isLoadingStaticData } = useStaticData();
  const {handleCharacterSearch, setErrorMessage, errorMessage, searchResults} = useCharacterSearch();
  const sortedRuns = useSortedRuns(searchResults);



  return(
    <div className="page-container">
      <div className="App">
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
              sortedRuns={sortedRuns}
              dungeons={currentDungeons.map((dungeon) => dungeon.short_name)}
            />
          </div>
        )}
  
      </div>
    </div>
  );
  
} 
export default App;

