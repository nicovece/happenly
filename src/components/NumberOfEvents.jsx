import React from 'react';

const NumberOfEvents = ({ currentNOE, setCurrentNOE, setErrorAlert }) => {
  const handleInputChanged = event => {
    let value = parseInt(event.target.value);
    if (isNaN(value)) {
      value = 0;
    }
    if (value > 1000 || value < 1 || isNaN(value)) {
      setErrorAlert('Only numbers between 1 and 1000 are allowed');
    } else {
      setErrorAlert('');
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
