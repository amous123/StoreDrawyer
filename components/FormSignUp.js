import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, AsyncStorage, Keyboard } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input } from 'react-native-elements';
import {Actions} from 'react-native-router-flux';
 
export default class FormSignUp extends Component {
 
    // Constructor for user data
    constructor(props){
        super(props);
        this.state={
            username: '',
            email:'',
            password: ''
        }
    }

    // Function to go to wallet page(home)
    login(){
        Actions.yourwallet();
    }
 
    // Function to save input data
    saveData =async()=>{
        const {username,email,password} = this.state;
 
        //save data with asyncstorage
        let loginDetails={
            username: username,
            email: email,
            password: password
        }
 
        // If statement to make sure this is signup page
        if(this.props.type !== 'Login')
        {
            // Storing user information will be performed by back-end
            // in the future iteration of application
            try{
                // If statements to make sure inputs are not empty and email is in the correct format (contains '@')
                if ((!this.state.username == "") && (!this.state.password == "")){
                    if(email.includes("@")){
                        Keyboard.dismiss();
                        alert("You successfully registered. Username: " + username + " Email: " + email + ' password: ' + password);
                        console.log(this.state);
                        this.login();
                    }else{
                        alert('Email has the wrong format!');
                    }
                }
                else{
                    alert("Username or Password empty");
                }

            }catch(error){
                alert('error'+error);
            }

        }
    }
 
    // Function to show user data
    showData = async()=>{
        let loginDetails = await AsyncStorage.getItem('loginDetails');
        let ld = JSON.parse(loginDetails);
        alert('username: '+ ld.username + ' ' + 'email: '+ ld.email + ' ' + 'password: ' + ld.password);
    }
 
    render() {
        return(
            <View style={styles.container}>

            {/* Username input */}
            <Input
          leftIcon={
            <Icon
              name='user'
              size={24}
              color='black'
              
            />
          }
            inputStyle={{ marginLeft: 15 }}
            placeholder='JohnDoe123'
            label='USERNAME:'
            onChangeText={(username) => this.setState({username})}
            onSubmitEditing={()=> this.email.focus()}
          />

            {/* Email input */}
            <Input
          leftIcon={
            <Icon
              name='envelope'
              size={24}
              color='black'
              
            />
          }
            inputStyle={{ marginLeft: 15 }}
            placeholder='JohnDoe123@example.ca'
            label='EMAIL:'
            onChangeText={(email) => this.setState({email})}
            onSubmitEditing={()=> this.password.focus()}
            ref={(input) => this.email = input}
          />

          {/* Password input */}
          <Input
          leftIcon={
            <Icon
              name='key'
              size={24}
              color='black'
            />
          }
            inputStyle={{ marginLeft: 15 }}
            placeholder='NeverGonnaGiveYouUp123'
            label='PASSWORD:'
            onChangeText={(password) => this.setState({password})}  
            secureTextEntry={true}
            ref={(input) => this.password = input}
          />
 
                {/* Sign up button */}
                <TouchableOpacity style={styles.button} onPress={this.saveData}> 
                    <Text style={styles.buttonText}>{this.props.type}</Text>
                </TouchableOpacity>
            </View>
            
        )
    }
}
 
// Styles for FormSignUp component
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '80%',
    },
    inputBox: {
        width: 300,
        backgroundColor: '#eeeeee', 
        borderRadius: 25,
        paddingHorizontal: 16,
        fontSize: 16,
        color: '#002f6c',
        marginVertical: 10
    },
    button: {
        width: 300,
        backgroundColor: '#4f83cc',
        borderRadius: 25,
        marginVertical: 10,
        paddingVertical: 12
    },
    buttonText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#ffffff',
        textAlign: 'center'
    }
});