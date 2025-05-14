import React, { useState, useLayoutEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Titulo from '../components/homepage/Titulo';
import Typewriter from '../components/Typewriter';
import CarouselEpisodios from '../components/homepage/CarouselEpisodios';
import CarouselPersonajes from '../components/homepage/CarouselPersonajes';
import CarouselLugares from '../components/homepage/CarouselLugares';
import './Home.css';
import TextoPersonajes from "../components/homepage/TextoPersonajes";
import TextoLugares from "../components/homepage/TextoLugares";
import TextoEpisodios from "../components/homepage/TextoEpisodios";
import Footer from "../components/homepage/Footer";

function Home() {
  const [frase, setFrase] = useState(null);

    const frases = [
        { texto: '"Todos los hospitales tienen un médico que dicen que es el mejor médico de toda la galaxia."' },
        { texto: '"Los padres son simplemente niños teniendo más niños."' },
        { texto: '"Las bodas son básicamente funerales con un pastel."' },
        { texto: '"No huyas. Nadie existe a propósito. Nadie pertenece a ninguna parte. Todos vamos a morir. Ven a ver la televisión."' },
        { texto: '"¿Y qué hay acerca de la realidad donde Hitler curó el cáncer, Morty? La respuesta es: no pienses en ello."' },
        { texto: '"¡Estoy harto de todas estas aventuras tan locas! ¡Eso fue demasiado traumático!"' },
        { texto: '"Escucha, Morty. Lamento decirlo, pero lo que la gente llama \'amor\' es sólo una reacción química que motiva a los animales a aparearse."' },
        { texto: '"¿Tienes a un planeta completo generando electricidad para ti? ¡Eso es esclavitud!"' },
        { texto: '"¡Estoy tratando de reparar el arma creadora de portales con partes de una muñeca sexual y tengo que hacerlo con una sola mano!"' },
        { texto: '"¡Ojalá esa escopeta fuera mi pene!"' },
        { texto: '"Supongo que simplemente soy el papel de baño de toda esta familia."' },
        { texto: '"¡Está bien! La televisión dice que no hay nada de que preocuparnos."' },
        { texto: '"Es un golpe duro, Morty, y lentamente se desvanece dejándote varado en un matrimonio fallido. Yo lo hice. Tus padres lo harán."' },
        { texto: '"Si he aprendido una cosa, es que antes de llegar a algún lado en la vida, debes dejar de escucharte a ti mismo."' },
        { texto: '"¡Sr. Presidente, si he aprendido algo hoy, es que a veces usted tiene que decir que te jodan."' },
        { texto: '"Las mantis religiosas son lo opuesto a los ratones de campo, Morty. Decapitan y se comen a sus compañeros después de aparearse. El amor no existe después de todo."' },
        { texto: '"Montón de gente corriendo alrededor chocando uno con el otro. Un tipo enfrente diciendo «dos más dos» y la gente atrás dice «cuatro»."' },
        { texto: '"El universo es como un animal, se alimenta de lo anodino. Crea infinitos idiotas para luego comérselos."' },
        { texto: '"¿Sabes lo mejor que puedes hacer por las personas que dependen de ti? Sé honesto con ellos, incluso si eso significa liberarlos."' },
        { texto: '"¿Cuántos de estos son errores horribles que cometí? Quiero decir, tal vez dejaría de cometer tantos si me dejara aprender de ellos."' },
        { texto: '"¿Es el mal real, y si es así, se puede medir? Pregunta retórica. La respuesta es sí, sólo hay que ser un genio."' }
    ];

    useLayoutEffect(() => {
        AOS.init({
            duration: 1000,
            easing: 'ease-out-cubic',
            offset: 120,
            once: false,
            mirror: false
        });
    }, []);

    useLayoutEffect(() => {
        if (frase) {
            AOS.refreshHard();
        }
    }, [frase]);

    useLayoutEffect(() => {
        const idx = Math.floor(Math.random() * frases.length);
        setFrase(frases[idx]);
    }, []);

  return (
      <div className="homepage">
          <div className="background-test-home">
              <div
                  className="title_and_quote_container_home"
                  data-aos="zoom-in"
                  data-aos-delay="300"
              >
                  <Titulo />
              </div>

              {frase && (
                  <div
                      className="highlight-container"
                      data-aos="flip-up"
                      data-aos-delay="1500"
                  >
                      <p className="highlight-text">
                          <Typewriter text={frase.texto} speed={40} delay={2500} />
                      </p>
                  </div>
              )}
          </div>
          <div className="carousel-personajes-section">
              <CarouselPersonajes />
              <TextoPersonajes />
          </div>
          <div className="carousel-lugares-section">
              <TextoLugares />
              <CarouselLugares />
          </div>
          <div className="carousel-episodios-section">
              <TextoEpisodios />
              <CarouselEpisodios />
          </div>
          <Footer />
      </div>
  );
}

export default Home;
