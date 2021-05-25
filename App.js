import React from 'react';
import {Navigation} from 'react-native-navigation';
import { StyleSheet, AppRegistry, Text, View } from 'react-native';
import HomeScreen from './components/HomeScreen.js'
import AddressList from './components/AddressList'
import LoginPage from './components/LoginPage';
import SigninPage from './components/SigninPage';
import AddFood from './components/AddFood'
import EditFood from './components/EditFood'
import MapScreen from './components/MapScreen'
import ShowChart from './components/ShowChart'

// AppRegistry.registerComponent('whatToEat', () => App);
Navigation.registerComponent('Login', () => LoginPage);
Navigation.registerComponent('Signin', () => SigninPage);
Navigation.registerComponent('HomeScreen', () => HomeScreen);
Navigation.registerComponent('AddressList', () => AddressList);
Navigation.registerComponent('AddFood', () => AddFood);
Navigation.registerComponent('EditFood', () => EditFood);
Navigation.registerComponent('MapScreen', () => MapScreen);
Navigation.registerComponent('ShowChart', () => ShowChart);

// Navigation.registerComponent('route-builder.PlaceDetailScreen', () => (props) => ( <Provider store={store}> <PlaceDetailScreen {...props} />
// </Provider> ), () => PlaceDetailScreen);
export const root = {
  root: {
    stack: {
      id: 'rootStack',
      children: [
        {
          component: {
            name: 'HomeScreen'
          }
        }
      ]
    }
  }
};
export const loginRoot = {
  root: {
    stack: {
      id: 'loginStack',
      children: [
        {
          component: {
            name: 'Login'
          }
        }
      ]
    }
  },
};
Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setRoot(loginRoot);
});
Navigation.setDefaultOptions({
  topBar: {
    visible: false
  }
});