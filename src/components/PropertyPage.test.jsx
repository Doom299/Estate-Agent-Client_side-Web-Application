import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import PropertyPage from './PropertyPage';

// Mock heavy UI libraries to keep tests simple
jest.mock('react-image-gallery', () => () => <div data-testid="image-gallery" />);

jest.mock('react-tabs', () => {
  const React = require('react');
  const Tabs = ({ children }) => <div>{children}</div>;
  const TabList = ({ children }) => <div>{children}</div>;
  const Tab = ({ children }) => <button>{children}</button>;
  const TabPanel = ({ children }) => <div>{children}</div>;
  return { __esModule: true, Tabs, TabList, Tab, TabPanel };
});

jest.mock('react-router-dom', () => {
  const actual = jest.requireActual('react-router-dom');
  return {
    __esModule: true,
    ...actual,
    useParams: () => ({ id: '1' }),
  };
});

const renderWithRouter = (ui) => render(<BrowserRouter>{ui}</BrowserRouter>);

const baseProperty = {
  id: '1',
  type: 'House',
  price: 300000,
  location: 'London',
  bedrooms: 3,
  tenure: 'Freehold',
  description: 'Nice house in London',
  picture: 'images/prop1/house.jpg',
};

 test('shows "Property not found" when id does not match', () => {
  // empty properties array so nothing matches id
  renderWithRouter(
    <PropertyPage
      properties={[]}
      favourites={[]}
      onAddFavourite={jest.fn()}
      onRemoveFavourite={jest.fn()}
    />
  );

  expect(screen.getByText(/Property not found/i)).toBeInTheDocument();
});

 test('renders property details when property exists', () => {
  renderWithRouter(
    <PropertyPage
      properties={[baseProperty]}
      favourites={[]}
      onAddFavourite={jest.fn()}
      onRemoveFavourite={jest.fn()}
    />
  );

  expect(screen.getByText(/House – £300,000/i)).toBeInTheDocument();
    // More specific: location paragraph has class "property-location"
    const locationElement = screen.getByText(/^London$/i);
    expect(locationElement).toBeInTheDocument();
  expect(screen.getByTestId('image-gallery')).toBeInTheDocument();
});
