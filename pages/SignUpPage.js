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
  // static navigationOptions = {
  //   title: 'Sign Up',
  //   };
 
    goBack() {
        Actions.pop()
    }
 
    render() {
        return(
            <View style={styles.container}>
                <Text>{'\n'}</Text>
                <Text>{'\n'}</Text>
                <FormSignUp type="Signup"/>
                <View style={styles.signupTextCont}> 
                    <Text style={styles.signupText}>Already have an account? </Text>
                    <TouchableOpacity onPress={this.goBack}><Text style={styles.signupButton}>Sign in</Text></TouchableOpacity>
                </View>
            </View>
        )
    }
}
 
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


// import React, { Component } from 'react';
// import {
//   AppRegistry,
//   StyleSheet,
//   Text,
//   Image,
//   View, 
//   KeyboardAvoidingView,
//   Platform,
//   ScrollView,
//   TouchableOpacity,
// } from 'react-native';
// import {createStackNavigator, createAppContainer} from 'react-navigation';
// import Icon from 'react-native-vector-icons/FontAwesome';
// import { Input, Button } from 'react-native-elements';


// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: 'powderblue',
//     justifyContent: 'space-evenly',
//     padding: 30,
//   },
//   welcome: {
//     flex: 0,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   text: {
//     fontSize: 24,
//   }
// });

// class SignUp extends Component{
//   static navigationOptions = {
//     title: 'Sign Up',
//   };


//       render() {
//         const {navigate} = this.props.navigation;
//           return (
//             <View style={styles.container}>

//               <Input
//               leftIcon={
//                 <Icon
//                   name='user'
//                   size={24}
//                   color='black'
                  
//                 />
//               }
//                 inputStyle={{ marginLeft: 15 }}
//                 placeholder='JohnDoe123'
//                 label='USERNAME:'
//                 containerStyle=''
//                 errorStyle={{ color: 'red' }}
//                 errorMessage='ENTER A VALID USERNAME'
//               />

//               <Input
//               leftIcon={
//                 <Icon
//                   name='envelope'
//                   size={24}
//                   color='black'
                  
//                 />
//               }
//                 inputStyle={{ marginLeft: 15 }}
//                 placeholder='JohnDoe@example.com'
//                 label='EMAIL:'
//                 containerStyle=''
//                 errorStyle={{ color: 'red' }}
//                 errorMessage='ENTER A VALID EMAIL ADDRESS'
//               />

//               <Input
//               leftIcon={
//                 <Icon
//                   name='key'
//                   size={24}
//                   color='black'
//                 />
//               }
//                 inputStyle={{ marginLeft: 15 }}
//                 placeholder='NeverGonnaGiveYouUp123'
//                 label='PASSWORD:'
//                 errorStyle={{ color: 'red' }}
//                 errorMessage='ENTER A VALID PASSWORD'
//               />

//               <Button
//                 title="Save and Log In"
//                 type="solid"
//                 raised="true"
//                 onPress={() => navigate('YourWallet')}
//               />

//             </View>
            
//           );
//       }
// }

// export default SignUp;

// // export default class UselessTextInputMultiline extends Component{
// //   constructor(props) {
// //     super(props);
// //     this.state = {
// //       text: 'Useless Multiline Placeholder',
// //     };
// // }

// //   // If you type something in the text box that is a color, the background will change to that
// //   // color.
// //   render() {
// //     return (
// //      <View style={{
// //        backgroundColor: this.state.text,
// //        borderBottomColor: '#000000',
// //        borderBottomWidth: 1 }}
// //      >
// //        <UselessTextInput
// //          multiline = {true}
// //          numberOfLines = {4}
// //          onChangeText={(text) => this.setState({text})}
// //          value={this.state.text}
// //        />
// //      </View>
// //     );
// // }
// // }

// // AppRegistry.registerComponent(
// //   'AwesomeProject',
// //   () => UselessTextInputMultiline
// //  );