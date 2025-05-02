import React from 'react';
import { render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { getEvents } from '../api';
import Event from '../components/Event';

describe('<Event /> component', () => {
  let EventComponent;
  let allEvents;
  beforeEach(async () => {
    allEvents = await getEvents();
    EventComponent = render(<Event event={allEvents[0]} />);
  });

  test('renders event title', () => {
    expect(
      EventComponent.queryByText(allEvents[0].summary)
    ).toBeInTheDocument();
  });

  test('renders event location', () => {
    expect(
      EventComponent.queryByText(allEvents[0].location)
    ).toBeInTheDocument();
  });

  test('renders event date', () => {
    const formattedDate = new Date(allEvents[0].created).toUTCString();
    expect(EventComponent.queryByText(formattedDate)).toBeInTheDocument();
  });

  test('renders event details button', () => {
    expect(EventComponent.queryByText('show details')).toBeInTheDocument();
  });

  test('event details are hidden by default', () => {
    expect(
      EventComponent.queryByText(allEvents[0].description)
    ).not.toBeInTheDocument();
  });

  test('event details are shown when button is clicked', async () => {
    const user = userEvent.setup();
    const detailsButton = EventComponent.queryByText('show details');
    await user.click(detailsButton);
    await waitFor(() => {
      expect(
        EventComponent.container.querySelector('.details')
      ).toBeInTheDocument();
      expect(EventComponent.queryByText('hide details')).toBeInTheDocument();
      expect(
        EventComponent.queryByText('show details')
      ).not.toBeInTheDocument();
    });
  });

  test('event details are hidden when button is clicked again', async () => {
    const user = userEvent.setup();
    const detailsButton = EventComponent.queryByText('show details');
    await user.click(detailsButton);
    await user.click(detailsButton);
    await waitFor(() => {
      expect(
        EventComponent.container.querySelector('.details')
      ).not.toBeInTheDocument();
      expect(EventComponent.queryByText('show details')).toBeInTheDocument();
      expect(
        EventComponent.queryByText('hide details')
      ).not.toBeInTheDocument();
    });
  });
});
