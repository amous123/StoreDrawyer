import React, { Component } from 'react';
import { 
  StyleSheet,
  Text,
  View,
  StatusBar
} from 'react-native';
import Routes from './Routes';

export default class App extends Component   {
  render() {
    return (
      <View style={styles.container}>
        {/* Navigation bar */}
        <StatusBar
          barStyle="dark-content"
        />
        <Routes/>
      </View>
    );
  }
}
 
// Styles for App initialisation
const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});
