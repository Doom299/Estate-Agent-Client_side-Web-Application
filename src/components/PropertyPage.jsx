import React from "react";
import { useParams, Link } from "react-router-dom";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

function PropertyPage({ properties }) {
  const { id } = useParams();
  const property = properties.find((p) => p.id === id);

  if (!property) return <p>Property not found</p>;

  // Dummy gallery images (replace with your own 6–8 images)
  const images = [
    { original: property.picture, thumbnail: property.picture },
    { original: property.picture, thumbnail: property.picture },
    { original: property.picture, thumbnail: property.picture },
    { original: property.picture, thumbnail: property.picture },
    { original: property.picture, thumbnail: property.picture },
    { original: property.picture, thumbnail: property.picture },
    { original: property.picture, thumbnail: property.picture },
    { original: property.picture, thumbnail: property.picture },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <Link to="/">← Back to Search</Link>
      <h1>
        {property.type} – £{property.price.toLocaleString()}
      </h1>
      <p>{property.location}</p>

      <button
        onClick={() =>
          alert(`You have booked ${property.type} at ${property.location}`)
        }
        style={{
          backgroundColor: "#28a745",
          color: "white",
          border: "none",
          padding: "10px 15px",
          cursor: "pointer",
          marginTop: "15px",
          fontSize: "16px",
        }}
      >
        📅 Book This Property
      </button>

      {/* Image Gallery */}
      <ImageGallery items={images} showPlayButton={false} />

      {/* Tabs */}
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
          {/* Replace with real floor plan image */}
          <img
            src={property.picture}
            alt="Floor Plan"
            width="100%"
            style={{ maxWidth: "600px" }}
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
