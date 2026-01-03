import { Link } from "react-router-dom";
import "../styles/PropertyList.css";
import { Heart, Trash2, X } from "lucide-react";
import { useState } from "react";

function PropertyList({
  properties,
  favourites,
  onAddFavourite,
  onRemoveFavourite,
  onDragStart,
}) {
  const [addedNotification, setAddedNotification] = useState(null);

  if (properties.length === 0) {
    return <p>No properties found.</p>;
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
