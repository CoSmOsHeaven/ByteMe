import React from "react";
import Lugar from "../../components/lugares/Lugar";

function Lugares({ lugares, loading, lastLugarElementRef, onLugarClick }) {
    if (loading && lugares.length === 0) {
        return (
            <div>
                <img
                    src="https://media.tenor.com/BgR83Df82t0AAAAj/portal-rick-and-morty.gif"
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