import React from "react";
import './TextoLugares.css';

function TextoLugares(){
    return (
        <div className="textoSectionLugares">
            <h3 className={"texto_header_lugares"}>¡Descubre los <span className={"green_word"}>lugares</span> más
                icónicos del universo de la serie! </h3>
            <p className={"description_lugares"}>Viaja por escenarios asombrosos, desde reinos lejanos hasta rincones ocultos
                llenos de misterio. Cada lugar tiene su propia atmósfera y leyenda,
                y ahora puedes explorarlos todos desde un solo sitio. </p>
        </div>
    );
}

export default TextoLugares;