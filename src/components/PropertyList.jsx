import { Link } from "react-router-dom";
import "../styles/PropertyList.css";
import { Heart, Trash2, X, Search } from "lucide-react";
import { useState } from "react";

function PropertyList({
  properties,
  favourites,
  onAddFavourite,
  onRemoveFavourite,
  onDragStart,
  onClearFilters,
}) {
  const [addedNotification, setAddedNotification] = useState(null);

  if (properties.length === 0) {
    return (
      <div className="no-properties-container">
        <div className="no-properties-content">
          <Search size={64} className="no-properties-icon" />
          <h2 className="no-properties-title">No Properties Found</h2>
          <p className="no-properties-text">
            We couldn't find any properties matching your search criteria.
          </p>
          <p className="no-properties-suggestion">
            Try adjusting your filters or search terms to find your dream home.
          </p>
          <button onClick={onClearFilters} className="no-properties-btn">
            Clear Filters & Try Again
          </button>
        </div>
      </div>
    );
  }

  const isFavourite = (propId) => {
    return favourites.some((fav) => fav.id === propId);
  };

  const handleHeartClick = (e, prop) => {
    e.preventDefault();
    e.stopPropagation();
    if (isFavourite(prop.id)) {
      onRemoveFavourite(prop.id);
    } else {
      onAddFavourite(prop);
      setAddedNotification(prop.id);
      setTimeout(() => {
        setAddedNotification(null);
      }, 1500);
    }
  };

  return (
    <div className="property-grid">
      {properties.map((prop) => (
        <div
          key={prop.id}
          className="property-card"
          draggable
          onDragStart={() => onDragStart(prop)}
        >
          <div className="property-image-container">
            <img
              src={`/${prop.picture}`}
              alt={prop.type}
              className="property-image"
            />
            <button
              className={`property-heart-btn ${
                isFavourite(prop.id) ? "active" : ""
              } ${addedNotification === prop.id ? "show-notification" : ""}`}
              onClick={(e) => handleHeartClick(e, prop)}
            >
              <Heart
                fill={isFavourite(prop.id) ? "#ef4444" : "white"}
                color={isFavourite(prop.id) ? "#ef4444" : "#64748b"}
                size={20}
              />
              <span className="added-notification">Added </span>
            </button>
          </div>

          <div className="property-content">
            <h3>
              £{prop.price.toLocaleString()} - {prop.type}
            </h3>

            <p className="property-location">{prop.location}</p>

            <p className="property-meta">
              🛏 {prop.bedrooms} bedrooms • {prop.tenure}
            </p>

            {prop["short-description"] && (
              <p className="property-short-desc">{prop["short-description"]}</p>
            )}

            <div className="property-actions">
              {/* View Details Button using React Router Link */}
              <Link className="details-btn" to={`/property/${prop.id}`}>
                View Details →
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default PropertyList;
