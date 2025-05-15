import React, { useState, useEffect } from "react";
import Lugar from "../../components/lugares/Lugar";

function Lugares({ lugares, loading, lastLugarElementRef, onLugarClick, filters }) {
    const [showNoResults, setShowNoResults] = useState(false);
    const query = filters?.searchText?.trim() || '';
    useEffect(() => {
        setShowNoResults(false);
        if (!loading && lugares.length === 0) {
            const timer = setTimeout(() => {
                setShowNoResults(true);
            }, 600);
            return () => clearTimeout(timer);
        }
        return undefined;
    }, [lugares, loading]);

    if (!loading && lugares.length === 0 && !showNoResults) {
        return null;
    }

    if (!loading && lugares.length === 0 && showNoResults) {
        return (
            <div className="no-results-container">
                <p style={{
                    color: 'red',
                    fontSize: '1.5rem',
                    fontWeight: 'bold',
                    textAlign: 'center',
                    margin: '2rem 0'
                }}>
                    Sin resultados para “{query}”.
                </p>
            </div>
        );
    }

    if (loading && lugares.length === 0) {
        return (
            <div>
                <img
                    src="/portal-rick-and-morty.gif"
                    alt="loading_image"
                />
            </div>
        );
    }

    return (
        <div className="lugares_container">
            <div className="lista_lugares">
                {lugares.map((lugar, index) => {
                    const isLast = index === lugares.length - 1;
                    return (
                        <div key={lugar.id} ref={isLast ? lastLugarElementRef : null}>
                            <Lugar
                                name={lugar.name}
                                dimension={lugar.dimension}
                                residentes={lugar.residents}
                                type={lugar.type}
                                onTitleClick={() => onLugarClick(lugar)}
                            />
                        </div>
                    );
                })}
            </div>
            {loading && lugares.length > 0 && (
                <p className="loading">Cargando más lugares...</p>
            )}
        </div>
    );
}

export default Lugares;
