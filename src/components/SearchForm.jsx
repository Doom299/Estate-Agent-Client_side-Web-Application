import { useState } from "react";

function SearchForm({ onFilter }) {
  const [filters, setFilters] = useState({
    type: "",
    minPrice: "",
    maxPrice: "",
    minBedrooms: "",
    maxBedrooms: "",
    dateFrom: "",
    dateTo: "",
    postcode: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onFilter(filters);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Property Type
        <select name="type" value={filters.type} onChange={handleChange}>
          <option value="">Any</option>
          <option value="House">House</option>
          <option value="Flat">Flat</option>
        </select>
      </label>

      <label>
        Minimum Price
        <input type="number" name="minPrice" onChange={handleChange} />
      </label>

      <label>
        Maximum Price
        <input type="number" name="maxPrice" onChange={handleChange} />
      </label>

      <label>
        Minimum Bedrooms
        <input type="number" name="minBedrooms" onChange={handleChange} />
      </label>

      <label>
        Maximum Bedrooms
        <input type="number" name="maxBedrooms" onChange={handleChange} />
      </label>

      <label>
        Date From
        <input type="date" name="dateFrom" onChange={handleChange} />
      </label>

      <label>
        Date To
        <input type="date" name="dateTo" onChange={handleChange} />
      </label>

      <label>
        Postcode Area (e.g. BR5)
        <input
          type="text"
          name="postcode"
          placeholder="BR5"
          onChange={handleChange}
        />
      </label>

      <button type="submit">Filter</button>
    </form>
  );
}

export default SearchForm;
