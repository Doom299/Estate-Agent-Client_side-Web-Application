import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import Header from './Header';

const renderWithRouter = (ui) => render(<BrowserRouter>{ui}</BrowserRouter>);

test('renders app title and home link', () => {
  renderWithRouter(<Header />);

  const title = screen.getByText(/Estate Agent App/i);
  expect(title).toBeInTheDocument();
  expect(title.closest('a')).toHaveAttribute('href', '/');
});
