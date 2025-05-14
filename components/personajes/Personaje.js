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
    >
      <div className="carta_personaje_inner">
        <div className="carta_personaje_front">
          <img
            src={personaje.image}
            alt={personaje.name}
            className="personaje_img"
          />
          <h2 className="personaje_nombre">{personaje.name}</h2>
        </div>
        <div className="carta_personaje_back">
          <p>
            <strong>Especie:</strong> {personaje.species}
          </p>
          <p>
            <strong>Estado:</strong> {personaje.status}
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
