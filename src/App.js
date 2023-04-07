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
<<<<<<< HEAD

  //Contains the sorted (by dungeon) Best and Alt runs.
=======
  const [searchResults, setSearchResults] = useState([]);

  //Contains the sorted (by dungeon) Best and Alt runs.
  const [sortedRuns, setSortedRuns] = useState([]);
>>>>>>> main
  const [dungeonsData, setDungeonsData] = useState({});

  //Contains only Character{...} from API
  const [character, setCharacter] = useState([]);
<<<<<<< HEAD

  //States to control the *current* Seasonal Information such as Affixes, Dungeons etc.
=======

  //States to control the *current* Seasonal Information such as Affixes, Dungeons etc.
  const [affixes, setAffixes] = useState([]); // May have issues with future seasons...
  const [seasons, setSeasons] = useState([]);
  const [currentSeason, setCurrentSeason] = useState();
  const [currentDungeons, setCurrentDungeons] = useState([]);


  
  //Important UX States.
  const [isLoading, setIsLoading] = useState(true);

  //Important Error Handling States
  const [lastSearchedCharacter, setLastSearchedCharacter] = useState(null);
  const [errorMessage,setErrorMessage] = useState('');
>>>>>>> main

  const { affixes, isLoading: isLoadingAffixes } = useAffixes();
  const { seasons, currentSeason, currentDungeons, isLoading: isLoadingStaticData } = useStaticData();

//========= Hooks End Here Code Begins Here ======================= Hooks End Here Code Begins Here ======================== Hooks End Here Code Begins Here ==============================================================

<<<<<<< HEAD
  const {handleCharacterSearch, setErrorMessage, errorMessage, searchResults} = useCharacterSearch();
  const sortedRuns = useSortedRuns(searchResults);
