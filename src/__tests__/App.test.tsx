import React from 'react';
import { render, within, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { getEvents } from '../api';
import App from '../App';

describe('<App /> component', () => {
  let AppDOM: HTMLElement;
  beforeEach(async () => {
    const { container } = render(<App />);
    AppDOM = container.firstChild as HTMLElement;
    await waitFor(() => {
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
    const AppDOM = AppComponent.container.firstChild as HTMLElement;

    await waitFor(() => {
      expect(AppDOM.querySelector('#city-search')).toBeInTheDocument();
    });

    const CitySearchDOM = AppDOM.querySelector('#city-search') as HTMLElement;
    const cityTextBox = within(CitySearchDOM).queryByRole('textbox')!;

    await user.type(cityTextBox, 'Berlin');
    const berlinSuggestionItem = await waitFor(() =>
      within(CitySearchDOM).queryByText('Berlin, Germany')
    );
    await user.click(berlinSuggestionItem!);

    const EventListDOM = AppDOM.querySelector('#event-list') as HTMLElement;
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
