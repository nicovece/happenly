import React from 'react';
import { render, within, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { getEvents } from '../api';
import App from '../App';

describe('<App /> component', () => {
  let AppDOM;
  beforeEach(async () => {
    // Wait for the initial render and effect to complete
    const { container } = render(<App />);
    AppDOM = container.firstChild;
    await waitFor(() => {
      // Wait for the event list to be present
      expect(AppDOM.querySelector('#event-list')).toBeInTheDocument();
    });
  });

  test('renders list of events', () => {
    expect(AppDOM.querySelector('#event-list')).toBeInTheDocument();
  });

  test('render CitySearch', () => {
    expect(AppDOM.querySelector('#city-search')).toBeInTheDocument();
  });

  test('render NumberOfEvents', () => {
    expect(AppDOM.querySelector('#number__of__events')).toBeInTheDocument();
  });
});

describe('<App /> integration', () => {
  test('renders a list of events matching the city selected by the user', async () => {
    const user = userEvent.setup();
    const AppComponent = render(<App />);
    const AppDOM = AppComponent.container.firstChild;

    // Wait for the city search to be present
    await waitFor(() => {
      expect(AppDOM.querySelector('#city-search')).toBeInTheDocument();
    });

    const CitySearchDOM = AppDOM.querySelector('#city-search');
    const cityTextBox = within(CitySearchDOM).queryByRole('textbox');

    await user.type(cityTextBox, 'Berlin');
    // Wait for the suggestion to appear
    const berlinSuggestionItem = await waitFor(() =>
      within(CitySearchDOM).queryByText('Berlin, Germany')
    );
    await user.click(berlinSuggestionItem);

    // Wait for the event list to update
    const EventListDOM = AppDOM.querySelector('#event-list');
    await waitFor(() => {
      const allRenderedEventItems =
        within(EventListDOM).queryAllByRole('listitem');
      expect(allRenderedEventItems.length).toBeGreaterThan(0);
    });

    const allRenderedEventItems =
      within(EventListDOM).queryAllByRole('listitem');
    const allEvents = await getEvents();
    const berlinEvents = allEvents.filter(
      event => event.location === 'Berlin, Germany'
    );

    expect(allRenderedEventItems.length).toBe(berlinEvents.length);

    allRenderedEventItems.forEach(event => {
      expect(event.textContent).toContain('Berlin, Germany');
    });
  });
});
