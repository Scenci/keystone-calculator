import React, { useState } from 'react';
import './CharacterSearch.css';

const CharacterSearch = ({ onSearch }) => {
  const [region, setRegion] = useState('us');
  const [server, setServer] = useState('');
  const [characterName, setCharacterName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(region, server, characterName);
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

        <button type="submit">Search</button>
      </form>
    </div>
  );
};

export default CharacterSearch;
