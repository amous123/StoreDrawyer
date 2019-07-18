import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, AsyncStorage, Keyboard } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input } from 'react-native-elements';
 
import {Actions} from 'react-native-router-flux';
//import console = require('console');
 
export default class FormSignUp extends Component {
 
    constructor(props){
        super(props);
        this.state={
            username: '',
            email:'',
            password: ''
        }
    }

    login(){
        Actions.yourwallet();
    }
 
    saveData =async()=>{
        const {username,email,password} = this.state;
 
        //save data with asyncstorage
        let loginDetails={
            username: username,
            email: email,
            password: password
        }
 
        if(this.props.type !== 'Login')
        {
            try{
                //let loginDetails = await AsyncStorage.getItem('loginDetails');
                //let ld = JSON.parse(loginDetails);
                //alert(loginDetails);
                //alert(ld.username +":"+ username);
                if(email.includes("@")){
                    
                    //AsyncStorage.setItem('loginDetails', JSON.stringify(loginDetails));
 
                    Keyboard.dismiss();
                    alert("You successfully registered. Username: " + username + " Email: " + email + ' password: ' + password);
                    this.login();
                }else{
                    alert('Email has the wrong format!');
                }

            }catch(error){
                alert('error'+error);
            }

        }
    }
 
    showData = async()=>{
        let loginDetails = await AsyncStorage.getItem('loginDetails');
        let ld = JSON.parse(loginDetails);
        alert('username: '+ ld.username + ' ' + 'email: '+ ld.email + ' ' + 'password: ' + ld.password);
    }
 
    render() {
        return(
            <View style={styles.container}>

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
 
                <TouchableOpacity style={styles.button} onPress={this.saveData}> 
                    <Text style={styles.buttonText}>{this.props.type}</Text>
                </TouchableOpacity>
            </View>
            
        )
    }
}
 
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