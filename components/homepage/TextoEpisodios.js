import React from "react";
import './TextoEpisodios.css';

function TextoEpisodios(){
    return (
        <div className="textoSectionEpisodios">
            <h3 className={"texto_header_episodios"}>¡Revive los mejores momentos a través de los <span className={"green_word"} >episodios</span>!</h3>
            <p className={"description_episodios"}>Sumérgete en cada capítulo y recuerda
                las escenas más impactantes, divertidas o emocionantes.
                Encuentra tu episodio favorito o descubre alguno que aún no hayas visto. </p>
        </div>
    );
}

export default TextoEpisodios;