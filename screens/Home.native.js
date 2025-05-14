import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import Typewriter from 'react-native-typewriter';

const Home = () => {
  const [frase, setFrase] = useState(null);

  const frasesRickMorty = [
    {
      texto: "Todos los hospitales tienen un médico que dicen que es el mejor médico de toda la galaxia.",
      personaje: "rick",
      imagen: require('../assets/rick.png'),
    },
    {
      texto: "Los padres son simplemente niños teniendo más niños.",
      personaje: "morty",
      imagen: require('../assets/morty.png'),
    },
    {
      texto: "Las bodas son básicamente funerales con un pastel.",
      personaje: "rick",
      imagen: require('../assets/rick.png'),
    },
    {
      texto: "No huyas. Nadie existe a propósito. Nadie pertenece a ninguna parte. Todos vamos a morir. Ven a ver la televisión.",
      personaje: "morty",
      imagen: require('../assets/morty.png'),
    },
    {
      texto: "¿Y qué hay acerca de la realidad donde Hitler curó el cáncer, Morty? La respuesta es: no pienses en ello.",
      personaje: "rick",
      imagen: require('../assets/rick.png'),
    },
    {
      texto: "¡Estoy harto de todas estas aventuras tan locas! ¡Eso fue demasiado traumático!",
      personaje: "morty",
      imagen: require('../assets/morty.png'),
    },
    {
      texto: "Wubba Lubba Dub Dub",
      personaje: "rick",
      imagen: require('../assets/rick.png'),
    },
    {
      texto: "¿Tienes a un planeta completo generando electricidad para ti? ¡Eso es esclavitud!",
      personaje: "morty",
      imagen: require('../assets/morty.png'),
    },
    {
      texto: "¡Estoy tratando de reparar el arma creadora de portales con partes de una muñeca sexual y tengo que hacerlo con una sola mano!",
      personaje: "rick",
      imagen: require('../assets/rick.png'),
    },
  ];

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * frasesRickMorty.length);
    setFrase(frasesRickMorty[randomIndex]);
  }, []);

  return (
    <View style={styles.homepage}>
      {frase && (
        <View style={styles.fraseContainer}>
          <Image source={frase.imagen} style={styles.avatar} />
          <Text style={styles.fraseText}>
            <Typewriter typing={1} minDelay={80} maxDelay={80}>
              {frase.texto}
            </Typewriter>
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  homepage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  fraseContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  fraseText: {
    fontSize: 18,
    color: '#000',
  },
});

export default Home;
