import {
  render,
  waitFor,
  within,
  act,
  RenderResult,
} from '@testing-library/react';
import EventList from '../components/EventList';
import { getEvents } from '../api';
import App from '../App';

async function renderApp() {
  let result: ReturnType<typeof render>;
  await act(async () => {
    result = render(<App />);
  });
  const AppDOM = result!.container.firstChild as HTMLElement;
  await waitFor(
    () => {
      expect(
        AppDOM.querySelector('.charts-container')?.children.length
      ).toBeGreaterThan(0);
    },
    { timeout: 5000 }
  );
  return AppDOM;
}

describe('<EventList /> component', () => {
  let EventListComponent: RenderResult;
  beforeEach(() => {
    EventListComponent = render(<EventList />);
  });

  test('has an element with "list" role', () => {
    expect(EventListComponent.queryByRole('list')).toBeInTheDocument();
  });

  test('renders correct number of events', async () => {
    const allEvents = await getEvents();
    EventListComponent.rerender(<EventList events={allEvents} />);
    await waitFor(() => {
      expect(EventListComponent.getAllByRole('listitem')).toHaveLength(
        allEvents.length
      );
    });
  });
});

describe('<EventList /> integration', () => {
  test('renders a list of 32 events when the app is mounted and rendered', async () => {
    const AppDOM = await renderApp();
    await waitFor(
      () => {
        const EventListDOM = AppDOM.querySelector('#event-list') as HTMLElement;
        const EventListItems = within(EventListDOM).queryAllByRole('listitem');
        expect(EventListItems.length).toBe(32);
      },
      { timeout: 5000 }
    );
  });
});
