import { Link } from "react-router-dom";

function PropertyList({ properties, onAddFavourite, onDragStart }) {
  if (properties.length === 0) return <p>No properties found.</p>;

  return (
    <div>
      {properties.map((prop) => (
        <div
          key={prop.id}
          draggable
          onDragStart={() => onDragStart(prop)} // Track drag start
          style={{
            border: "1px solid #ccc",
            margin: "10px",
            padding: "10px",
          }}
        >
          <h3>
            <a href={prop.url}>
              {prop.type} – £{prop.price.toLocaleString()}
            </a>
          </h3>
          <p>
            {prop.bedrooms} bedrooms | {prop.tenure}
          </p>
          <p>{prop.location}</p>
          <p>
            Added: {prop.added.day} {prop.added.month} {prop.added.year}
          </p>
          <img src={prop.picture} alt={prop.type} width="200" />
          <p>{prop.description}</p>

          {/* ❤️ Button to add directly to favourites */}
          <button
            onClick={() => onAddFavourite(prop)} // Add property to favourites
            style={{
              backgroundColor: "#ff6666",
              color: "white",
              border: "none",
              padding: "5px 10px",
              cursor: "pointer",
              marginTop: "10px",
            }}
          >
            ❤️ Add to Favourites
          </button>

          <Link to={`/property/${prop.id}`}>
            <button
              style={{
                backgroundColor: "#007bff",
                color: "white",
                border: "none",
                padding: "5px 10px",
                cursor: "pointer",
              }}
            >
              🔍 View Details
            </button>
          </Link>
        </div>
      ))}
    </div>
  );
}

export default PropertyList;
