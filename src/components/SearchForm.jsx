import { useState } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../styles/SearchForm.css";

function SearchForm({ onFilter }) {
  const [filters, setFilters] = useState({
    type: "",
    minPrice: "",
    maxPrice: "",
    minBedrooms: "",
    maxBedrooms: "",
    dateFrom: null,
    dateTo: null,
    postcode: "",
    searchQuery: "",
  });

  const [isExpanded, setIsExpanded] = useState(false);

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onFilter(filters);
  };

  const handleClearFilters = () => {
    const clearedFilters = {
      type: "",
      minPrice: "",
      maxPrice: "",
      minBedrooms: "",
      maxBedrooms: "",
      dateFrom: null,
      dateTo: null,
      postcode: "",
      searchQuery: "",
    };
    setFilters(clearedFilters);
    onFilter(clearedFilters);
  };

  const handleDateChange = (date, fieldName) => {
    setFilters({ ...filters, [fieldName]: date });
  };

  const toggleFilters = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <div className="search-header">
        <h2>Search Properties</h2>
      </div>

      {/* Main Search Bar - Always Visible */}
      <div className="main-search-bar">
        <div className="form-group search-query-input">
          <input
            type="text"
            name="searchQuery"
            placeholder="Search by location or description..."
            value={filters.searchQuery}
            onChange={handleChange}
          />
        </div>
        <button className="filter-btn" type="submit">
          <Search size={18} /> Search
        </button>
        <button
          type="button"
          className="toggle-filters-btn"
          onClick={toggleFilters}
          title={isExpanded ? "Hide Filters" : "Show Filters"}
        >
          {isExpanded ? <X size={20} /> : <SlidersHorizontal size={20} />}
        </button>
      </div>

      {/* Advanced Filters - Collapsible */}
      {isExpanded && (
        <div className="advanced-filters">
          <div className="form-grid">
            <div className="form-group">
              <label>Property Type</label>
              <select name="type" value={filters.type} onChange={handleChange}>
                <option value="">Any</option>
                <option value="House">House</option>
                <option value="Flat">Flat</option>
              </select>
            </div>

            <div className="form-group">
              <label>Min Price (£)</label>
              <input
                type="number"
                name="minPrice"
                value={filters.minPrice}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Max Price (£)</label>
              <input
                type="number"
                name="maxPrice"
                value={filters.maxPrice}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Min Bedrooms</label>
              <input
                type="number"
                name="minBedrooms"
                value={filters.minBedrooms}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Max Bedrooms</label>
              <input
                type="number"
                name="maxBedrooms"
                value={filters.maxBedrooms}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Date From</label>
              <DatePicker
                selected={filters.dateFrom}
                onChange={(date) => handleDateChange(date, "dateFrom")}
                dateFormat="dd/MM/yyyy"
                placeholderText="dd/MM/yyyy"
                className="date-picker-input"
                calendarClassName="custom-calendar"
              />
            </div>

            <div className="form-group">
              <label>Date To</label>
              <DatePicker
                selected={filters.dateTo}
                onChange={(date) => handleDateChange(date, "dateTo")}
                dateFormat="dd/MM/yyyy"
                placeholderText="dd/MM/yyyy"
                className="date-picker-input"
                calendarClassName="custom-calendar"
                minDate={filters.dateFrom}
              />
            </div>

            <div className="form-group">
              <label>Postcode Area</label>
              <input
                type="text"
                name="postcode"
                placeholder="e.g., BR1, BR5"
                value={filters.postcode}
                onChange={handleChange}
              />
            </div>
          </div>

          <button
            type="button"
            className="clear-filters-btn"
            onClick={handleClearFilters}
          >
            <X size={16} /> Clear All Filters
          </button>
        </div>
      )}
    </form>
  );
}

export default SearchForm;
