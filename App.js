import { Platform,View,Text } from 'react-native';

function Controlers() {
  if (Platform.OS === 'web') {
    let WebControler = require('./controlers/webControler').default;
    return (
      <WebControler />
    );
  } else {
    let MovileControler = require('./controlers/movileControler').default;
    return (
      <MovileControler />
    );
  }
  
}

export default Controlers;