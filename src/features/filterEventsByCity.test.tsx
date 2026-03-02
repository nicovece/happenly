import { render, waitFor, within, RenderResult } from '@testing-library/react';
import { loadFeature, defineFeature } from 'jest-cucumber';
import App from '../App';

const feature = loadFeature('./src/features/filterEventsByCity.feature');

defineFeature(feature, test => {
  test("When user hasn\u2019t searched for a city, show upcoming events from all cities", ({
    given,
    when,
    then,
  }) => {
    let AppComponent: RenderResult;

    given("user hasn\u2019t searched for any city", () => {});

    when('the user opens the app', () => {
      AppComponent = render(<App />);
    });

    then('the user should see the list of all upcoming events', async () => {
      const AppDOM = AppComponent.container.firstChild as HTMLElement;
      const EventListDOM = AppDOM.querySelector('#event-list') as HTMLElement;

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
      "the user should receive a list of cities (suggestions) that match what they\u2019ve typed",
      () => {}
    );
  });

  test('User can select a city from the suggested list', ({
    given,
    and,
    when,
    then,
  }) => {
    given('user was typing \u201cBerlin\u201d in the city textbox', () => {});

    and('the list of suggested cities is showing', () => {});

    when(
      'the user selects a city (e.g., \u201cBerlin, Germany\u201d) from the list',
      () => {}
    );

    then(
      'their city should be changed to that city (i.e., \u201cBerlin, Germany\u201d)',
      () => {}
    );

    and(
      'the user should receive a list of upcoming events in that city',
      () => {}
    );
  });
});
