import React, { useState } from "react";
import "./Personaje.css";

function Personaje({ personaje }) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped((prev) => !prev);
  };

  return (
    <div
        className={`carta_personaje ${isFlipped ? "flipped" : ""}`}
        onClick={handleFlip}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handleFlip();
          }
        }}
        role="button"
        tabIndex="0"
        aria-pressed={isFlipped}
        aria-label={`Ver detalles de ${personaje.name}`}
    >
      <div className="carta_personaje_inner">
        <div className="carta_personaje_front">
          <img
              src={personaje.image}
              alt={`Imagen de ${personaje.name}`}
              className="personaje_img"
          />
          <h2 className="personaje_nombre">{personaje.name}</h2>
        </div>
        <div className="carta_personaje_back">
          <p>
            <strong>Especie:</strong> {personaje.species}
          </p>
          <p>
            <strong>Estado:</strong>{" "}
            <span
                style={{
                  display: "inline-block",
                  width: "10px",
                  height: "10px",
                  borderRadius: "50%",
                  backgroundColor:
                      personaje.status === "Alive"
                          ? "green"
                          : personaje.status === "Dead"
                              ? "red"
                              : "gray",
                  marginRight: "5px"
                }}
                aria-hidden="true"
            ></span>
            <span>{personaje.status}</span>
          </p>
          <p>
            <strong>Género:</strong> {personaje.gender}
          </p>
          <p>
            <strong>Origen:</strong> {personaje.origin.name}
          </p>
          <p>
            <strong>Ubicación:</strong> {personaje.location.name}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Personaje;
