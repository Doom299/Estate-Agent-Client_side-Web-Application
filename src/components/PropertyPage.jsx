import React from "react";
import { useParams, Link } from "react-router-dom";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

function PropertyPage({
  properties,
  favourites,
  onAddFavourite,
  onRemoveFavourite,
}) {
  const { id } = useParams();
  const property = properties.find((p) => p.id === id);

  if (!property) return <p>Property not found</p>;

  const isFavourite = favourites.some((p) => p.id === property.id);

  // Gallery images (duplicate placeholder for now)
  const images = Array(8).fill({
    original: property.picture,
    thumbnail: property.picture,
  });

  return (
    <div style={{ padding: "20px" }}>
      <Link to="/">← Back to Search</Link>

      <h1>
        {property.type} – £{property.price.toLocaleString()}
      </h1>
      <p>{property.location}</p>

      {/* ACTION BUTTONS */}
      <div style={{ display: "flex", gap: "15px", marginBottom: "20px" }}>
        {/* BOOK BUTTON */}
        <button
          onClick={() =>
            alert(`You have booked ${property.type} at ${property.location}`)
          }
          style={{
            backgroundColor: "#28a745",
            color: "white",
            border: "none",
            padding: "10px 16px",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          📅 Book This Property
        </button>

        {/* FAVOURITE TOGGLE BUTTON */}
        <button
          onClick={() =>
            isFavourite
              ? onRemoveFavourite(property.id)
              : onAddFavourite(property)
          }
          style={{
            backgroundColor: isFavourite ? "#dc3545" : "#ff9800",
            color: "white",
            border: "none",
            padding: "10px 16px",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          {isFavourite ? "💔 Remove from Favourites" : "❤️ Add to Favourites"}
        </button>
      </div>

      {/* IMAGE GALLERY */}
      <ImageGallery items={images} showPlayButton={false} />

      {/* TABS */}
      <Tabs>
        <TabList>
          <Tab>Description</Tab>
          <Tab>Floor Plan</Tab>
          <Tab>Google Map</Tab>
        </TabList>

        <TabPanel>
          <h3>Full Description</h3>
          <p>{property.description}</p>
        </TabPanel>

        <TabPanel>
          <h3>Floor Plan</h3>
          <img
            src={property.picture}
            alt="Floor Plan"
            style={{ maxWidth: "600px", width: "100%" }}
          />
        </TabPanel>

        <TabPanel>
          <h3>Location Map</h3>
          <iframe
            title="Google Map"
            width="100%"
            height="400"
            style={{ border: 0 }}
            loading="lazy"
            allowFullScreen
            src={`https://www.google.com/maps?q=${encodeURIComponent(
              property.location
            )}&output=embed`}
          />
        </TabPanel>
      </Tabs>
    </div>
  );
}

export default PropertyPage;
