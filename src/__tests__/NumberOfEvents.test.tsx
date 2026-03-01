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

    fireEvent.change(inputElement, { target: { value: '10' } });
    await waitFor(() => {
      expect(setCurrentNOE).toHaveBeenCalledWith(10);
    });
  });

  test('sets value to 0 when input is empty or invalid', async () => {
    const setCurrentNOE = jest.fn();
    render(<NumberOfEvents currentNOE={32} setCurrentNOE={setCurrentNOE} />);
    const inputElement = screen.getByRole('spinbutton');

    fireEvent.change(inputElement, { target: { value: '' } });
    await waitFor(() => {
      expect(setCurrentNOE).toHaveBeenCalledWith(0);
    });

    fireEvent.change(inputElement, { target: { value: 'abc' } });
    await waitFor(() => {
      expect(setCurrentNOE).toHaveBeenCalledWith(0);
    });
  });
});

describe('<NumberOfEvents /> integration', () => {
  test('renders default number of events (32) when app loads', async () => {
    const AppComponent = render(<App />);
    const AppDOM = AppComponent.container.firstChild as HTMLElement;

    await waitFor(() => {
      const EventListDOM = AppDOM.querySelector('#event-list') as HTMLElement;
      const EventListItems = within(EventListDOM).queryAllByRole('listitem');
      expect(EventListItems.length).toBeLessThanOrEqual(32);
    });
  });

  test('updates number of events when user changes the input value', async () => {
    const AppComponent = render(<App />);
    const AppDOM = AppComponent.container.firstChild as HTMLElement;

    const NumberOfEventsDOM = AppDOM.querySelector(
      '#number__of__events'
    ) as HTMLElement;
    const numberInput = within(NumberOfEventsDOM).queryByRole('spinbutton')!;

    fireEvent.change(numberInput, { target: { value: '10' } });

    await waitFor(
      () => {
        const EventListDOM = AppDOM.querySelector('#event-list') as HTMLElement;
        const EventListItems = within(EventListDOM).queryAllByRole('listitem');
        expect(EventListItems.length).toBeLessThanOrEqual(10);
      },
      { timeout: 3000 }
    );
  });

  test('displays all available events when user sets a large number', async () => {
    const AppComponent = render(<App />);
    const AppDOM = AppComponent.container.firstChild as HTMLElement;

    const NumberOfEventsDOM = AppDOM.querySelector(
      '#number__of__events'
    ) as HTMLElement;
    const numberInput = within(NumberOfEventsDOM).queryByRole('spinbutton')!;

    fireEvent.change(numberInput, { target: { value: '100' } });

    await waitFor(
      () => {
        const EventListDOM = AppDOM.querySelector('#event-list') as HTMLElement;
        const EventListItems = within(EventListDOM).queryAllByRole('listitem');
        expect(EventListItems.length).toBeLessThanOrEqual(100);
      },
      { timeout: 3000 }
    );
  });
});
