import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MainNavigator from './MainNavigator';
import { NavigationService, navigationRef } from 'services/NavigationService';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
const AppNavigation = () => {
    return (
        <NavigationContainer
            ref={navigationRef}
        >
            <GestureHandlerRootView>
                <MainNavigator />
            </GestureHandlerRootView>
        </NavigationContainer>
    );
};

export default AppNavigation;