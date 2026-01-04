import { useEffect, useState } from "react";
import propertyData from "./data/properties.json";
import SearchForm from "./components/SearchForm";
import PropertyList from "./components/PropertyList";
import Favourites from "./components/Favourites";
import { Routes, Route, useLocation } from "react-router-dom";
import PropertyPage from "./components/PropertyPage";
import Header from "./components/Header";
import Footer from "./components/Footer";
import "./App.css";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);

  return null;
}

function App() {
  const [properties] = useState(propertyData.properties);
  const [filteredProperties, setFilteredProperties] = useState(properties);
  const [favourites, setFavourites] = useState([]);
  const [draggedProperty, setDraggedProperty] = useState(null);

  // Convert month name to number
  const monthToNumber = (month) => new Date(`${month} 1, 2000`).getMonth() + 1;

  // FILTER FUNCTION
  const handleFilter = (filters) => {
    const searchText = (filters.searchQuery || "").trim().toUpperCase();

    // Postcode search: only use the part after the last space.
    const rawPostcode = (filters.postcode || "").trim().toUpperCase();
    let postcodeText = "";
    if (rawPostcode) {
      const parts = rawPostcode.split(/\s+/);
      const lastToken = parts[parts.length - 1];
      const postcodePattern = /^[A-Z]{2}\d{1,2}$/;

      if (postcodePattern.test(lastToken)) {
        postcodeText = lastToken;
      } else {
        // User typed words but not a valid postcode area → no matches
        setFilteredProperties([]);
        return;
      }
    }

    const result = properties.filter((prop) => {
      const propDate = new Date(
        `${prop.added.year}-${monthToNumber(prop.added.month)}-${
          prop.added.day
        }`
      );

      // Check if search text matches location OR description
      const matchesSearch =
        !searchText ||
        prop.location.toUpperCase().includes(searchText) ||
        prop.description.toUpperCase().includes(searchText);

      // Check if postcode matches location
      const matchesPostcode =
        !postcodeText || prop.location.toUpperCase().includes(postcodeText);

      return (
        (!filters.type || prop.type === filters.type) &&
        prop.price >= (filters.minPrice || 0) &&
        prop.price <= (filters.maxPrice || Infinity) &&
        prop.bedrooms >= (filters.minBedrooms || 0) &&
        prop.bedrooms <= (filters.maxBedrooms || Infinity) &&
        (!filters.dateFrom || propDate >= new Date(filters.dateFrom)) &&
        (!filters.dateTo || propDate <= new Date(filters.dateTo)) &&
        matchesSearch &&
        matchesPostcode
      );
    });

    setFilteredProperties(result);
  };

  // ADD TO FAVOURITES (button or drag)
  const addToFavourites = (property) => {
    setFavourites((prev) => {
      if (prev.some((p) => p.id === property.id)) return prev;
      return [...prev, property];
    });
  };

  // REMOVE ONE FAVOURITE
  const removeFromFavourites = (id) => {
    setFavourites((prev) => prev.filter((p) => p.id !== id));
  };

  // CLEAR ALL FAVOURITES
  const clearFavourites = () => {
    setFavourites([]);
  };

  // CLEAR ALL FILTERS
  const clearFilters = () => {
    setFilteredProperties(properties);
  };

  return (
    <div className="page-shell">
      <ScrollToTop />
      <Header />

      <main className="app-container">
        <Routes>
          <Route
            path="/"
            element={
              <div className="home-page">
                {/* Search Box */}
                <div className="search-section">
                  <SearchForm onFilter={handleFilter} />
                  <p className="results-count">
                    Showing <strong>{filteredProperties.length}</strong>{" "}
                    properties
                  </p>
                </div>

                {/* Property List + Favourites side by side */}
                <div className="content-section">
                  <div className="propertylist-column">
                    <PropertyList
                      properties={filteredProperties}
                      favourites={favourites}
                      onAddFavourite={addToFavourites}
                      onRemoveFavourite={removeFromFavourites}
                      onDragStart={setDraggedProperty}
                      onClearFilters={clearFilters}
                    />
                  </div>

                  <div className="favourites-column">
                    <Favourites
                      favourites={favourites}
                      draggedProperty={draggedProperty}
                      onDropAdd={(prop) => {
                        addToFavourites(prop);
                        setDraggedProperty(null);
                      }}
                      onRemove={removeFromFavourites}
                      onClear={clearFavourites}
                    />
                  </div>
                </div>
              </div>
            }
          />

          <Route
            path="/property/:id"
            element={
              <PropertyPage
                properties={properties}
                favourites={favourites}
                onAddFavourite={addToFavourites}
                onRemoveFavourite={removeFromFavourites}
              />
            }
          />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
