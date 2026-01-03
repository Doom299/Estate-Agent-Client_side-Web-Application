import React from "react";
import { useParams, Link } from "react-router-dom";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import "../styles/PropertyPage.css";

function PropertyPage({
  properties,
  favourites,
  onAddFavourite,
  onRemoveFavourite,
}) {
  const { id } = useParams();
  const property = properties.find((p) => p.id === id);

  if (!property) return <p className="not-found">Property not found</p>;

  const isFavourite = favourites.some((p) => p.id === property.id);

  const images = property.gallery
    ? property.gallery.map((img) => ({
        original: `/${img}`,
        thumbnail: `/${img}`,
      }))
    : [
        {
          original: `/${property.picture}`,
          thumbnail: `/${property.picture}`,
        },
      ];

  return (
    <div className="property-page">
      <Link to="/" className="back-link">
        ← Back to Search
      </Link>

      <h1 className="property-title">
        {property.type} – £{property.price.toLocaleString()}
      </h1>
      <p className="property-location">{property.location}</p>

      {/* ACTION BUTTONS */}
      <div className="action-buttons">
        <button
          className="book-btn"
          onClick={() =>
            alert(`You have booked ${property.type} at ${property.location}`)
          }
        >
          📅 Book This Property
        </button>

        <button
          className={`fav-toggle-btn ${isFavourite ? "remove" : "add"}`}
          onClick={() =>
            isFavourite
              ? onRemoveFavourite(property.id)
              : onAddFavourite(property)
          }
        >
          {isFavourite ? "💔 Remove from Favourites" : "❤️ Add to Favourites"}
        </button>
      </div>

      {/* IMAGE GALLERY */}
      <div className="gallery-wrapper">
        <ImageGallery items={images} showPlayButton={false} />
      </div>

      {/* TABS */}
      <Tabs className="property-tabs">
        <TabList>
          <Tab>Description</Tab>
          <Tab>Floor Plan</Tab>
          <Tab>Google Map</Tab>
        </TabList>

        <TabPanel>
          <p className="description-text">{property.description}</p>
        </TabPanel>

        <TabPanel>
          {property.floorPlan ? (
            <img
              src={`/${property.floorPlan}`}
              alt="Floor Plan"
              className="floor-plan"
            />
          ) : (
            <p>No floor plan available.</p>
          )}
        </TabPanel>

        <TabPanel>
          <iframe
            title="Google Map"
            className="map-frame"
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
