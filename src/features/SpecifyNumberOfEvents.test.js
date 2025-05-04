import React from 'react';
import { loadFeature, defineFeature } from 'jest-cucumber';
import { render, waitFor } from '@testing-library/react';
import App from '../App';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/dom';

const feature = loadFeature('./src/features/SpecifyNumberOfEvents.feature');

defineFeature(feature, test => {
  test('Display the default number (32) of events unless otherwise specified', ({
    given,
    when,
    then,
  }) => {
    let AppComponent;
    given('the main page is loaded', async () => {
      AppComponent = render(<App />);
    });

    when('the events list is loaded', async () => {
      waitFor(() => {
        const eventList = AppComponent.container.querySelector('#event-list');
        expect(eventList).toBeInTheDocument();
      });
    });

    then('the default number of events is applied', async () => {
      waitFor(() => {
        const eventItems = screen.getAllByRole('listitem');
        expect(eventItems.length).toBe(32);
      });
    });
  });

  test('User can set the number of events to be displayed', ({
    given,
    and,
    when,
    then,
  }) => {
    let AppComponent;
    given('the main page is loaded', async () => {
      AppComponent = render(<App />);
    });

    and('the events list is loaded', async () => {
      waitFor(() => {
        const eventList = AppComponent.container.querySelector('#event-list');
        expect(eventList).toBeInTheDocument();
      });
    });

    when(
      'the user sets the number of events to display using the input field',
      async () => {
        const numberOfEventsInput = screen.getByRole('spinbutton');
        await userEvent.type(numberOfEventsInput, '{backspace}{backspace}10');
      }
    );

    then('that number of events is displayed', async () => {
      waitFor(() => {
        const eventItems = screen.getAllByRole('listitem');
        expect(eventItems.length).toBe(10);
      });
    });
  });
});
