import React from 'react';
import { useState, useEffect } from 'react';
import Header from './components/Header';
import EventList from './components/EventList';
import CitySearch from './components/CitySearch';
import NumberOfEvents from './components/NumberOfEvents';
import { getEvents, extractLocations } from './api';
import './App.scss';

function App() {
  const [allLocations, setAllLocations] = useState([]);
  const [currentNOE, setCurrentNOE] = useState(32);
  const [events, setEvents] = useState([]);
  const [currentCity, setCurrentCity] = useState('See all cities');

  useEffect(() => {
    fetchData();
  }, [currentCity, currentNOE]);

  const fetchData = async () => {
    const allEvents = await getEvents();
    const filteredEvents =
      currentCity === 'See all cities'
        ? allEvents
        : allEvents.filter(event => event.location === currentCity);
    setEvents(filteredEvents.slice(0, currentNOE));
    setAllLocations(extractLocations(allEvents));
  };

  return (
    <div className="App">
      <Header />
      <div className="search-container">
        <CitySearch
          allLocations={allLocations}
          setCurrentCity={setCurrentCity}
        />
        <NumberOfEvents currentNOE={currentNOE} setCurrentNOE={setCurrentNOE} />
      </div>
      <EventList events={events} />
    </div>
  );
}

export default App;
