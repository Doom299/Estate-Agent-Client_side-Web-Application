import { useState } from "react";
import propertyData from "./data/properties.json";
import SearchForm from "./components/SearchForm";
import PropertyList from "./components/PropertyList";
import Favourites from "./components/Favourites";

function App() {
  const [properties] = useState(propertyData.properties);
  const [filteredProperties, setFilteredProperties] = useState(
    propertyData.properties
  );
  const [favourites, setFavourites] = useState([]); // Favourites state
  const [draggedProperty, setDraggedProperty] = useState(null); // Track dragged property

  // Convert month name to number
  const monthToNumber = (month) => new Date(`${month} 1, 2000`).getMonth() + 1;

  // FILTER FUNCTION
  const handleFilter = (filters) => {
    const postcodeFilter = filters.postcode.trim().toUpperCase();

    const result = properties.filter((prop) => {
      const propDate = new Date(
        `${prop.added.year}-${monthToNumber(prop.added.month)}-${
          prop.added.day
        }`
      );

      return (
        (!filters.type || prop.type === filters.type) &&
        prop.price >= (filters.minPrice || 0) &&
        prop.price <= (filters.maxPrice || Infinity) &&
        prop.bedrooms >= (filters.minBedrooms || 0) &&
        prop.bedrooms <= (filters.maxBedrooms || Infinity) &&
        (!filters.dateFrom || propDate >= new Date(filters.dateFrom)) &&
        (!filters.dateTo || propDate <= new Date(filters.dateTo)) &&
        (!postcodeFilter ||
          prop.location.toUpperCase().split(" ").includes(postcodeFilter))
      );
    });

    setFilteredProperties(result);
  };

  // ADD TO FAVOURITES (button or drag)
  const addToFavourites = (property) => {
    setFavourites((prev) => {
      if (prev.some((p) => p.id === property.id)) return prev; // prevent duplicates
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

  return (
    <div style={{ padding: "20px" }}>
      <h1>Property Search</h1>

      <div style={{ display: "flex", gap: "20px" }}>
        {/* LEFT SIDE: Search + Property List */}
        <div style={{ flex: 3 }}>
          <SearchForm onFilter={handleFilter} />
          <p>
            Showing <strong>{filteredProperties.length}</strong> properties
          </p>

          <PropertyList
            properties={filteredProperties}
            onAddFavourite={addToFavourites} // Button click adds to favourites
            onDragStart={setDraggedProperty} // Dragging tracks the property
          />
        </div>

        {/* RIGHT SIDE: Favourites Sidebar */}
        <div style={{ flex: 1 }}>
          <Favourites
            favourites={favourites}
            draggedProperty={draggedProperty}
            onDropAdd={(prop) => {
              addToFavourites(prop);
              setDraggedProperty(null); // reset after drop
            }}
            onRemove={removeFromFavourites}
            onClear={clearFavourites}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
