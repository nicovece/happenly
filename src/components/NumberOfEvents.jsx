import React from 'react';

const NumberOfEvents = ({ currentNOE, setCurrentNOE }) => {
  const handleInputChanged = event => {
    let value = parseInt(event.target.value);
    if (isNaN(value)) {
      value = 0;
    }
    setCurrentNOE(value);
  };

  return (
    <div id="number__of__events">
      <label htmlFor="number-input">Number of Events:</label>
      <input
        id="number-input"
        type="number"
        min="0"
        value={currentNOE}
        onChange={handleInputChanged}
        className="number-input"
      />
    </div>
  );
};

export default NumberOfEvents;
