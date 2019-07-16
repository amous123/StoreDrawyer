import React, { Component } from 'react';
import { 
  StyleSheet,
  Text,
  View,
  StatusBar
} from 'react-native';
import {createStackNavigator, createAppContainer} from 'react-navigation';
import LogInPage from './pages/LogInPage';
import SignUpPage from './pages/SignUpPage';
import YourWallet from './pages/YourWallet';
import CardView from './pages/CardView';
import Routes from './Routes';

export default class App extends Component   {
  render() {
    return (
      <View style={styles.container}>
        <StatusBar
          // backgroundColor="#F7F7FF" 
          barStyle="dark-content"
        />
        <Routes/>
      </View>
    );
  }
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});
