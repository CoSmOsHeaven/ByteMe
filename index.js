import App from './App';
import { Platform } from 'react-native';
import { registerRootComponent } from 'expo';

if (Platform.OS === 'web') {
  import('react-dom').then(({ render }) =>
    render(<App />, document.getElementById('root'))
  );
} else {
    registerRootComponent(App);
}
