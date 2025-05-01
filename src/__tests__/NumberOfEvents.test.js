import React from 'react';
import {
  render,
  screen,
  within,
  waitFor,
  fireEvent,
} from '@testing-library/react';
import NumberOfEvents from '../components/NumberOfEvents';
import App from '../App';

describe('<NumberOfEvents /> component', () => {
  test('contains a number input element', () => {
    render(<NumberOfEvents currentNOE={32} setCurrentNOE={() => {}} />);
    const inputElement = screen.getByRole('spinbutton');
    expect(inputElement).toBeInTheDocument();
  });

  test('number input should have a default value of 32', () => {
    render(<NumberOfEvents currentNOE={32} setCurrentNOE={() => {}} />);
    const inputElement = screen.getByRole('spinbutton');
    expect(inputElement).toHaveValue(32);
  });

  test('value changes when user types in the input field', async () => {
    const setCurrentNOE = jest.fn();
    render(<NumberOfEvents currentNOE={32} setCurrentNOE={setCurrentNOE} />);
    const inputElement = screen.getByRole('spinbutton');

    // Directly set the input value to 10
    fireEvent.change(inputElement, { target: { value: '10' } });

    expect(setCurrentNOE).toHaveBeenCalledWith(10);
  });

  test('sets value to 0 when input is empty or invalid', async () => {
    const setCurrentNOE = jest.fn();
    render(<NumberOfEvents currentNOE={32} setCurrentNOE={setCurrentNOE} />);
    const inputElement = screen.getByRole('spinbutton');

    // Test empty input
    fireEvent.change(inputElement, { target: { value: '' } });
    expect(setCurrentNOE).toHaveBeenCalledWith(0);

    // Test invalid input
    fireEvent.change(inputElement, { target: { value: 'abc' } });
    expect(setCurrentNOE).toHaveBeenCalledWith(0);
  });
});

describe('<NumberOfEvents /> integration', () => {
  test('renders default number of events (32) when app loads', async () => {
    const AppComponent = render(<App />);
    const AppDOM = AppComponent.container.firstChild;

    // Wait for events to load
    await waitFor(() => {
      const EventListDOM = AppDOM.querySelector('#event-list');
      const EventListItems = within(EventListDOM).queryAllByRole('listitem');
      expect(EventListItems.length).toBeLessThanOrEqual(32);
    });
  });

  test('updates number of events when user changes the input value', async () => {
    const AppComponent = render(<App />);
    const AppDOM = AppComponent.container.firstChild;

    // Get the number input
    const NumberOfEventsDOM = AppDOM.querySelector('#number__of__events');
    const numberInput = within(NumberOfEventsDOM).queryByRole('spinbutton');

    // Directly set the input value to 10
    fireEvent.change(numberInput, { target: { value: '10' } });

    // Wait for the events list to update and stabilize
    await waitFor(
      () => {
        const EventListDOM = AppDOM.querySelector('#event-list');
        const EventListItems = within(EventListDOM).queryAllByRole('listitem');
        expect(EventListItems.length).toBeLessThanOrEqual(10);
      },
      { timeout: 3000 }
    ); // Increase timeout to ensure state updates
  });

  test('displays all available events when user sets a large number', async () => {
    const AppComponent = render(<App />);
    const AppDOM = AppComponent.container.firstChild;

    // Get the number input
    const NumberOfEventsDOM = AppDOM.querySelector('#number__of__events');
    const numberInput = within(NumberOfEventsDOM).queryByRole('spinbutton');

    // Directly set the input value to 100
    fireEvent.change(numberInput, { target: { value: '100' } });

    // Wait for the events list to update and stabilize
    await waitFor(
      () => {
        const EventListDOM = AppDOM.querySelector('#event-list');
        const EventListItems = within(EventListDOM).queryAllByRole('listitem');
        // The actual number of events should be less than or equal to the total available events
        expect(EventListItems.length).toBeLessThanOrEqual(100);
      },
      { timeout: 3000 }
    ); // Increase timeout to ensure state updates
  });
});
