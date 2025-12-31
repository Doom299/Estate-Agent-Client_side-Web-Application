import { useState } from "react";
import propertyData from "./data/properties.json";
import SearchForm from "./components/SearchForm";
import PropertyList from "./components/PropertyList";

function App() {
  const [properties] = useState(propertyData.properties);
  const [filteredProperties, setFilteredProperties] = useState(
    propertyData.properties
  );

  const monthToNumber = (month) => new Date(`${month} 1, 2000`).getMonth() + 1;

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

  return (
    <div>
      <h1>Property Search</h1>

      <SearchForm onFilter={handleFilter} />

      {/* PROPERTY COUNT */}
      <p>
        <strong>Showing {filteredProperties.length} properties</strong>
      </p>

      <PropertyList properties={filteredProperties} />
    </div>
  );
}

export default App;
