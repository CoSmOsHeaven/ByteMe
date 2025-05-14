import React from "react";
import './Titulo.css';

function Titulo(){
    return (
        <div className="title-container">
            <div className="div_background"></div>
            <h2 className={"title_web"}>¡Bienvenid@ a la <span id={"wiki_word"}>wiki</span> de </h2>
            <h1 className={"rick_and_morty_title"}>Rick y Morty!</h1>
        </div>
    );
}

export default Titulo;