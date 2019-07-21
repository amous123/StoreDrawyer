import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';
import FormSignUp from '../components/FormSignUp';
import {Actions} from 'react-native-router-flux';
 
export default class SignUpPage extends Component {
 
    // Function to return to Login page
    goBack() {
        Actions.pop()
    }
 
    render() {
        return(
            <View style={styles.container}>
                <Text>{'\n'}</Text>
                <Text>{'\n'}</Text>

                {/* Form component for Signup page */}
                <FormSignUp type="Signup"/>

                {/* Button to return to Login page */}
                <View style={styles.signupTextCont}> 
                    <Text style={styles.signupText}>Already have an account? </Text>
                    <TouchableOpacity onPress={this.goBack}><Text style={styles.signupButton}>Sign in</Text></TouchableOpacity>
                </View>
            </View>
        )
    }
}
 
// Styles for Sign up page
const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'white'
    },
    signupTextCont: {
      flexGrow: 1,
      justifyContent: 'center',
      alignItems: 'flex-end',
      paddingVertical: 16,
      flexDirection: 'row'
    },
    signupText: {
      color: '#12799f', 
      fontSize:16
    },
    signupButton: {
        color: '#12799f',
        fontSize:16,
        fontWeight: '500'
    }
});
