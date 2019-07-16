import React, { Component } from 'react';
import {createStackNavigator, createAppContainer} from 'react-navigation';
import { AppRegistry, FlatList, StyleSheet, Text, View, ScrollView,TouchableOpacity } from 'react-native';
import { Card, ListItem, Button, Icon, Image } from 'react-native-elements';
import retailCard from '../retailCard';
import {Actions} from 'react-native-router-flux';


const height = '60%';
const width = '100%';
export default class CardView extends Component{
    static navigationOptions = {
      title: 'My Rewards',
    };

    constructor(props){
        super(props)
        activecard = this.props.card;
        this.state = {
            card:activecard,
        }

    }
    componentDidMount(){
        console.log(this.state.card);
        console.log(this.state.card.cardNumber);
      }

    render(){
        return(
            <View style = {styles.cont}>
            <View style = {styles.container}>
            <View style ={styles.greeting}
            ><Text style ={styles.greetingText}>Good Afternoon, Adam</Text>
            <Image 
            style={styles.user}
            source = {require('../assets/user.png')}></Image>
            <Text style = {styles.cardNameStyle}>{this.state.card.name}</Text>
            </View>
                <View style = {styles.cardStyle}>
                    <View style = {styles.TextViewStyle}>
                    <Text style = {styles.TextStyle}>Adam Lawson</Text>
                    <Text style = {styles.TextStyle}>{this.state.card.cardNumber}</Text>
                    </View>
                </View>
                <Text>Current Balance: {this.state.card.points} points</Text>
            </View>
            <View style = {styles.offerButton}>
                <TouchableOpacity
                    style={styles.button}
                >
                <Text style = {styles.offerStyle}> View Offers and More </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.removeButton}
                >
                <Text style = {styles.removeStyle}> Remove Card </Text>
                </TouchableOpacity>
            </View>
            
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
      width,
      height,
      backgroundColor: 'white',
    },
    user:{
        width:50,
        height:50,
        marginLeft:'auto',
        marginRight:'auto',
    },
    greeting:{
        marginLeft:'auto',
        marginRight:'auto',
        color: '#12799f', 
         },
    cont:{
        flex: 1,
        backgroundColor: '#292F36'
    },
    cardStyle:{
        borderColor: '#292F36',
        borderWidth: 1,
        borderRadius: 25,
        flex: 1,
        justifyContent: 'flex-end',
        marginBottom: 10,
        marginTop: 140,
        marginLeft:20,
        marginRight:20,
        alignContent: 'center',
        justifyContent:'center',
        backgroundColor: '#F7F7FF'
    },
    headers: {
        backgroundColor: '#292F36'
    },
    titles: {
        color: '#F7F7FF',
        textAlign: 'center',
    },
    TextViewStyle:
    {
        marginTop:50,
        
    },
 
    TextStyle:
    {
        textAlign: 'left',
        color: '#000',
        padding: 10,

    
    },
    mainContainer:{
        flexDirection: 'row',
        justifyContent : 'center',
        alignItems: 'center',
    },
    listStyle:{
    justifyContent : 'center',
    alignItems: 'center',
    },
    offerButton:{
        marginTop:100,
        marginLeft:20,
        marginRight:20,
    },
    button:{
        alignItems: 'center',
        backgroundColor: '#0099ff',
        padding: 10,
        borderRadius:50,
    },
    cardNameStyle:{
        marginLeft:'auto',
        marginRight:'auto',
        color:'black',
        fontSize:32,
    },
    greetingText:{
        color: '#12799f',
    },
    offerStyle:{
        color:'white'
    },
    removeButton:{
        marginTop:5,
        alignItems: 'center',
        backgroundColor: 'red',
        padding: 10,
        borderRadius:50,
    },
    removeStyle:{
        color:'white'
    }
  });