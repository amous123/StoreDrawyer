import React, { Component } from 'react';
import {createStackNavigator, createAppContainer} from 'react-navigation';
import {Alert,AppRegistry, FlatList, StyleSheet, Text, View, ScrollView,TouchableOpacity,AsyncStorage } from 'react-native';
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
            userCards:[],
        }

    }
    componentDidMount(){
        this.getUserCards();
      }

        // async method to get the user cards array from storage
        //getting the entire array is necessary as if a user chooses to delete a card then we must remove it from the cards
        //it might be possible to lazy load this array only if the user wants to delete a card or add a transaction
        //however, that might cause a delayed response time  
      async getUserCards(){
        try{
          const cardsarr = await AsyncStorage.getItem('userCards')
          const parsedCardsarr = JSON.parse(cardsarr);
          if(cardsarr !== null){
            console.log("usercards exists")
            //usercards array exists, update the state
            this.setState({
              userCards:parsedCardsarr,
            });
          }else{
              console.log("An unexpected error occured")
          }
        }catch(error){
          console.log(error);
          console.log("getUsercards threw an unexpected error")
        }
      }


    // method to delete the card if the user selectes that option
    // the card is found in the array by its name, if there is more than one with same name the first gets deleted
    //find the card and splice the array at its index
    //a way to improve this would be using a unique key for each card, eliminating the problem with duplicates
    async deleteCard(){
        var cardArr = this.state.userCards;
        var active = this.state.card;
        for(var i = 0; i <cardArr.length;i++){
            if(cardArr[i].name === active.name ){
                cardArr.splice(i,1);
            }
        }
        const item = JSON.stringify(cardArr);
        try{
            await AsyncStorage.setItem('userCards',item)
            Actions.yourwallet();
        }catch(error){
            console.log("delete card threw an error");
        }
    }

    //go to add transaction page
    addTransaction(){
        var card = this.state.card;
        Actions.transac({card:card});
    }

    //confirm the user wants to delete the card
    confirmDelete(){
        Alert.alert(
          'Delete Card',
          'Are you sure you want to delete this card?',
          [
            {text: 'Cancel', onPress: () => console.log('Cancel Press')},
            {
              text: 'Yes, delete this card',
              onPress: () => this.deleteCard(),
              style: 'cancel',
            },
          ],
          {cancelable: false},
        );
      }
    //   main user view
    render(){
        return(
            <View style = {styles.cont}>
            <View style = {styles.container}>
            <Image 
            style={styles.help}
            source = {require('../assets/help.png')}></Image>
            <View style ={styles.greeting}
            ><Text style ={styles.greetingText}>Good Afternoon, Adam</Text>
            <Image 
            style={styles.user}
            source = {require('../assets/user.png')}></Image>
            <Text style = {styles.cardNameStyle}>{this.state.card.name}</Text>
            </View>
                <View style = {styles.cardStyle}>
                    <View style = {styles.TextViewStyle}>
                    <Text style = {styles.TextStyle}> {this.state.card.name}</Text>
                    <Text style = {styles.TextStyle}>{this.state.card.cardNumber}</Text>
                    </View>
                </View>
                <Text>Current Balance: {this.state.card.points} points</Text>
            </View>
            <View style = {styles.offerButton}>
                <TouchableOpacity
                    style={styles.button}
                    onPress = {() => this.addTransaction()}
                >
                <Text style = {styles.offerStyle}> View Offers and More </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.removeButton}
                    onPress = {() => this.confirmDelete()}
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
        marginTop: 120,
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
    help:{
        marginTop:0,
        height:20,
        width:20,
        position:'absolute',
        marginLeft:375,
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