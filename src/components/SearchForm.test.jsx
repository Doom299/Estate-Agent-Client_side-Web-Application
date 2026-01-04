import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SearchForm from './SearchForm';

 test('calls onFilter when search form is submitted', () => {
  const handleFilter = jest.fn();

  render(<SearchForm onFilter={handleFilter} />);

  const input = screen.getByPlaceholderText(/Enter location, postcode, or property description/i);
  fireEvent.change(input, { target: { value: 'London' } });

  const submitButton = screen.getByRole('button', { name: /Search/i });
  fireEvent.click(submitButton);

  expect(handleFilter).toHaveBeenCalledTimes(1);
  expect(handleFilter.mock.calls[0][0]).toMatchObject({ searchQuery: 'London' });
});

 test('clears filters when Clear All Filters clicked', () => {
  const handleFilter = jest.fn();

  render(<SearchForm onFilter={handleFilter} />);

  // open advanced filters so the clear button appears
  const toggleButton = screen.getByRole('button', { name: /Show Filters/i });
  fireEvent.click(toggleButton);

  const clearButton = screen.getByRole('button', { name: /Clear All Filters/i });
  fireEvent.click(clearButton);

  // last call should be with cleared filters
  const lastCallArgs = handleFilter.mock.calls[handleFilter.mock.calls.length - 1][0];
  expect(lastCallArgs).toMatchObject({
    type: '',
    minPrice: '',
    maxPrice: '',
    minBedrooms: '',
    maxBedrooms: '',
    postcode: '',
    searchQuery: '',
  });
});
