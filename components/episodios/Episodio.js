import React, { useState, useEffect } from 'react';

function Episodio({ name, air_date, episode, characters }) {
  const [mostrarTodos, setMostrarTodos] = useState(false);
  const [nombresPersonajes, setNombresPersonajes] = useState([]);
  const [cargando, setCargando] = useState(true);
  const limiteInicial = 5;

  useEffect(() => {
    const fetchPersonajes = async () => {
      try {
        const respuestas = await Promise.all(characters.map(url => fetch(url)));
        const datos = await Promise.all(respuestas.map(res => res.json()));
        setNombresPersonajes(datos.map(p => p.name));
      } catch (err) {
        console.error('Error cargando personajes:', err);
      } finally {
        setCargando(false);
      }
    };

    if (characters.length) fetchPersonajes();
    else setCargando(false);
  }, [characters]);

  const mostrados = mostrarTodos 
    ? nombresPersonajes 
    : nombresPersonajes.slice(0, limiteInicial);

  return (
      <div className="episodio_card">
        <h3 className="episodio_titulo">{name}</h3>
        <p><strong>Fecha de estreno:</strong> {air_date}</p>
        <p><strong>Episodio:</strong> {episode}</p>

        <div className="personajes_section">
          <h4 id="personajes-heading">Personajes:</h4>

          <div aria-live="polite">
            {cargando ? (
                <p>Cargando personajes…</p>
            ) : (
                <>
                  {mostrados.length ? (
                      <ul aria-labelledby="personajes-heading">
                        {mostrados.map((n, i) => (
                            <li key={i}>{n}</li>
                        ))}
                      </ul>
                  ) : (
                      <p>No hay personajes.</p>
                  )}

                  {nombresPersonajes.length > limiteInicial && (
                      <button
                          onClick={() => setMostrarTodos(!mostrarTodos)}
                          className="mostrar_mas_btn"
                          aria-expanded={mostrarTodos}
                          aria-label={mostrarTodos ? 'Mostrar menos personajes' : 'Mostrar más personajes'}
                      >
                        {mostrarTodos ? 'Mostrar menos' : 'Mostrar más'}
                      </button>
                  )}
                </>
            )}
          </div>
        </div>
      </div>

  );
}

export default Episodio;
