import React from 'react';
import { render, within, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CitySearch from '../components/CitySearch';
import App from '../App';
import { extractLocations, getEvents } from '../api';

describe('<CitySearch /> component', () => {
  let CitySearchComponent;
  let allLocations;
  beforeEach(() => {
    allLocations = [];
    CitySearchComponent = render(
      <CitySearch allLocations={allLocations} setCurrentCity={() => {}} />
    );
  });

  test('renders text input', () => {
    const cityTextBox = CitySearchComponent.queryByRole('textbox');
    expect(cityTextBox).toBeInTheDocument();
    expect(cityTextBox).toHaveClass('city');
  });

  test('suggestions list is hidden by default', () => {
    const suggestionList = CitySearchComponent.queryByRole('list');
    expect(suggestionList).not.toBeInTheDocument();
  });

  test('renders a list of suggestions when city textbox gains focus', async () => {
    const user = userEvent.setup();
    const cityTextBox = CitySearchComponent.queryByRole('textbox');
    await user.click(cityTextBox);
    await waitFor(() => {
      const suggestionList = CitySearchComponent.queryByRole('list');
      expect(suggestionList).toBeInTheDocument();
      expect(suggestionList).toHaveClass('suggestions');
    });
  });

  test('updates list of suggestions correctly when user types in city textbox', async () => {
    const user = userEvent.setup();
    const allEvents = await getEvents();
    const allLocations = extractLocations(allEvents);
    CitySearchComponent.rerender(
      <CitySearch allLocations={allLocations} setCurrentCity={() => {}} />
    );

    const cityTextBox = CitySearchComponent.queryByRole('textbox');
    await user.type(cityTextBox, 'Berlin');

    await waitFor(() => {
      const suggestions = allLocations
        ? allLocations.filter(
            location =>
              location.toUpperCase().indexOf(cityTextBox.value.toUpperCase()) >
              -1
          )
        : [];
      const suggestionListItems =
        CitySearchComponent.queryAllByRole('listitem');
      expect(suggestionListItems).toHaveLength(suggestions.length + 1);
      for (let i = 0; i < suggestions.length; i += 1) {
        expect(suggestionListItems[i].textContent).toBe(suggestions[i]);
      }
    });
  });

  test('handles input change when allLocations is undefined', async () => {
    const user = userEvent.setup();
    CitySearchComponent.rerender(
      <CitySearch allLocations={undefined} setCurrentCity={() => {}} />
    );

    const cityTextBox = CitySearchComponent.queryByRole('textbox');
    await user.type(cityTextBox, 'Berlin');

    await waitFor(() => {
      const suggestionListItems =
        CitySearchComponent.queryAllByRole('listitem');
      expect(suggestionListItems).toHaveLength(1);
      expect(suggestionListItems[0].textContent).toBe('See all cities');
    });
  });

  test('renders the suggestion text in the textbox upon clicking on the suggestion', async () => {
    const user = userEvent.setup();
    const allEvents = await getEvents();
    const allLocations = extractLocations(allEvents);

    CitySearchComponent.rerender(
      <CitySearch allLocations={allLocations} setCurrentCity={() => {}} />
    );

    const cityTextBox = CitySearchComponent.queryByRole('textbox');
    await user.type(cityTextBox, 'Berlin');

    await waitFor(() => {
      const BerlinGermanySuggestion =
        CitySearchComponent.queryAllByRole('listitem')[0];
      expect(BerlinGermanySuggestion).toBeInTheDocument();
    });
    const BerlinGermanySuggestion =
      CitySearchComponent.queryAllByRole('listitem')[0];
    await user.click(BerlinGermanySuggestion);

    expect(cityTextBox).toHaveValue(BerlinGermanySuggestion.textContent);
  });

  test('shows only "See all cities" suggestion when typing a non-existent city', async () => {
    const user = userEvent.setup();
    const allEvents = await getEvents();
    const allLocations = extractLocations(allEvents);

    CitySearchComponent.rerender(
      <CitySearch allLocations={allLocations} setCurrentCity={() => {}} />
    );

    const cityTextBox = CitySearchComponent.queryByRole('textbox');
    await user.type(cityTextBox, 'Paris, France');

    await waitFor(() => {
      const suggestionListItems =
        CitySearchComponent.queryAllByRole('listitem');
      expect(suggestionListItems).toHaveLength(1);
      expect(suggestionListItems[0].textContent).toBe('See all cities');
    });
  });
});

describe('<CitySearch /> integration', () => {
  test('renders suggestions list when the app is rendered.', async () => {
    const user = userEvent.setup();
    const AppComponent = render(<App />);
    const AppDOM = AppComponent.container.firstChild;

    const CitySearchDOM = AppDOM.querySelector('#city-search');
    const cityTextBox = within(CitySearchDOM).queryByRole('textbox');
    await user.click(cityTextBox);

    const allEvents = await getEvents();
    const allLocations = extractLocations(allEvents);

    await waitFor(() => {
      const suggestionListItems =
        within(CitySearchDOM).queryAllByRole('listitem');
      expect(suggestionListItems.length).toBe(allLocations.length + 1);
    });
  });
});
