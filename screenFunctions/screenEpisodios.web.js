import React, { useState } from 'react';
import MostrarEpisodios from './apiCalls/mostrarEpisodios.web.js';
import './screenEpisodios.web.css';

function ScreenEpisodios() {
  const [search, setSearch] = useState('');
  const [season, setSeason] = useState('all');

  const handleSeasonChange = (e) => {
    setSeason(e.target.value);
  };

  return (
    <div className="screenEpisodios">
      <div className="container_episodios">
        <div className="div_background-episodios"></div>
        <div className="div_background-blur-episodios"></div>

        <div className="header_episodios">
          <div className="title_container">
            <h1 className="title_episodios">Episodios</h1>
            <p className="description">
              En esta sección podrás encontrar información sobre los episodios de la serie.
            </p>
          </div>

          <div className="controls_bar">
            <input
              type="text"
              placeholder="Buscar episodio..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="search-input-episodios"
            />
            <select
              value={season}
              onChange={handleSeasonChange}
              className="season-select"
            >
              <option value="all">— Temporadas (todas) —</option>
              <option value="1">Temporada 1</option>
              <option value="2">Temporada 2</option>
              <option value="3">Temporada 3</option>
              <option value="4">Temporada 4</option>
              <option value="5">Temporada 5</option>
            </select>
          </div>
        </div>

        <div className="episodios_container">
          <div className="lista_episodios">
            <MostrarEpisodios search={search} season={season} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ScreenEpisodios;