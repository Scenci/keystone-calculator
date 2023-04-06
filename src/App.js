import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import AffixBanner from './components/AffixBanner';
import CharacterSearch from './components/CharacterSearch';
import KeystoneCalculator from './components/KeystoneCalculator';
//import KeystoneCalculator from './components/KeytoneCalculator';


function App() {

  const [character, setCharacter] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [affixes, setAffixes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [seasons, setSeasons] = useState([]);
  const [currentSeason, setCurrentSeason] = useState();
  const [currentDungeons, setCurrentDungeons] = useState([]);

  const [errorMessage,setErrorMessage] = useState('');



  useEffect(() => {
    document.title="Keystone Calculator";

    //TODO: Include Other Region Affixes
    const fetchAffixes = async () => {
      try {
        const response = await axios.get('https://raider.io/api/v1/mythic-plus/affixes?region=us&locale=en');
        setAffixes(response.data.title);
        
      } catch (error) {
        console.error("Error fetching affixes:", error);
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
  console.log("Updated current dungeons:", currentDungeons);
  

}, [currentDungeons]);

useEffect(() => {
  console.log("Search Results === Dungeon Data: ", searchResults);
  console.log("Character: ",searchResults.character);
  console.log("Best Runs: ", searchResults.mythic_plus_best_runs);
  console.log("Alternate Runs: ", searchResults.mythic_plus_alternate_runs);
}, [searchResults]);

  const handleCharacterSearch = async (region, server, characterName) => {
    try {
      const result = await axios(
        `https://raider.io/api/v1/characters/profile?region=${region}&realm=${server}&name=${characterName}&fields=mythic_plus_scores_by_season%3Acurrent%2Cmythic_plus_best_runs%3Aall%2Cmythic_plus_alternate_runs%3Aall`
      );
      
      const combinedData = {
        character: result.data,
        mythic_plus_best_runs: result.data.mythic_plus_best_runs,
        mythic_plus_alternate_runs: result.data.mythic_plus_alternate_runs,
      };

      console.log("combined data: ",combinedData);

      //Search Results are effectively the dungeonData from the previous app.
      //Overwrite the searchResults state everytime a new character is searched.
      setSearchResults(combinedData);
  
      setErrorMessage(""); // Clear any previous error message
    } catch (error) {
      console.error('Error fetching character data:', error);
      setErrorMessage('Failed to find a valid user. Please check the input and try again.');
    }

  };




  return(
    <div className="page-container">
      <div className="App">
      
        {affixes.length > 0 && <div className="affix-container"><AffixBanner affixes={affixes}/></div>}

        <div className="search-container">
        <CharacterSearch onSearch={handleCharacterSearch} setErrorMessage={setErrorMessage} />


        </div>
        {errorMessage && (
          <div className="error-message">
            <p>{errorMessage}</p>
          </div>
        )}


        <div className="keystone-calculator-container">
          <KeystoneCalculator

          dungeons={currentDungeons.map(dungeon => dungeon.short_name)}
          />
        </div>
      </div>

    </div>

  );
} 
export default App;

