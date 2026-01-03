import "../styles/Favourites.css";

function Favourites({
  favourites,
  draggedProperty,
  onDropAdd,
  onRemove,
  onClear,
}) {
  return (
    <aside
      className="favourites-container"
      onDragOver={(e) => e.preventDefault()}
      onDrop={() => {
        if (draggedProperty) onDropAdd(draggedProperty);
      }}
    >
      <h2 className="favourites-header">
        Favourites
        <span className="favourites-count">{favourites.length}</span>
      </h2>

      {favourites.length === 0 && (
        <p className="favourites-empty">
          Drag properties here to add favourites
        </p>
      )}

      {favourites.map((prop) => (
        <div
          key={prop.id}
          draggable
          onDragStart={() => {
            // Start drag to remove
            draggedProperty = prop;
          }}
          onDragEnd={() => onRemove(prop.id)}
          className="favourite-item"
        >
          <p className="favourite-title">
            {prop.type} – £{prop.price.toLocaleString()}
          </p>
          <button className="remove-btn" onClick={() => onRemove(prop.id)}>
            ❌ Remove
          </button>
        </div>
      ))}

      {favourites.length > 0 && (
        <button className="clear-btn" onClick={onClear}>
          🗑 Clear All
        </button>
      )}
    </aside>
  );
}

export default Favourites;
