import React, { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from 'react-router-dom';
import Lugares from "./apiCalls/mostrarLugares.web.js";
import "./screenLugares.web.css";

function ScreenLugares() {
    const [search, setSearch] = useState("");
    const [typeFilter, setTypeFilter] = useState("");
    const [dimensionFilter, setDimensionFilter] = useState("");
    const [allTypes, setAllTypes] = useState([]);
    const [allDimensions, setAllDimensions] = useState([]);
    const [typeToDimensions, setTypeToDimensions] = useState({});
    const [dimensionToTypes, setDimensionToTypes] = useState({});
    const [typeOptions, setTypeOptions] = useState([]);
    const [dimensionOptions, setDimensionOptions] = useState([]);
    const [lugares, setLugares] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleLugarClick = lugar => {
        navigate(`/personajes?origin=${encodeURIComponent(lugar.name)}`);
    };

    const filters = {
        searchText: search,
        type: typeFilter,
        dimension: dimensionFilter
    };

    useEffect(() => {
        const fetchAllFilters = async () => {
            try {
                let url = "https://rickandmortyapi.com/api/location";
                const types = [];
                const dimensions = [];
                const relations = [];

                while (url) {
                    const res = await fetch(url);
                    const data = await res.json();
                    data.results.forEach(loc => {
                        types.push(loc.type);
                        dimensions.push(loc.dimension);
                        relations.push({ type: loc.type, dimension: loc.dimension });
                    });
                    url = data.info.next;
                }

                const uniqueTypes = [...new Set(types)].sort((a, b) => a.localeCompare(b));
                const uniqueDims = [...new Set(dimensions)].sort((a, b) => a.localeCompare(b));
                setAllTypes(uniqueTypes);
                setAllDimensions(uniqueDims);

                const t2d = {};
                const d2t = {};
                relations.forEach(({ type, dimension }) => {
                    t2d[type] = t2d[type] || new Set();
                    t2d[type].add(dimension);
                    d2t[dimension] = d2t[dimension] || new Set();
                    d2t[dimension].add(type);
                });
                Object.keys(t2d).forEach(t => t2d[t] = [...t2d[t]].sort((a, b) => a.localeCompare(b)));
                Object.keys(d2t).forEach(d => d2t[d] = [...d2t[d]].sort((a, b) => a.localeCompare(b)));
                setTypeToDimensions(t2d);
                setDimensionToTypes(d2t);

                setTypeOptions(uniqueTypes);
                setDimensionOptions(uniqueDims);
            } catch (err) {
                console.error("Error cargando filtros de lugares:", err);
            }
        };
        fetchAllFilters();
    }, []);

    useEffect(() => {
        setLugares([]);
        setPage(1);
        setHasMore(true);
    }, [search, typeFilter, dimensionFilter]);

    useEffect(() => {
        setDimensionOptions(typeFilter ? (typeToDimensions[typeFilter] || []) : allDimensions);
        setTypeOptions(dimensionFilter ? (dimensionToTypes[dimensionFilter] || []) : allTypes);
    }, [typeFilter, dimensionFilter, allTypes, allDimensions, typeToDimensions, dimensionToTypes]);

    useEffect(() => {
        const fetchLugares = async () => {
            setLoading(true);
            const params = [`page=${page}`];
            if (search) params.push(`name=${encodeURIComponent(search)}`);
            if (typeFilter) params.push(`type=${encodeURIComponent(typeFilter)}`);
            if (dimensionFilter) params.push(`dimension=${encodeURIComponent(dimensionFilter)}`);
            const url = `https://rickandmortyapi.com/api/location/?${params.join("&")}`;

            try {
                const res = await fetch(url);
                const data = await res.json();
                if (data.results) {
                    setLugares(prev => [...prev, ...data.results]);
                    setHasMore(Boolean(data.info.next));
                } else {
                    setHasMore(false);
                }
            } catch (err) {
                console.error("Error al cargar lugares:", err);
                setHasMore(false);
            } finally {
                setLoading(false);
            }
        };
        fetchLugares();
    }, [page, search, typeFilter, dimensionFilter]);

    const observer = useRef();
    const lastLugarElementRef = useCallback(node => {
        if (loading) return;
        if (observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
                setPage(prev => prev + 1);
            }
        });
        if (node) observer.current.observe(node);
    }, [loading, hasMore]);

    return (
        <div className="screenLugares">
            <div className="container_lugares">
                <div className="div_background-lugares"></div>
                <div className="div_background-blur-lugares"></div>

                <div className="header_personajes">
                    <div className="title_container">
                        <h1 className="title_lugares">Lugares</h1>
                        <p className="description">
                            En esta sección podrás encontrar información sobre los diferentes
                            lugares de la serie.
                        </p>
                    </div>

                    <div className="search-bar-lugares">
                        <input
                            type="text"
                            placeholder="Buscar lugar..."
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            className="search-input-lugares"
                        />

                        <select
                            value={typeFilter}
                            onChange={e => setTypeFilter(e.target.value)}
                            className="type-select"
                        >
                            <option value="">— Tipo (todos) —</option>
                            {typeOptions
                                .filter(t => t && t.trim())
                                .map(t => (
                                    <option key={t} value={t}>{t}</option>
                                ))}
                        </select>

                        <select
                            value={dimensionFilter}
                            onChange={e => setDimensionFilter(e.target.value)}
                            className="dimension-select"
                        >
                            <option value="">— Dimensión (todas) —</option>
                            {dimensionOptions
                                .filter(d => d && d.trim())
                                .map(d => (
                                    <option key={d} value={d}>{d}</option>
                                ))}
                        </select>
                    </div>
                </div>

                <Lugares
                    lugares={lugares}
                    loading={loading}
                    lastLugarElementRef={lastLugarElementRef}
                    onLugarClick={handleLugarClick}
                    filters={filters}
                />
            </div>
        </div>
    );
}

export default ScreenLugares;