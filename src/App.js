import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import AffixBanner from './components/AffixBanner';
import CharacterSearch from './components/CharacterSearch';
//import KeystoneCalculator from './components/KeytoneCalculator';


function App() {

  const [character, setCharacter] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [dungeonData, setDungeonData] = useState([]);
  const [affixes, setAffixes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);



  useEffect(() => {
    document.title="Keystone Calculator";

    //TODO: Include Other Region Affixes
    const fetchAffixes = async () => {
      try {
        const response = await axios.get('https://raider.io/api/v1/mythic-plus/affixes?region=us&locale=en');
        setAffixes(response.data.title);
        console.log("AFFIX RESPONSE: ",typeof response.data.title);
      } catch (error) {
        console.error("Error fetching affixes:", error);
      }
    };

    fetchAffixes();



}, []);



  

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

      setSearchResults((prevResults) => [...prevResults, combinedData]);
    } catch (error) {
      console.error('Error fetching character data:', error);
    }
  };


  return(
    <div className="page-container">
      <div className="App">
      
        {affixes.length > 0 && <div className="affix-container"><AffixBanner affixes={affixes}/></div>}

        <div className="search-container">
          <CharacterSearch onSearch={handleCharacterSearch} />
        </div>
        <div className="keystone-calculator-container">


        </div>
      </div>

    </div>

  );
} export default App;