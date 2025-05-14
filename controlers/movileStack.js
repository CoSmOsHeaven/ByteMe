
import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import About from '../screens/About';
import Home from '../screens/Home.native';
import Contact from '../screens/Contact';
import Personajes from '../screenFunctions/screenPersonajes.native';

const { width, height } = Dimensions.get("window");

const Stack = createNativeStackNavigator();

const MovileStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="1" component={About} />
            <Stack.Screen name="2" component={Home} />
            <Stack.Screen name="3" component={Contact} />
            <Stack.Screen name="4" component={Personajes} />
        </Stack.Navigator>
    );
};

export default MovileStack;