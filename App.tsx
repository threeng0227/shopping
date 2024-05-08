


import { Colors } from 'constants/colors.constants';
import AppNavigation from 'navigation';
import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from 'redux/store';

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SafeAreaProvider>
          <StatusBar barStyle={'dark-content'} translucent backgroundColor={Colors.transparent} />
          <AppNavigation />
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;

