import { useState, useEffect } from "react";
import { Heart, Trash2, X } from "lucide-react";
import "../styles/Favourites.css";

function Favourites({
  favourites,
  draggedProperty,
  onDropAdd,
  onRemove,
  onClear,
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAtBottom, setIsAtBottom] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      
      // Check if near bottom (within 100px)
      const nearBottom = windowHeight + scrollTop >= documentHeight - 100;
      setIsAtBottom(nearBottom);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleFloatingDrop = (e) => {
    e.preventDefault();
    if (draggedProperty) {
      onDropAdd(draggedProperty);
      setIsModalOpen(true); // Open modal to show the added favorite
    }
  };

  const handleFloatingDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <>
      {/* Floating Heart Button - Mobile Only */}
      <button
        className={`floating-heart-btn ${isAtBottom ? 'hidden' : ''}`}
        onClick={toggleModal}
        onDragOver={handleFloatingDragOver}
        onDrop={handleFloatingDrop}
      >
        <Heart fill="white" size={28} />
        {favourites.length > 0 && (
          <span className="floating-badge">{favourites.length}</span>
        )}
      </button>

      {/* Modal Overlay - Mobile Only */}
      {isModalOpen && (
        <div className="favourites-modal-overlay" onClick={toggleModal}>
          <div
            className="favourites-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <h2 className="favourites-header">
                <Heart size={20} className="header-icon" /> Favourites 
                <span className="favourites-count">{favourites.length}</span>
              </h2>
              <button className="close-modal-btn" onClick={toggleModal}>
                <X size={20} />
              </button>
            </div>

            <div className="modal-body">
              {favourites.length === 0 && (
                <p className="favourites-empty">
                  Drag properties to the <Heart size={16} className="inline-icon" /> icon to add favourites
                </p>
              )}

              {favourites.map((prop) => (
                <div 
                  key={prop.id} 
                  className="favourite-item"
                  draggable
                  onDragStart={(e) => {
                    e.dataTransfer.effectAllowed = "move";
                    e.currentTarget.classList.add("dragging");
                  }}
                  onDragEnd={(e) => {
                    e.currentTarget.classList.remove("dragging");
                    // Check if dragged outside modal
                    const modalContent = document.querySelector(".favourites-modal-content");
                    const rect = modalContent.getBoundingClientRect();
                    if (
                      e.clientX < rect.left ||
                      e.clientX > rect.right ||
                      e.clientY < rect.top ||
                      e.clientY > rect.bottom
                    ) {
                      onRemove(prop.id);
                    }
                  }}
                >
                  <p className="favourite-title">
                    {prop.type} – £{prop.price.toLocaleString()}
                  </p>
                  <button className="remove-btn" onClick={() => onRemove(prop.id)}>
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}

              {favourites.length > 0 && (
                <button className="clear-btn" onClick={onClear}>
                  <Trash2 size={16} /> Clear All
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Bottom Favourites Box - Mobile Only */}
      {isAtBottom && (
        <div className="bottom-favourites-box">
          <div className="bottom-favourites-header">
            <h3>
              <Heart size={18} /> Favourites
              <span className="favourites-count">{favourites.length}</span>
            </h3>
          </div>
          <div className="bottom-favourites-content">
            {favourites.length === 0 && (
              <p className="favourites-empty">No favourites yet</p>
            )}
            {favourites.map((prop) => (
              <div key={prop.id} className="favourite-item-compact">
                <p className="favourite-title-compact">
                  {prop.type} – £{prop.price.toLocaleString()}
                </p>
                <button className="remove-btn-compact" onClick={() => onRemove(prop.id)}>
                  <X size={14} />
                </button>
              </div>
            ))}
            {favourites.length > 0 && (
              <button className="clear-btn-compact" onClick={onClear}>
                <Trash2 size={14} /> Clear All
              </button>
            )}
          </div>
        </div>
      )}

      {/* Desktop View - Always Visible */}
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
              Remove
            </button>
          </div>
        ))}

        {favourites.length > 0 && (
          <button className="clear-btn" onClick={onClear}>
            <Trash2 size={16} /> Clear All
          </button>
        )}
      </aside>
    </>
  );
}

export default Favourites;
