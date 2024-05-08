
import { HomeParamsList, screenOptions } from 'domain/types/Navigation';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CartScreen, HomeScreen, OrderDetailScreen, ChangeProfileScreen } from 'features/home';


const HomeStack = createNativeStackNavigator<HomeParamsList>();
function HomeNavigator() {
  return (
    <HomeStack.Navigator
      screenOptions={screenOptions}
    >
      <HomeStack.Screen
        name='HomeScreen'
        component={HomeScreen}
      />
      <HomeStack.Screen
        name='OrderDetailScreen'
        component={OrderDetailScreen}
      />
      <HomeStack.Screen
        name='ChangeProfileScreen'
        component={ChangeProfileScreen}
      />
      <HomeStack.Screen
        name='CartScreen'
        component={CartScreen}
      />

    </HomeStack.Navigator>
  );
}
export default HomeNavigator;