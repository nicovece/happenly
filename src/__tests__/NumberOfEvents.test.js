import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import NumberOfEvents from '../components/NumberOfEvents';

describe('<NumberOfEvents /> component', () => {
  test('contains a number input element', () => {
    render(<NumberOfEvents />);
    const inputElement = screen.getByRole('spinbutton');
    expect(inputElement).toBeInTheDocument();
  });

  test('number input should have a default value of 32', () => {
    render(<NumberOfEvents />);
    const inputElement = screen.getByRole('spinbutton');
    expect(inputElement).toHaveValue(32);
  });

  test('value changes when user types in the input field', async () => {
    render(<NumberOfEvents />);
    const inputElement = screen.getByRole('spinbutton');
    const user = userEvent.setup();
    
    await user.type(inputElement, '{backspace}{backspace}10');
    
    expect(inputElement).toHaveValue(10);
  });
});