import React, { useState } from 'react';
import './CharacterSearch.css';

const CharacterSearch = ({ onSearch, setSearchResults }) => {
  const [region, setRegion] = useState('us');
  const [server, setServer] = useState('');
  const [characterName, setCharacterName] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!server || !characterName) {
      setErrorMessage('Please fill in all the required fields.');
      return;
    }
    setErrorMessage('');
    
    setIsSearching(true); // Set isSearching to true before starting the API request

    onSearch(region, server, characterName)
      .then(() => {
        setIsSearching(false);
      })
      .catch(() => {
        setIsSearching(false);
      });
  };
  


  

  return (
    <div className="character-search">
      <form onSubmit={handleSubmit}>
        <label htmlFor="region"></label>
        <select
          id="region"
          value={region}
          onChange={(e) => setRegion(e.target.value)}
        >
          <option value="us">US</option>
          <option value="eu">EU</option>
          <option value="kr">KR</option>
          <option value="tw">TW</option>
        </select>

        <label htmlFor="server"></label>
        <input
          type="text"
          id="server"
          value={server}
          onChange={(e) => setServer(e.target.value)}
          placeholder="Enter Realm Name"
        />

        <label htmlFor="characterName"></label>
        <input
          type="text"
          id="characterName"
          value={characterName}
          onChange={(e) => setCharacterName(e.target.value)}
          placeholder="Enter Character Name"
        />
       
      <button type="submit" disabled={isSearching}>Search</button>
      </form>
      <div className="error-container">
          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </div>
    </div>
  );
};

export default CharacterSearch;
