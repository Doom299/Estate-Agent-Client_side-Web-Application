import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import PropertyList from './PropertyList';

const renderWithRouter = (ui) =>
  render(<BrowserRouter>{ui}</BrowserRouter>);

test('shows "No Properties Found" when list is empty', () => {
  renderWithRouter(
    <PropertyList
      properties={[]}
      favourites={[]}
      onAddFavourite={() => {}}
      onRemoveFavourite={() => {}}
      onDragStart={() => {}}
      onClearFilters={() => {}}
    />
  );

  expect(screen.getByText(/No Properties Found/i)).toBeInTheDocument();
});

test('renders a property card when there is a property', () => {
  const fakeProperty = {
    id: 1,
    picture: 'images/prop1/house.jpg',
    type: 'House',
    price: 250000,
    location: 'London',
    bedrooms: 3,
    tenure: 'Freehold',
    'short-description': 'Nice house',
  };

  renderWithRouter(
    <PropertyList
      properties={[fakeProperty]}
      favourites={[]}
      onAddFavourite={() => {}}
      onRemoveFavourite={() => {}}
      onDragStart={() => {}}
      onClearFilters={() => {}}
    />
  );

  expect(
    screen.getByText(/£250,000 - House/i)
  ).toBeInTheDocument();
  expect(screen.getByText(/London/)).toBeInTheDocument();
});