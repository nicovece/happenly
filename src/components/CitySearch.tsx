import React, { useState, useEffect } from 'react';
import { InfoAlert } from './Alert';
import { CitySearchProps } from '../types';

const CitySearch: React.FC<CitySearchProps> = ({
  allLocations,
  setCurrentCity,
}) => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [infoAlert, setInfoAlert] = useState('');

  const handleInputChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const filteredLocations = allLocations
      ? allLocations.filter(location => {
          return location.toUpperCase().indexOf(value.toUpperCase()) > -1;
        })
      : [];
    setQuery(value);
    setSuggestions(filteredLocations);

    let infoText: string;
    if (filteredLocations.length === 0) {
      infoText =
        'We can not find the city you are looking for. Please try another city';
    } else {
      infoText = '';
    }
    setInfoAlert(infoText);
  };

  const handleItemClicked = (event: React.MouseEvent<HTMLLIElement>) => {
    const value = (event.target as HTMLElement).textContent ?? '';
    setQuery(value);
    setShowSuggestions(false);
    setCurrentCity(value);
    setInfoAlert('');
  };

  useEffect(() => {
    setSuggestions(allLocations || []);
  }, [`${allLocations}`]);

  return (
    <div id="city-search">
      <h1 className="page__title">
        <strong className="accent">Happenly</strong>. Discover what's happening!
      </h1>
      <label className="visually-hidden" htmlFor="city">
        Search for a city
      </label>
      {infoAlert.length ? <InfoAlert text={infoAlert} /> : null}
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
          <li onClick={handleItemClicked} key="See all cities">
            <b>See all cities</b>
          </li>
        </ul>
      ) : null}
    </div>
  );
};

export default CitySearch;
