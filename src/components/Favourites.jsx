function Favourites({
  favourites,
  draggedProperty,
  onDropAdd,
  onRemove,
  onClear,
}) {
  return (
    <aside
      onDragOver={(e) => e.preventDefault()} // allow drop
      onDrop={() => {
        if (draggedProperty) onDropAdd(draggedProperty);
      }}
      style={{
        border: "2px solid #333",
        padding: "10px",
        width: "300px",
        minHeight: "200px",
      }}
    >
      <h2>
        Favourites
        <span
          style={{
            backgroundColor: "red",
            color: "white",
            borderRadius: "50%",
            padding: "4px 8px",
            marginLeft: "10px",
          }}
        >
          {favourites.length}
        </span>
      </h2>

      {favourites.length === 0 && <p>Drag properties here to add favourites</p>}

      {favourites.map((prop) => (
        <div
          key={prop.id}
          draggable
          onDragStart={() => {
            // Start drag to remove
            draggedProperty = prop;
          }}
          onDragEnd={() => onRemove(prop.id)}
          style={{
            border: "1px solid #aaa",
            marginBottom: "5px",
            padding: "5px",
          }}
        >
          <p>
            {prop.type} – £{prop.price.toLocaleString()}
          </p>
          <button onClick={() => onRemove(prop.id)}>❌ Remove</button>
        </div>
      ))}

      {favourites.length > 0 && (
        <button onClick={onClear} style={{ marginTop: "10px" }}>
          🗑 Clear All
        </button>
      )}
    </aside>
  );
}

export default Favourites;
