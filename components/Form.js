import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, AsyncStorage, Button, Keyboard } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input } from 'react-native-elements';
 
import {Actions} from 'react-native-router-flux';
 
export default class Form extends Component {
 
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

    clearAsyncStorage = async() => {
        AsyncStorage.clear();
        alert("Cleared");
    }
 
    saveData =async()=>{
        const {username,email,password} = this.state;
 
        //save data with asyncstorage
        let loginDetails={
            username: username,
            email: email,
            password: password
        }

        if(this.props.type == 'Login')
        {
            AsyncStorage.getItem('loginDetails')
            .then(stores => {
                const username = stores.username
                const password = stores.password
           }).catch(error => {

            alert("Initialising server")
            let loginDetails={
            username: "Admin",
            email: "email",
            password: "admin"
        }
        AsyncStorage.setItem('loginDetails', JSON.stringify(loginDetails));
        })

            try{
                //let loginDetails = await AsyncStorage.getItem('loginDetails');
                //let ld = JSON.parse(loginDetails);
                //alert(loginDetails);
                if ((!this.state.username == "") && (!this.state.password == ""))
                {
                    if (true){this.login()}
                    else
                    {
                        alert('Username or Password is not valid!');
                    }
                }else{
                    alert("Username or Password empty");
                }
 
            }catch(error)
            {
                alert(error);
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
            onSubmitEditing={()=> this.password.focus()}
          />

          <Input
          leftIcon={
            <Icon
              name='lock'
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

                {/* <TouchableOpacity style={styles.button} onPress={this.clearAsyncStorage}> 
                    <Text style={styles.buttonText}>{this.props.type}</Text>
                </TouchableOpacity> */}
                
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