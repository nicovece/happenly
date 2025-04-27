import React from 'react';
import EventList from './components/EventList';
import CitySearch from './components/CitySearch';
import NumberOfEvents from './components/NumberOfEvents';
function App() {
  return (
    <div className='App'>
      <CitySearch />
      <NumberOfEvents />
      <EventList />
    </div>
  );
}

export default App;
