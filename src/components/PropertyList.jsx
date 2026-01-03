import { Link } from "react-router-dom";
import "../styles/PropertyList.css";

function PropertyList({ properties, onAddFavourite, onDragStart }) {
  if (properties.length === 0) {
    return <p>No properties found.</p>;
  }

  return (
    <div className="property-grid">
      {properties.map((prop) => (
        <div
          key={prop.id}
          className="property-card"
          draggable
          onDragStart={() => onDragStart(prop)}
        >
          <img
            src={`/${prop.picture}`}
            alt={prop.type}
            className="property-image"
          />

          <div className="property-content">
            <h3>
              £{prop.price.toLocaleString()}
              <span>{prop.type}</span>
            </h3>

            <p className="property-location">{prop.location}</p>

            <p className="property-meta">
              🛏 {prop.bedrooms} bedrooms • {prop.tenure}
            </p>

            <div className="property-actions">
              {/* Add to Favourites Button */}
              <button className="fav-btn" onClick={() => onAddFavourite(prop)}>
                ❤️ Favourite
              </button>

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
