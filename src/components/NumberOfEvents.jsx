import React, { useState } from 'react';
import { ErrorAlert } from './Alert';
const NumberOfEvents = ({ currentNOE, setCurrentNOE }) => {
  const [errorAlert, setErrorAlert] = useState('');
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
        min="1"
        max="1000"
        value={currentNOE}
        onChange={handleInputChanged}
        className="number-input"
      />
      {errorAlert.length ? <ErrorAlert text={errorAlert} /> : null}
    </div>
  );
};

export default NumberOfEvents;