=======
  useEffect(() => {
    document.title="Keystone Calculator";

    //TODO: Include Other Region Affixes
    const fetchAffixes = async () => {
      try {
        const response = await axios.get('https://raider.io/api/v1/mythic-plus/affixes?region=us&locale=en');
        setAffixes(response.data.title);
        
      } catch (error) {
        console.error("Error fetching affixes:", error);
      } finally {
        setIsLoading(false);
      }
    };

    const fetchStaticData = async () => {
      try {
        const response = await axios.get('https://raider.io/api/v1/mythic-plus/static-data?expansion_id=9');

        //We do not care about response.data.dungeons because that only accounts for Dragonflight dungeons. 
        //We care about M+ Seasonal dungeons which is stored under the season object.
        //We use season short_name to identify the season and season start to know when the current season is.
        setSeasons(response.data.seasons);
        
        //console.log("ALL SEASONS:" ,response.data.seasons);

      } catch (error) {
        console.error("Error fetching static data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAffixes();
    fetchStaticData();

}, []);

//We use a second hook to ensure that we get our data after StaticData is loaded by the time we attempt to getCurrentSeason(...)
//We only check the season status against North America ('us') because the 24-hour timing will be irrelevant during Season Start.
useEffect(() => {
  const getCurrentSeason = (seasons) => {
    const currentTime = new Date();

    for (let season of seasons) {
      if (season.starts.us === null) {
        continue;
      }
      const start = new Date(season.starts.us);
      const end = season.ends.us ? new Date(season.ends.us) : null;

      if (currentTime >= start && (end === null || currentTime <= end)) {
        return season;
      }
    }

    return null;
  };

  // Only call setCurrentSeason if seasons data is available
  if (seasons.length > 0) {
    setCurrentSeason(getCurrentSeason(seasons));
  }
}, [seasons]);


//Third Hook to assign currentDungeons from currentSeason
useEffect(() => {
  if (currentSeason && currentSeason.dungeons) {
    setCurrentDungeons(currentSeason.dungeons);
  }
}, [currentSeason]);

//Fourth Hook to print the currentDungeons data
useEffect(() => {
  //console.log("Updated current dungeons:", currentDungeons);
  

}, [currentDungeons]);

useEffect(() => {
  //console.log("Search Results === Dungeon Data: ", searchResults);
  //console.log("Character: ",searchResults.character);
  //console.log("Best Runs: ", searchResults.mythic_plus_best_runs);
  //console.log("Alternate Runs: ", searchResults.mythic_plus_alternate_runs);

}, [searchResults]);


//========= Hooks End Here Code Begins Here ======================= Hooks End Here Code Begins Here ======================== Hooks End Here Code Begins Here ==============================================================


const updateSortedRuns = (combinedData) => {
  //console.log(combinedData);
  const sortedRuns = sortRunsByDungeon(combinedData.mythic_plus_best_runs, combinedData.mythic_plus_alternate_runs);
  setSortedRuns(sortedRuns);
  console.log(sortedRuns);
  // You can set this sortedRuns object to a new state if you want to use it later in your component
};


const sortRunsByDungeon = (bestRuns, alternateRuns) => {
  let sortedRuns = {};

  // Iterate over best runs and store them in the sortedRuns object
  bestRuns.forEach((run) => {
    const dungeonName = run.dungeon;
    if (!sortedRuns[dungeonName]) {
      sortedRuns[dungeonName] = {
        bestRun: run,
        alternateRun: null,
      };
    } else {
      sortedRuns[dungeonName].bestRun = run;
    }
  });

  // Iterate over alternate runs and store them in the sortedRuns object
  alternateRuns.forEach((run) => {
    const dungeonName = run.dungeon;
    if (!sortedRuns[dungeonName]) {
      sortedRuns[dungeonName] = {
        bestRun: null,
        alternateRun: run,
      };
    } else {
      sortedRuns[dungeonName].alternateRun = run;
    }
  });

  return sortedRuns;
};

//Dedicated Processing function to simply handling characterSearch.
const processCharacterData = (characterData) => {
  const combinedData = {
    character: characterData,
    mythic_plus_best_runs: characterData.mythic_plus_best_runs,
    mythic_plus_alternate_runs: characterData.mythic_plus_alternate_runs,
  };

  // Update search results with the combined data
  setSearchResults(combinedData);

  // Update sorted runs
  updateSortedRuns(combinedData);
  
  setErrorMessage("");
};


// Handle Character Search
const handleCharacterSearch = async (region, server, characterName) => {

  const characterKey = `${region}-${server}-${characterName.toLowerCase()}`;

  if (lastSearchedCharacter === characterKey) {
    setErrorMessage("You've already searched for this character.");
    return Promise.reject();
  }

  try {
    const result = await axios(
      `https://raider.io/api/v1/characters/profile?region=${region}&realm=${server}&name=${characterName}&fields=mythic_plus_scores_by_season%3Acurrent%2Cmythic_plus_best_runs%3Aall%2Cmythic_plus_alternate_runs%3Aall`
    );

    processCharacterData(result.data);
    
    setLastSearchedCharacter(characterKey);

    return Promise.resolve();

  } catch (error) {

    console.error('Error fetching character data:', error);
    setErrorMessage('Failed to find a valid user. Please check the input and try again.');
    return Promise.reject();

  }
};

>>>>>>> main

  return(
    <div className="page-container">
      <div className="App">
<<<<<<< HEAD
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
  
=======
      
        {affixes.length > 0 && <div className="affix-container"><AffixBanner affixes={affixes}/></div>}

        <div className="search-container">
        <CharacterSearch 
        onSearch={handleCharacterSearch} 
        setErrorMessage={setErrorMessage}
        setSearchResults={searchResults}
         />
        

        </div>
>>>>>>> main
        {errorMessage && (
          <div className="error-message">
            <p>{errorMessage}</p>
          </div>
        )}
<<<<<<< HEAD
  
        {!isLoadingStaticData && currentDungeons.length > 0 && (
          <div className="keystone-calculator-container">
            <KeystoneCalculator
              sortedRuns={sortedRuns}
              dungeons={currentDungeons.map((dungeon) => dungeon.short_name)}
            />
          </div>
        )}
  
=======


    <div className="keystone-calculator-container">
      <KeystoneCalculator
        sortedRuns={sortedRuns}
        dungeons={currentDungeons.map((dungeon) => dungeon.short_name)}
      />
    </div>
>>>>>>> main
      </div>
    </div>
  );
  
} 
export default App;

