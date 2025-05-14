import React, { useState, useEffect, useRef, useCallback } from "react";
import Personaje from "../../components/personajes/Personaje";

function Personajes({ filters, setOriginOptions }) {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(false);
  const [nextPage, setNextPage] = useState(
      "https://rickandmortyapi.com/api/character"
  );

  useEffect(() => {
    if (!setOriginOptions) return;
    const fetchAllOrigins = async () => {
      try {
        let url = "https://rickandmortyapi.com/api/location";
        const origenes = [];
        while (url) {
          const res = await fetch(url);
          const data = await res.json();
          data.results.forEach(loc => origenes.push(loc.name));
          url = data.info.next;
        }
        setOriginOptions([...new Set(origenes)].sort((a, b) => a.localeCompare(b)));
      } catch (err) {
        console.error(err);
      }
    };
    fetchAllOrigins();
  }, [setOriginOptions]);

  useEffect(() => {
    setCharacters([]);
    setNextPage("https://rickandmortyapi.com/api/character");
    if (filters.origin) {
      const loadByOrigin = async () => {
        setLoading(true);
        try {
          let url = "https://rickandmortyapi.com/api/character";
          while (url) {
            const res = await fetch(url);
            const data = await res.json();
            const match = data.results.filter(
                char => char.origin.name === filters.origin
            );
            setCharacters(prev => [...prev, ...match]);
            url = data.info.next;
          }
        } catch (err) {
          console.error("Error cargando personajes por origen:", err);
        } finally {
          setLoading(false);
        }
      };
      loadByOrigin();
    } else {
      fetchNextPage();
    }
  }, [filters.origin, filters.searchText]);

  const fetchNextPage = async () => {
    if (!nextPage || loading) return;
    setLoading(true);
    try {
      const res = await fetch(nextPage);
      const data = await res.json();
      setCharacters(prev => [...prev, ...data.results]);
      setNextPage(data.info.next);
    } catch (err) {
      console.error("Error al cargar personajes:", err);
    } finally {
      setLoading(false);
    }
  };

  const refUltimo = useRef();
  const refUltimoPersonaje = useCallback(
      node => {
        if (loading || filters.origin) return;
        if (refUltimo.current) refUltimo.current.disconnect();
        refUltimo.current = new IntersectionObserver(entries => {
          if (entries[0].isIntersecting) fetchNextPage();
        });
        if (node) refUltimo.current.observe(node);
      },
      [loading, filters.origin]
  );

  const personajesFiltrados = characters.filter(char => {
    const q = filters.searchText.toLowerCase();
    return char.name.toLowerCase().includes(q);
  });

  return (
      <div className="personajes_contenedor">
        <div className="lista_personajes">
          {personajesFiltrados.map((char, idx) => (
              <div
                  key={char.id}
                  ref={idx === personajesFiltrados.length - 1 ? refUltimoPersonaje : null}
              >
                <Personaje personaje={char} />
              </div>
          ))}
        </div>
        {loading && <p>Cargando...</p>}
      </div>
  );
}

export default Personajes;