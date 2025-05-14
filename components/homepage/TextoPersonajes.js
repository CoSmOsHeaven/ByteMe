import React from "react";
import './TextoPersonajes.css';

function TextoPersonajes(){
    return (
        <div className="textoSectionPersonajes">
            <h3 className={"texto_header_personajes"}>¡Conoce a
                tus <a className={"green_word"} href={"/personajes"}>personajes</a> favoritos en esta
                increíble galería! </h3>
            <p className={"description_personajes"}>Explora la vida, habilidades y secretos de los protagonistas
                que hacen de esta historia algo inolvidable. Cada personaje tiene una historia que contar,
                ¿cuál será tu favorito? </p>
        </div>
    );
}

export default TextoPersonajes;