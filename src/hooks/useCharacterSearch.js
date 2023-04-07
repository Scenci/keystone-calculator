import {useState} from 'react';
import axios from 'axios';

const useCharacterSearch = () => {

    const [searchResults, setSearchResults] = useState([]);
    //Important Error Handling States
    const [lastSearchedCharacter, setLastSearchedCharacter] = useState(null);
    const [errorMessage,setErrorMessage] = useState('');

    //Dedicated Processing function to simply handling characterSearch.
    const processCharacterData = (characterData) => {
        const combinedData = {
        character: characterData,
        mythic_plus_best_runs: characterData.mythic_plus_best_runs,
        mythic_plus_alternate_runs: characterData.mythic_plus_alternate_runs,
        };
    
        // Update search results with the combined data
        setSearchResults(combinedData);

        
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

    return {handleCharacterSearch, setErrorMessage, errorMessage, searchResults}

}

export default useCharacterSearch;
