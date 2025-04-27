import React, { useState } from 'react';

const NumberOfEvents = () => {
  const [numEvents, setNumEvents] = useState(32);

  return (
    <div id='number__of__events'>
      <label htmlFor='number-input'>Number of Events:</label>
      <input
        id='number-input'
        type='number'
        value={numEvents}
        onChange={(e) => setNumEvents(parseInt(e.target.value))}
        className='number-input'
      />
    </div>
  );
};

export default NumberOfEvents;
