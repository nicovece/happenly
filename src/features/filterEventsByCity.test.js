import React from 'react';
import { render, waitFor, within } from '@testing-library/react';
import { loadFeature, defineFeature } from 'jest-cucumber';
import App from '../App';
import { getEvents } from '../api';

const feature = loadFeature('./src/features/filterEventsByCity.feature');

defineFeature(feature, test => {
  test('When user hasn’t searched for a city, show upcoming events from all cities', ({
    given,
    when,
    then,
  }) => {
    let AppComponent;

    given('user hasn’t searched for any city', () => {});

    when('the user opens the app', () => {
      AppComponent = render(<App />);
    });

    then('the user should see the list of all upcoming events', async () => {
      const AppDOM = AppComponent.container.firstChild;
      const EventListDOM = AppDOM.querySelector('#event-list');

      await waitFor(() => {
        const EventListItems = within(EventListDOM).queryAllByRole('listitem');
        expect(EventListItems.length).toBe(32);
      });
    });
  });

  test('User should see a list of suggestions when they search for a city', ({
    given,
    when,
    then,
  }) => {
    given('the main page is open', () => {});

    when('user starts typing in the city textbox', () => {});

    then(
      'the user should receive a list of cities (suggestions) that match what they’ve typed',
      () => {}
    );
  });

  test('User can select a city from the suggested list', ({
    given,
    and,
    when,
    then,
  }) => {
    given('user was typing “Berlin” in the city textbox', () => {});

    and('the list of suggested cities is showing', () => {});

    when(
      'the user selects a city (e.g., “Berlin, Germany”) from the list',
      () => {}
    );

    then(
      'their city should be changed to that city (i.e., “Berlin, Germany”)',
      () => {}
    );

    and(
      'the user should receive a list of upcoming events in that city',
      () => {}
    );
  });
});
