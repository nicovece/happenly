import React, { useState, useEffect } from 'react';

const CitySearch = ({ allLocations, setCurrentCity }) => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const handleInputChanged = event => {
    const value = event.target.value;
    const filteredLocations = allLocations
      ? allLocations.filter(location => {
          return location.toUpperCase().indexOf(value.toUpperCase()) > -1;
        })
      : [];
    setQuery(value);
    setSuggestions(filteredLocations);
  };

  const handleItemClicked = event => {
    const value = event.target.textContent;
    setQuery(value);
    setShowSuggestions(false);
    setCurrentCity(value);
  };

  useEffect(() => {
    setSuggestions(allLocations || []);
  }, [`${allLocations}`]);

  return (
    <div id="city-search">
      <h1 className="page__title">
        <strong className="accent">Happenly</strong>. Discover what’s happening!
      </h1>
      <label className="visually-hidden" htmlFor="city">
        Search for a city
      </label>
      <input
        type="text"
        className="city"
        id="city"
        placeholder="Search for a city"
        value={query}
        onFocus={() => setShowSuggestions(true)}
        onChange={handleInputChanged}
      />
      {showSuggestions ? (
        <ul className="suggestions">
          {suggestions.map(suggestion => {
            return (
              <li onClick={handleItemClicked} key={suggestion}>
                {suggestion}
              </li>
            );
          })}
          <li key="See all cities">
            <b>See all cities</b>
          </li>
        </ul>
      ) : null}
    </div>
  );
};

export default CitySearch;
