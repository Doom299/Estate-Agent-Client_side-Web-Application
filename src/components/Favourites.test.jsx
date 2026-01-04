import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Favourites from './Favourites';

const sampleProperty = {
  id: 1,
  type: 'House',
  price: 250000,
};

 test('shows message when no favourites', () => {
  render(
    <Favourites
      favourites={[]}
      draggedProperty={null}
      onDropAdd={jest.fn()}
      onRemove={jest.fn()}
      onClear={jest.fn()}
    />
  );

  expect(screen.getAllByText(/No favourites yet|Drag properties here to add favourites/i).length).toBeGreaterThan(0);
});

 test('calls onClear when Clear All clicked (desktop view)', () => {
  const handleClear = jest.fn();

  render(
    <Favourites
      favourites={[sampleProperty]}
      draggedProperty={null}
      onDropAdd={jest.fn()}
      onRemove={jest.fn()}
      onClear={handleClear}
    />
  );

  const clearButtons = screen.getAllByRole('button', { name: /Clear All/i });
  fireEvent.click(clearButtons[0]);

  expect(handleClear).toHaveBeenCalled();
});
