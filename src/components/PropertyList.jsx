function PropertyList({ properties }) {
  if (properties.length === 0) {
    return <p>No properties found.</p>;
  }

  return (
    <div>
      {properties.map((prop) => (
        <div
          key={prop.id}
          style={{ border: "1px solid #ccc", margin: "10px", padding: "10px" }}
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
        </div>
      ))}
    </div>
  );
}

export default PropertyList;
