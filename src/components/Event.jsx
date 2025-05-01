import React from 'react';
import { useState } from 'react';

const Event = ({ event }) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <li className={`event ${showDetails ? 'open' : 'closed'}`}>
      <h2>{event && event.summary}</h2>
      <p>{event && event.location}</p>
      <p>{event && new Date(event.created).toUTCString()}</p>
      {showDetails ? (
        <p className="details" data-testid="event-details">
          {event && event.description}
        </p>
      ) : null}
      <div className="event__actions">
        <button
          className="details-btn"
          onClick={() => {
            showDetails ? setShowDetails(false) : setShowDetails(true);
          }}
        >
          {showDetails ? 'hide details' : 'show details'}
        </button>
      </div>
    </li>
  );
};

export default Event;
