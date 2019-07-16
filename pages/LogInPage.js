import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, AsyncStorage, Keyboard } from 'react-native';
 
import {Actions} from 'react-native-router-flux';
 
import Form from '../components/Form';
 
export default class LogInPage extends Component {
    // static navigationOptions = {
    // title: 'Log In',
    // };
 
    signup() {
        Actions.signup()
    }

    adam(){
        Actions.yourwallet();
    }


 
    render() {
        return(
                <View style={styles.container}>
                <Text>{'\n'}</Text>
                <Text>{'\n'}</Text>
                <Form type="Login"/>
                <View style={styles.signupTextCont}> 
                    <Text style={styles.signupText}>Dont have an account yet? </Text>
                    <TouchableOpacity onPress={this.signup}><Text style={styles.signupButton}>Signup</Text></TouchableOpacity>
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
      backgroundColor: 'white',
    },
    signupTextCont: {
      flexGrow: 1,
      justifyContent: 'center',
      alignItems: 'flex-end',
      paddingVertical: 16,
      flexDirection: 'row',
    },
    signupText: {
      color: '#12799f', 
      fontSize:16,
    },
    signupButton: {
        color: '#12799f',
        fontSize:16,
        fontWeight: '500',
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
//   TextInput,
//   AsyncStorage,
// } from 'react-native';
// import {createStackNavigator, createAppContainer} from 'react-navigation';
// import Icon from 'react-native-vector-icons/FontAwesome';
// import { Input, Button } from 'react-native-elements';
// import Users from '../Users';


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
//   },
//   input: {
//     alignSelf: 'center',
//     color: 'black',
//     marginLeft: 15,
//   }
// });

// var users = [];

// export default class LogInPage extends Component{
//   static navigationOptions = {
//     title: 'Log In',
//   };

//   constructor(props){
//       super(props)
//       //initialize a default list for testing purposes
//       var Alex  = new Users("Alex", "123", "Alex123@mail.com", "something");
//       var Sagal  = new Users("Sagal", "234", "Sagal234@mail.com", "something");
//       var Adam  = new Users("Adam", "345", "Adam345@mail.com", "something");
//       var Matt  = new Users("Matt", "456", "Matt345@mail.com", "something");

//       users.push(Alex, Sagal, Adam, Matt);
//       this.state = {
//           username : '',
//           password : ''
//       }
//   }

//   // saveData = async()=>{
//   //   const{username, password} = this.state;

//   //   let loginDetails={
//   //     email: email,
//   //     password: password
//   //   }
//   // }

//   saveData =async()=>{
//     const {username,password} = this.state;

//     //save data with asyncstorage
//     let loginDetails={
//         username: username,
//         password: password
//     }

//     if(this.props.type !== 'Login')
//     {
//         AsyncStorage.setItem('loginDetails', JSON.stringify(loginDetails));

//         Keyboard.dismiss();
//         alert("You successfully registered. username: " + username + ' password: ' + password);
//         this.login();
//     }
//     else if(this.props.type == 'Login')
//     {
//         try{
//             let loginDetails = await AsyncStorage.getItem('loginDetails');
//             let ld = JSON.parse(loginDetails);

//             if (ld.username != null && ld.password != null)
//             {
//                 if (ld.username == username && ld.password == password)
//                 {
//                     alert('Go in!');
//                 }
//                 else
//                 {
//                     alert('username and Password does not exist!');
//                 }
//             }

//         }catch(error)
//         {
//             alert(error);
//         }
//     }
// }

// showData = async()=>{
//   let loginDetails = await AsyncStorage.getItem('loginDetails');
//   let ld = JSON.parse(loginDetails);
//   alert('username: '+ ld.username + ' ' + 'password: ' + ld.password);
// }

//   render() {
//     const {navigate} = this.props.navigation;
//       return (
//         <View style={styles.container}>
//           <View style={styles.welcome}>
//             <Text style={styles.text}>Welcome to Store Drawyer!</Text>
//           </View>

          // <Input
          // leftIcon={
          //   <Icon
          //     name='user'
          //     size={24}
          //     color='black'
              
          //   />
          // }
          //   inputStyle={{ marginLeft: 15 }}
          //   placeholder='JohnDoe123'
          //   label='USERNAME:'
          //   onChangeText={(username) => this.setState({username})}
          //   onSubmitEditing={()=> this.password.focus()}
          //   // errorStyle={{ color: 'red' }}
          //   // errorMessage='ENTER A VALID USERNAME'
          // />

          // <Input
          // leftIcon={
          //   <Icon
          //     name='lock'
          //     size={24}
          //     color='black'
          //   />
          // }
          //   inputStyle={{ marginLeft: 15 }}
          //   placeholder='NeverGonnaGiveYouUp123'
          //   label='PASSWORD:'
          //   onChangeText={(password) => this.setState({password})} 
          //   secureTextEntry={true}
          //   ref={(input) => this.password = input}
          //   // errorStyle={{ color: 'red' }}
          //   // errorMessage='ENTER A VALID PASSWORD'
          // />

//           <Button
//             title="Log In"
//             type="solid"
//             raised="true"
//             onPress={this.saveData}
            
//           />

//           <Button
//             title="Sign Up"
//             type="outline"
//             onPress={() => navigate('SignUpPage')}
//           />

//         </View>
        
//       );
//   }
// }