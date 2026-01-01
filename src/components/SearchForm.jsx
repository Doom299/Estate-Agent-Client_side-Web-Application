import { useState } from "react";
import "../styles/SearchForm.css";

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
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onFilter(filters);
  };

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <h2>Search Properties</h2>

      <div className="form-grid">
        <div className="form-group">
          <label>Property Type</label>
          <select name="type" onChange={handleChange}>
            <option value="">Any</option>
            <option value="House">House</option>
            <option value="Flat">Flat</option>
          </select>
        </div>

        <div className="form-group">
          <label>Min Price (£)</label>
          <input type="number" name="minPrice" onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Max Price (£)</label>
          <input type="number" name="maxPrice" onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Min Bedrooms</label>
          <input type="number" name="minBedrooms" onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Max Bedrooms</label>
          <input type="number" name="maxBedrooms" onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Date From</label>
          <input type="date" name="dateFrom" onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Date To</label>
          <input type="date" name="dateTo" onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>
            Postcode Area <span>(e.g. BR1, BR5)</span>
          </label>
          <input
            type="text"
            name="postcode"
            placeholder="BR1"
            onChange={handleChange}
          />
        </div>
      </div>

      <button className="filter-btn" type="submit">
        🔍 Filter Properties
      </button>
    </form>
  );
}

export default SearchForm;
