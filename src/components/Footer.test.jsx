import React from 'react';
import { render, screen } from '@testing-library/react';
import Footer from './Footer';

test('renders footer brand and quick links', () => {
  render(<Footer />);

  // Brand title: use heading role so we only match the h3
  const brandHeading = screen.getByRole('heading', { name: /Estate Agent App/i });
  expect(brandHeading).toBeInTheDocument();

  expect(screen.getByText(/Your trusted partner in finding the perfect property/i)).toBeInTheDocument();

  // Quick links
  expect(screen.getByRole('link', { name: /Search Properties/i })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /About Us/i })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /Privacy Policy/i })).toBeInTheDocument();
});
