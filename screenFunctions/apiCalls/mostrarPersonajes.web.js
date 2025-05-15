import React, { useState, useEffect, useCallback, useRef } from "react";
import Personaje from "../../components/personajes/Personaje";

const BASE_URL = "https://rickandmortyapi.com/api/character";

function Personajes({ filters, setOriginOptions, setLocationOptions }) {
  const [characters, setCharacters]       = useState([]);
  const [loading, setLoading]             = useState(false);
  const [nextPage, setNextPage]           = useState(null);
  const [showNoResults, setShowNoResults] = useState(false);
  const [allCharacters, setAllCharacters] = useState([]);

  const primaryFilterRef = useRef(null);
  useEffect(() => {
    if (!filters.origin && !filters.location) {
      primaryFilterRef.current = null;
    } else if (!primaryFilterRef.current) {
      if (filters.origin) primaryFilterRef.current = "origin";
      else if (filters.location) primaryFilterRef.current = "location";
    }
  }, [filters.origin, filters.location]);

  useEffect(() => {
    (async () => {
      try {
        let url = BASE_URL;
        const allChars = [];
        while (url) {
          const res = await fetch(url);
          const data = await res.json();
          allChars.push(...data.results);
          url = data.info.next;
        }
        setAllCharacters(allChars);

        const allOrigins   = Array.from(new Set(allChars.map(p => p.origin.name))).sort();
        const allLocations = Array.from(new Set(allChars.map(p => p.location.name))).sort();
        setOriginOptions(allOrigins);
        setLocationOptions(allLocations);
      } catch (err) {
        console.error("Error cargando personajes completos:", err);
      }
    })();
  }, [setOriginOptions, setLocationOptions]);

  const loadWithFilters = async () => {
    setLoading(true);
    try {
      let url = `${BASE_URL}${filters.searchText ? `?name=${encodeURIComponent(filters.searchText)}` : ""}`;
      const result = [];
      while (url) {
        const res = await fetch(url);
        const data = await res.json();
        data.results.forEach(p => {
          if (
              (!filters.origin   || p.origin.name   === filters.origin) &&
              (!filters.location || p.location.name === filters.location)
          ) {
            result.push(p);
          }
        });
        url = data.info.next;
      }
      setCharacters(result);

      const allOrigins   = Array.from(new Set(allCharacters.map(p => p.origin.name))).sort();
      const allLocations = Array.from(new Set(allCharacters.map(p => p.location.name))).sort();

      const primary = primaryFilterRef.current;
      if (!primary) {
        setOriginOptions(allOrigins);
        setLocationOptions(allLocations);
      } else if (primary === "origin") {
        setOriginOptions(allOrigins);
        setLocationOptions(
            Array.from(
                new Set(
                    allCharacters
                        .filter(p => p.origin.name === filters.origin)
                        .map(p => p.location.name)
                )
            ).sort()
        );
      } else if (primary === "location") {
        setLocationOptions(allLocations);
        setOriginOptions(
            Array.from(
                new Set(
                    allCharacters
                        .filter(p => p.location.name === filters.location)
                        .map(p => p.origin.name)
                )
            ).sort()
        );
      }
    } catch (err) {
      console.error("Error loadWithFilters:", err);
      setCharacters([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setCharacters([]);
    setNextPage(null);

    if (!filters.searchText && !filters.origin && !filters.location) {
      // Ambos filtros en "todos": reset de dropdowns y scroll infinito
      const allOrigins   = Array.from(new Set(allCharacters.map(p => p.origin.name))).sort();
      const allLocations = Array.from(new Set(allCharacters.map(p => p.location.name))).sort();
      setOriginOptions(allOrigins);
      setLocationOptions(allLocations);
      fetchPage(BASE_URL);
    } else {
      loadWithFilters();
    }
  }, [filters.searchText, filters.origin, filters.location, allCharacters]);

  const fetchPage = async url => {
    if (!url) return;
    setLoading(true);
    try {
      const res = await fetch(url);
      const data = await res.json();
      setCharacters(prev => [...prev, ...data.results]);
      setNextPage(data.info.next);
    } catch (err) {
      console.error("Error fetchPage:", err);
    } finally {
      setLoading(false);
    }
  };
  const observerRef = useRef();
  const refUltimo = useCallback(node => {
    if (loading || filters.origin || filters.location || filters.searchText) return;
    if (observerRef.current) observerRef.current.disconnect();
    observerRef.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && nextPage) {
        fetchPage(nextPage);
      }
    });
    if (node) observerRef.current.observe(node);
  }, [loading, nextPage, filters]);

  const personajesFiltrados = characters.filter(p =>
      p.name.toLowerCase().includes(filters.searchText.toLowerCase())
  );
  useEffect(() => {
    if (loading || personajesFiltrados.length > 0) {
      setShowNoResults(false);
      return;
    }
    const timeout = setTimeout(() => setShowNoResults(true), 600);
    return () => clearTimeout(timeout);
  }, [loading, personajesFiltrados.length]);

  if (!loading && personajesFiltrados.length === 0 && showNoResults) {
    const q = filters.searchText || filters.origin || filters.location;
    return (
        <div className="no-results-container">
          <p style={{
            color: "red",
            fontSize: "1.5rem",
            fontWeight: "bold",
            textAlign: "center",
            margin: "2rem 0"
          }}>
            Sin resultados para “{q}”.
          </p>
        </div>
    );
  }

  return (
      <div className="personajes_contenedor">
        <div className="lista_personajes">
          {personajesFiltrados.map((p, idx) => (
              <div
                  key={p.id}
                  ref={idx === personajesFiltrados.length - 1 ? refUltimo : null}
              >
                <Personaje personaje={p} />
              </div>
          ))}
        </div>
        {loading && (
            <div className="loading-container">
              <img src="/portal-rick-and-morty.gif" alt="Cargando" />
            </div>
        )}
      </div>
  );
}

export default Personajes;

