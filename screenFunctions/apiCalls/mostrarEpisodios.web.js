import React, { useState, useEffect } from 'react';
import Episodio from '../../components/episodios/Episodio';

async function fetchAllEpisodes(params = []) {
  let url = 'https://rickandmortyapi.com/api/episode';
  if (params.length) url += `?${params.join('&')}`;
  const first = await fetch(url).then(r => r.json());
  let all = first.results || [];
  const pages = first.info?.pages || 1;

  if (pages > 1) {
    const promises = [];
    for (let p = 2; p <= pages; p++) {
      const pageUrl = url + (params.length ? `&page=${p}` : `?page=${p}`);
      promises.push(fetch(pageUrl).then(r => r.json()));
    }
    const rest = await Promise.all(promises);
    rest.forEach(d => {
      if (d.results) all = all.concat(d.results);
    });
  }
  return all;
}

export default function MostrarEpisodios({ search, season }) {
  const [episodios, setEpisodios] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    (async () => {
      const params = [];
      const rawTerm = search.trim();
      let term = rawTerm;

      if (/^S0(E)?$/i.test(rawTerm)) term = '';

      const selSeason = season === 'all' ? null : String(season).padStart(2, '0');

      const fullExactMatch = term.match(/^S(\d{1,2})E(\d{1,2})$/i);
      const seasonEpisodeZeroMatch = term.match(/^S(\d{1,2})E0$/i);
      const seasonEPrefixMatch = term.match(/^S(\d{1,2})E$/i);
      const seasonOnlyMatch = term.match(/^S(\d{1,2})$/i);
      const episodeOnlyMatch = term.match(/^E(\d{1,2})$/i);

      const codeSeasonMatch = fullExactMatch || seasonEpisodeZeroMatch || seasonEPrefixMatch || seasonOnlyMatch;
      if (codeSeasonMatch && selSeason) {
        const sCode = codeSeasonMatch[1].padStart(2, '0');
        if (sCode !== selSeason) {
          setEpisodios([]);
          setLoading(false);
          return;
        }
      }

      let handled = false;
      let needClientFilter = null; // for client-side filtering after fetch

      if (fullExactMatch) {
        const s = fullExactMatch[1].padStart(2, '0');
        const eRaw = fullExactMatch[2];
        const e = eRaw.padStart(2, '0');
        if (eRaw.length === 1) {

          if (selSeason) params.push(`episode=S${s}`);
          needClientFilter = { type: 'episodeNumberPrefix', value: eRaw };
        } else {

          params.push(`episode=S${s}E${e}`);
        }
        handled = true;
      }

      else if (seasonEpisodeZeroMatch) {
        const s = seasonEpisodeZeroMatch[1].padStart(2, '0');
        params.push(`episode=S${s}`);
        needClientFilter = { type: 'episodeCodePrefix', value: `s${s}e0` };
        handled = true;
      }

      else if (seasonEPrefixMatch) {
        const s = seasonEPrefixMatch[1].padStart(2, '0');
        params.push(`episode=S${s}E`);
        handled = true;
      }

      else if (seasonOnlyMatch) {
        const s = seasonOnlyMatch[1].padStart(2, '0');
        params.push(`episode=S${s}`);
        handled = true;
      }

      else if (episodeOnlyMatch) {
        const eRaw = episodeOnlyMatch[1];
        const eNum = parseInt(eRaw, 10);
        if (eNum === 0) {

          if (selSeason) {
            params.push(`episode=S${selSeason}`);
          }
          needClientFilter = { type: 'episodeNumberPrefix', value: eRaw };
        } else {

          if (selSeason) params.push(`episode=S${selSeason}`);
          else if (eRaw.length > 1) params.push(`episode=E${eRaw.padStart(2, '0')}`);
          needClientFilter = { type: 'episodeNumberPrefix', value: eRaw };
        }
        handled = true;
      }

      else if (term) {
        params.push(`name=${encodeURIComponent(term)}`);
        if (selSeason) {
          params.push(`episode=S${selSeason}`);
        }
        handled = true;
      }

      if (!term && selSeason) {
        params.push(`episode=S${selSeason}`);
      }

      if (term && !handled && selSeason) {
        params.push(`episode=S${selSeason}`);
      }

      let list;
      if (!term && !selSeason) {
        list = await fetchAllEpisodes();
      } else {
        list = await fetchAllEpisodes(params);
      }

      if (needClientFilter) {
        if (needClientFilter.type === 'episodeNumberPrefix') {
          const v = needClientFilter.value;
          list = list.filter(ep => {
            const m = ep.episode.match(/E(\d{2})$/i);
            if (!m) return false;
            return m[1].includes(v);
          });
        } else if (needClientFilter.type === 'episodeCodePrefix') {
          const prefix = needClientFilter.value.toLowerCase();
          list = list.filter(ep => ep.episode.toLowerCase().startsWith(prefix));
        }
      }

      setEpisodios(list);
    })()
        .catch(err => {
          console.error('Error cargando episodios:', err);
          setEpisodios([]);
        })
        .finally(() => {
          setLoading(false);
        });
  }, [search, season]);

  if (loading) {
    return (
        <div className="loading-container">
          <img
              src="https://media.tenor.com/BgR83Df82t0AAAAj/portal-rick-and-morty.gif"
              alt="Cargando"
          />
        </div>
    );
  }

  if (episodios.length === 0) {
    return (
        <div className="no-results-container">
          <p style={{
            color: 'red',
            fontSize: '1.5rem',
            fontWeight: 'bold',
            textAlign: 'center',
            margin: '2rem 0'
          }}>
            No hay resultados para “{search}”.
          </p>
        </div>
    );
  }

  if (season === 'all') {
    const grupos = episodios.reduce((acc, ep) => {
      const m = ep.episode.match(/^S(\d{2})E/);
      const temp = m ? parseInt(m[1], 10) : 0;
      acc[temp] = acc[temp] || [];
      acc[temp].push(ep);
      return acc;
    }, {});
    const temporadas = Object.keys(grupos)
        .map(n => parseInt(n, 10))
        .sort((a, b) => a - b);

    return (
        <>
          {temporadas.map(temp => (
              <section key={temp} className="season-group">
                <h2 className="season-title">Temporada {temp}</h2>
                <div className="episodios_container">
                  <div className="lista_episodios">
                    {grupos[temp].map(ep => (
                        <Episodio
                            key={ep.id}
                            name={ep.name}
                            air_date={ep.air_date}
                            episode={ep.episode}
                            characters={ep.characters}
                        />
                    ))}
                  </div>
                </div>
              </section>
          ))}
        </>
    );
  }

  return (
      <section className="season-group">
        <h2 className="season-title">
          {search.trim()
              ? `Resultados${season !== 'all' ? ` - Temp ${season}` : ''}`
              : `Temporada ${season}`}
        </h2>
        <div className="episodios_container">
          <div className="lista_episodios">
            {episodios.map(ep => (
                <Episodio
                    key={ep.id}
                    name={ep.name}
                    air_date={ep.air_date}
                    episode={ep.episode}
                    characters={ep.characters}
                />
            ))}
          </div>
        </div>
      </section>
  );
}