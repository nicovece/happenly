import React from 'react';
import { loadFeature, defineFeature } from 'jest-cucumber';
import { render, waitFor } from '@testing-library/react';
import App from '../App';
import userEvent from '@testing-library/user-event';

const feature = loadFeature('./src/features/showHideAnEventsDetails.feature');

defineFeature(feature, test => {
  test('Event element details box is collapsed by default', ({
    given,
    when,
    then,
  }) => {
    let AppComponent;
    given('the app is launched', async () => {
      AppComponent = render(<App />);
    });

    when('the main page is loaded', () => {
      waitFor(() => {
        const eventList = AppComponent.container.querySelector('#event-list');
        expect(eventList).toBeInTheDocument();
      });
    });

    then('the event details box is hidden', () => {
      waitFor(() => {
        const eventDetails =
          AppComponent.container.querySelector('.event .details');
        expect(eventDetails).toBeNull();
      });
    });
  });

  test('User can expand and show the event element details box', ({
    given,
    and,
    when,
    then,
  }) => {
    let AppComponent;
    given('the main page is loaded', async () => {
      AppComponent = render(<App />);
    });

    and('events list is loaded', async () => {
      waitFor(() => {
        const eventList = AppComponent.container.querySelector('#event-list');
        expect(eventList).toBeInTheDocument();
      });
    });

    and('the event details box is hidden', async () => {
      waitFor(() => {
        const eventDetails =
          AppComponent.container.querySelector('.event .details');
        expect(eventDetails).toBeNull();
      });
    });

    when('the user clicks on an event show details button', async () => {
      const showDetailsButton = AppComponent.container.querySelector(
        '.event.closed .details-btn'
      );
      userEvent.click(showDetailsButton);
    });

    then('the event details box is shown', async () => {
      waitFor(() => {
        const eventDetails =
          AppComponent.container.querySelector('.event .details');
        expect(eventDetails).toBeInTheDocument();
      });
    });
  });

  test('User can collapse an event to hide details', ({
    given,
    and,
    when,
    then,
  }) => {
    let AppComponent;
    given('the main page is loaded', async () => {
      AppComponent = render(<App />);
    });

    and('events list is loaded', async () => {
      waitFor(() => {
        const eventList = AppComponent.container.querySelector('#event-list');
        expect(eventList).toBeInTheDocument();
      });
    });

    and('the event details box is shown', async () => {
      waitFor(() => {
        const eventDetails =
          AppComponent.container.querySelector('.event .details');
        expect(eventDetails).toBeInTheDocument();
      });
    });

    when('the user clicks on an event hide details button', () => {
      const hideDetailsButton = AppComponent.container.querySelector(
        '.event.open .details-btn'
      );
      userEvent.click(hideDetailsButton);
    });

    then('the event details box is hidden', async () => {
      waitFor(() => {
        const eventDetails =
          AppComponent.container.querySelector('.event .details');
        expect(eventDetails).toBeNull();
      });
    });
  });
});
