import React, { useState } from "react";
import { useLocation } from 'react-router-dom';
import Personajes from "./apiCalls/mostrarPersonajes.web";
import "./screenPersonajes.web.css";

function ScreenPersonajes() {
  const { search } = useLocation();
  const params = new URLSearchParams(search);

  const originFromQuery   = params.get('origin')   || "";
  const locationFromQuery = params.get('location') || "";

  const [filters, setFilters] = useState({
    searchText: "",
    origin:   originFromQuery,
    location: locationFromQuery,
  });

  const [originOptions,   setOriginOptions]   = useState([]);
  const [locationOptions, setLocationOptions] = useState([]);

  const handleChange = e => {
    const { name, value } = e.target;
    setFilters(f => ({
      ...f,
      [name]: value,
      }));
  };

  const displayOriginOptions = filters.origin && !originOptions.includes(filters.origin)
      ? [filters.origin, ...originOptions]
      : originOptions;

  const displayLocationOptions = filters.location && !locationOptions.includes(filters.location)
      ? [filters.location, ...locationOptions]
      : locationOptions;

  return (
      <div className="screenPersonajes">
        <div className="container_personajes">
          <div className="div_background-personajes" aria-hidden="true"/>
          <div className="div_background-blur-personajes" aria-hidden="true"/>

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
                  name="location"
                  value={filters.location}
                  onChange={handleChange}
                  className="select-input-location"
              >
                <option value="">— Localización (todos) —</option>
                {displayLocationOptions.map(loc => (
                    <option key={loc} value={loc}>{loc}</option>
                ))}
              </select>

              <select
                  name="origin"
                  value={filters.origin}
                  onChange={handleChange}
                  className="select-input-origin"
              >
                <option value="">— Origen (todos) —</option>
                {displayOriginOptions.map(o => (
                    <option key={o} value={o}>{o}</option>
                ))}
              </select>
            </div>
          </div>

          <Personajes
              filters={filters}
              setOriginOptions={setOriginOptions}
              setLocationOptions={setLocationOptions}
          />
        </div>
      </div>
  );
}

export default ScreenPersonajes;
