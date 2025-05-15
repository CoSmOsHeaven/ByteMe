import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import './Lugar.css';

// Hook mínimo para IntersectionObserver
function useInView(options = {}) {
    const ref = useRef(null);
    const [inView, setInView] = useState(false);
    useEffect(() => {
        if (!ref.current) return;
        const obs = new IntersectionObserver(
            ([entry]) => setInView(entry.isIntersecting),
            options
        );
        obs.observe(ref.current);
        return () => obs.disconnect();
    }, [ref, options]);
    return { ref, inView };
}

function Lugar({ name, type, dimension, residentes }) {
    const [resInit, setResInit] = useState([]);
    const [resRest, setResRest] = useState([]);
    const [orgInit, setOrgInit] = useState([]);
    const [orgRest, setOrgRest] = useState([]);
    const [loadingRes, setLoadingRes] = useState(true);
    const [loadingOrg, setLoadingOrg] = useState(true);
    const [showAllRes, setShowAllRes] = useState(false);
    const [showAllOrg, setShowAllOrg] = useState(false);

    const limiteInicial = 5;
    const { ref, inView } = useInView({ threshold: 0.2 });
    const navigate = useNavigate();

    const bulkFetchByUrl = async (urls) => {
        if (!urls.length) return [];
        const ids = urls.map(u => u.split('/').pop()).join(',');
        const res = await fetch(`https://rickandmortyapi.com/api/character/[${ids}]`);
        const data = await res.json();
        return Array.isArray(data) ? data.map(p => p.name) : [data.name];
    };

    const fetchAllOriginNames = async () => {
        let url = 'https://rickandmortyapi.com/api/character';
        const names = [];
        while (url) {
            const res = await fetch(url);
            const data = await res.json();
            const matching = data.results
                .filter(p => p.origin.name === name)
                .map(p => p.name);
            names.push(...matching);
            url = data.info.next;
        }
        return names;
    };

    useEffect(() => {
        if (!inView) return;
        async function loadData() {
            setLoadingRes(true);
            let allRes = [];
            try {
                allRes = await bulkFetchByUrl(residentes);
                setResInit(allRes.slice(0, limiteInicial));
                setResRest(allRes.slice(limiteInicial));
            } catch (e) {
                console.error(e);
            }
            setLoadingRes(false);

            setLoadingOrg(true);
            try {
                const allOrg = await fetchAllOriginNames();
                setOrgInit(allOrg.slice(0, limiteInicial));
                setOrgRest(allOrg.slice(limiteInicial));
            } catch (e) {
                console.error(e);
            }
            setLoadingOrg(false);
        }
        loadData();
    }, [inView, residentes, name]);

    const handleResidentsClick = async () => {
        try {
            const locRes = await fetch(
                `https://rickandmortyapi.com/api/location?name=${encodeURIComponent(name)}`
            );
            const locData = await locRes.json();

            if (
                locData.results &&
                locData.results.length > 0 &&
                locData.results[0].residents.length > 0
            ) {
                navigate(`/personajes?location=${encodeURIComponent(name)}`);
                return;
            }
        } catch (e) {
            console.error('Error comprobando localización en la API:', e);
        }

        navigate(`/personajes?origin=${encodeURIComponent(name)}`);
    };

    const displayedRes = showAllRes ? [...resInit, ...resRest] : resInit;
    const displayedOrg = showAllOrg ? [...orgInit, ...orgRest] : orgInit;

    return (
        <div ref={ref} className="lugar_main_container">
            <div className="nombre_lugar_container">
                <h3 className="nombre_lugar">{name}</h3>
            </div>
            <div className="descripcion_lugar_container">
                <p className="tipo_lugar">
                    <span className="header_descripcion">Tipo: </span>{type}
                </p>
                <p className="tipo_lugar">
                    <span className="header_descripcion">Dimensión: </span>{dimension}
                </p>
            </div>

            <div className="residentes_container">
                <button
                    className="residentes_button"
                    onClick={handleResidentsClick}
                >
                    Residentes
                </button>
                <span className="header_descripcion" style={{ display: 'block', marginTop: '0.5rem' }}>
                    Actuales:
                </span>
                {loadingRes ? (
                    <p>Cargando residentes…</p>
                ) : (
                    <>
                        <ul className="residentes_lista">
                            {displayedRes.length > 0
                                ? displayedRes.map((n, i) => (
                                    <li key={i} className="residente_item">{n}</li>
                                ))
                                : <p>No hay residentes.</p>}
                        </ul>
                        {resRest.length > 0 && (
                            <button
                                className="mostrar_mas_btn"
                                onClick={() => setShowAllRes(!showAllRes)}
                            >
                                {showAllRes ? 'Mostrar menos' : 'Mostrar más'}
                            </button>
                        )}
                    </>
                )}
            </div>

            <div className="residentes_container" style={{ marginTop: '1rem' }}>
                <span className="header_descripcion">Originarios:</span>
                {loadingOrg ? (
                    <p>Cargando originarios…</p>
                ) : (
                    <>
                        <ul className="residentes_lista">
                            {displayedOrg.length > 0
                                ? displayedOrg.map((n, i) => (
                                    <li key={i} className="residente_item">{n}</li>
                                ))
                                : <p>No hay originarios.</p>}
                        </ul>
                        {orgRest.length > 0 && (
                            <button
                                className="mostrar_mas_btn"
                                onClick={() => setShowAllOrg(!showAllOrg)}
                            >
                                {showAllOrg ? 'Mostrar menos' : 'Mostrar más'}
                            </button>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}

export default Lugar;
