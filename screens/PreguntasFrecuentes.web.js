import './PreguntasFrecuentes.web.css';

function PreguntasFrecuentes(){
    return(
        <div className="screenPreguntasFrecuentes">
            <section className="container_preguntas-frecuentes" aria-labelledby="faq-title">
                <div className="div_background-preguntas-frecuentes"></div>
                <div className="div_background-blur-preguntas-frecuentes"></div>

                <h1 id="faq-title" className="title_preguntas_frecuentes">Preguntas frecuentes</h1>

                <details className="pregunta_container">
                    <summary className="subtitle_preguntas_frecuentes" role="button" aria-expanded="false">
                        ¿Para qué sirve esta web?
                    </summary>
                    <div className="pregunta_contenido" role="region" aria-labelledby="faq1">
                        <p id="faq1" className="text_preguntas_frecuentes">
                            Como su propio nombre indica, se trata de un pequeño sitio donde
                            recopilamos información sobre la serie Rick y Morty para que los más curiosos puedan acceder de forma
                            fácil y visual.
                        </p>
                    </div>
                </details>

                <details className="pregunta_container">
                    <summary className="subtitle_preguntas_frecuentes" role="button" aria-expanded="false">
                        ¿Cómo funciona?
                    </summary>
                    <div className="pregunta_contenido" role="region" aria-labelledby="faq2">
                        <p id="faq2" className="text_preguntas_frecuentes">
                            La web está dividida en varias secciones, cada una de ellas
                            dedicada a un aspecto diferente de la serie. Puedes navegar por ellas desde el menú principal.
                        </p>
                    </div>
                </details>

                <details className="pregunta_container">
                    <summary className="subtitle_preguntas_frecuentes" role="button" aria-expanded="false">
                        ¿Está actualizada hasta la última temporada?
                    </summary>
                    <div className="pregunta_contenido" role="region" aria-labelledby="faq3">
                        <p id="faq3" className="text_preguntas_frecuentes">
                            Desafortunadamente, no contamos con la información actualizada
                            hasta la última temporada de la serie. Se muestran datos hasta la temporada 5, incluida. Seguiremos
                            trabajando para ofrecer los datos de los episodios más actuales.
                        </p>
                    </div>
                </details>
                <details className="pregunta_container">
                    <summary className="subtitle_preguntas_frecuentes" role="button" aria-expanded="false">
                        ¿Puedo ver episodios directamente desde esta web?
                    </summary>
                    <div className="pregunta_contenido" role="region" aria-labelledby="faq4">
                        <p id="faq4" className="text_preguntas_frecuentes">
                            No, no puedes ver episodios directamente desde esta web. Te recomendamos que uses plataformas
                            oficiales para disfrutar de la serie.
                        </p>
                    </div>
                </details>
                <details className="pregunta_container">
                    <summary className="subtitle_preguntas_frecuentes" role="button" aria-expanded="false">
                        ¿Cómo puedo contactar con el equipo?
                    </summary>
                    <div className="pregunta_contenido" role="region" aria-labelledby="faq5">
                        <p id="faq5" className="text_preguntas_frecuentes">
                            Puedes contactarnos a través de nuestro correo electrónico, disponible en la sección de "Sobre Nosotros".
                        </p>
                    </div>
                </details>
                <details className="pregunta_container">
                    <summary className="subtitle_preguntas_frecuentes" role="button" aria-expanded="false">
                        ¿De dónde provienen los datos mostrados?
                    </summary>
                    <div className="pregunta_contenido" role="region" aria-labelledby="faq6">
                        <p id="faq6" className="text_preguntas_frecuentes">
                            Los datos mostrados en la web provienen de la <a className={"link_faq"} href={"https://rickandmortyapi.com/"}>API de Rick y Morty</a>, que ofrece información
                            detallada sobre los episodios, personajes y otros aspectos de la serie.
                        </p>
                    </div>
                </details>
                <details className="pregunta_container">
                    <summary className="subtitle_preguntas_frecuentes" role="button" aria-expanded="false">
                        ¿Puedo colaborar o enviar sugerencias?
                    </summary>
                    <div className="pregunta_contenido" role="region" aria-labelledby="faq7">
                        <p id="faq7" className="text_preguntas_frecuentes">
                            Sí, estamos abiertos a cualquier tipo de contribución. Puedes contactarnos a través de nuestro
                            correo electrónico.
                        </p>
                    </div>
                </details>
            </section>
        </div>
    );
}
export default PreguntasFrecuentes;