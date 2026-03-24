import { useState, useEffect, lazy, Suspense } from 'react';
import Header from './components/Header';
import EventList from './components/EventList';
import CitySearch from './components/CitySearch';
import NumberOfEvents from './components/NumberOfEvents';
import Footer from './components/Footer';
import { WarningAlert } from './components/Alert';
const CityEventsChart = lazy(() => import('./components/CityEventsChart'));
const EventGenresChart = lazy(() => import('./components/EventGenresChart'));
import { getEvents, extractLocations } from './api';
import { CalendarEvent } from './types';
import './App.scss';

function App() {
  const [allLocations, setAllLocations] = useState<string[]>([]);
  const [currentNOE, setCurrentNOE] = useState(32);
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [currentCity, setCurrentCity] = useState('See all cities');
  const [warningAlert, setWarningAlert] = useState('');

  useEffect(() => {
    if (navigator.onLine) {
      setWarningAlert('');
    } else {
      setWarningAlert('No internet connection. Events are cached.');
    }
    fetchData();
  }, [currentCity, currentNOE]); // eslint-disable-line react-hooks/exhaustive-deps

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
      <div className="alerts-container">
        {warningAlert.length ? <WarningAlert text={warningAlert} /> : null}
      </div>
      <div className="search-container">
        <CitySearch
          allLocations={allLocations}
          setCurrentCity={setCurrentCity}
        />
        <NumberOfEvents currentNOE={currentNOE} setCurrentNOE={setCurrentNOE} />
      </div>
      <div className="charts-container">
        <Suspense fallback={null}>
          <EventGenresChart events={events} />
          <CityEventsChart allLocations={allLocations} events={events} />
        </Suspense>
      </div>
      <div className="events-container">
        <EventList events={events} />
      </div>
      <Footer />
    </div>
  );
}

export default App;
