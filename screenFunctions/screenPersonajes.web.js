import React, { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import Personajes from "./apiCalls/mostrarPersonajes.web";
import "./screenPersonajes.web.css";

function ScreenPersonajes() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const originFromQuery = params.get('origin') || "";

  const [filters, setFilters] = useState({
    searchText: "",
    origin: originFromQuery,
  });
  const [originOptions, setOriginOptions] = useState([]);

  useEffect(() => {
    if (originFromQuery) {
      setFilters(prev => ({ ...prev, origin: originFromQuery }));
    }
  }, [originFromQuery]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  return (
      <div className="screenPersonajes">
        <div className="container_personajes">
          <div className="div_background-personajes" />
          <div className="div_background-blur-personajes" />

          <div className="header_personajes">
            <div className="contenedor_titulo">
              <h1 className="titulo_personajes">Personajes</h1>
              <p className="descripcion">
                Busca y filtra a tus personajes favoritos de Rick y Morty.
              </p>
            </div>

            <div className="search-bar-personajes">
              <input
                  type="text"
                  placeholder="Buscar personaje..."
                  name="searchText"
                  value={filters.searchText}
                  onChange={handleChange}
                  className="search-input-personajes"
              />

              <select
                  name="origin"
                  value={filters.origin}
                  onChange={handleChange}
                  className="select-input"
              >
                <option value="">— Origen (todos) —</option>
                {originOptions.map(origin => (
                    <option key={origin} value={origin}>
                      {origin}
                    </option>
                ))}
              </select>
            </div>
          </div>

          <Personajes
              filters={filters}
              setOriginOptions={setOriginOptions}
              fetchAll={false}
          />
        </div>
      </div>
  );
}

export default ScreenPersonajes;