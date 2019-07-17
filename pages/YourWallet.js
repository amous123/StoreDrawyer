import React, { Component } from 'react';
import {createStackNavigator, createAppContainer} from 'react-navigation';
import { Alert,AppRegistry, FlatList, StyleSheet, Text, View, ScrollView,TouchableOpacity,AsyncStorage } from 'react-native';
import { Card, ListItem, Button, Icon, Image } from 'react-native-elements';
import retailCard from '../retailCard';
import {Actions} from 'react-native-router-flux';


class FlatListItem extends Component{
    render() {
      return (
        <View style = {styles.mainContainer}>
            <View style = {styles.TextViewStyle}>
                <Text style={styles.TextStyle}>{this.props.item.name}</Text>
            </View>
        </View>
      );
    }
  }


export default class YourWallet extends Component{
    static navigationOptions = {
      title: 'Your Wallet',
    };

    constructor(props){
        super(props)
        //initialize a default list for testing purposes
        var cards = [];
        var ae  = new retailCard("American Eagle",0,1,0,1);
        var gap = new retailCard("Gap",0,2,0,1);
        var starbucks = new retailCard("Starbucks",0,3,"1234 5678 9876 5432",0);
        var secondCup = new retailCard("Second Cup",0,4,0,0);
        var shell = new retailCard("Shell",0,5,0,2);
        var esso = new retailCard("Esso",0,6,0,2);
        var tims = new retailCard("Tims",0,7,0,0);
        var mcdonalds = new retailCard("McDonald's",0,8,0,0);
        var newCard = new retailCard
        cards.push(ae,gap,starbucks,secondCup,shell,esso,tims,mcdonalds);
        this.state = {
            myCards : cards,
            foodCards:[],
            clothingCards:[],
            gasCard:[],
        }

    }

    categorizeArr(){
        var items = this.state.myCards;
        for(var i = 0; i < items.length; i++){
            switch(items[i].category){
                case 0:
                    this.state.foodCards.push(items[i]);
                    break;
                case 1:
                        this.state.clothingCards.push(items[i]);
                        break;
                case 2:
                        this.state.gasCard.push(items[i]);
                        break;
            }
        }
    }

    async componentDidMount(){
        this.categorizeArr();
        this.setTempCard();
    }

    async setTempCard(){
      try{
        await AsyncStorage.setItem('activeCard', this.state.secondCup)
      }catch(error){
        console.log(error)
        console.log("Error setting temporary card")
      }
    }

    cardview(item){
      Actions.cardview({card:item});
    }

    newCard(){
      Alert.alert(
        'Add a new card',
        'Add a new card to your wallet by scanning your card or entering the details manually',
        [
          {text: 'Cancel', onPress: () => console.log('Cancel Press')},
          {
            text: 'Scan Card',
            onPress: () => console.log('Scan card pressed'),
            style: 'cancel',
          },
          {text: 'Enter Details',
           onPress: () =>this.addcard()},
        ],
        {cancelable: false},
      );
    }

    addcard(){
      console.log("enter details pressed");
      Actions.addcard();
    }


    render(){
        return(
            <View style= {styles.mainView}>
                <View style = {styles.headers}><Text style = {styles.titles}>Food</Text></View>
                <FlatList 
                contentContainerStyle={{flexGrow: 1, justifyContent: 'center'}}
                horizontal={true}
                data = {this.state.foodCards}
                extraData = {this.state}
                style= {styles.FlatListStyle}
                renderItem = {({item,index}) => {
                    return (
                        <View>
                          <TouchableOpacity onPress={() => this.cardview(item)}>
                            <FlatListItem
                             item = {item} index = {index}>
                            </FlatListItem>
                            </TouchableOpacity>
                        </View>
                    );
                }}
                keyExtractor={(item, index) => index.toString()} 
                
                >
                </FlatList>
                <View style = {styles.headers}><Text style = {styles.titles}>Clothing</Text></View>
                <FlatList 
                contentContainerStyle={{flexGrow: 1, justifyContent: 'center'}}
                horizontal={true}
                data = {this.state.clothingCards}
                extraData = {this.state}
                style= {styles.FlatListStyle}
                renderItem = {({item,index}) => {
                    return (
                        <View>
                            <FlatListItem item = {item} index = {index}>
                            </FlatListItem>
                        </View>
                    );
                }}
                keyExtractor={(item, index) => index.toString()} 
                
                >

                </FlatList>
                <View style = {styles.headers}><Text style = {styles.titles}>Gas</Text></View>
                <FlatList 
                contentContainerStyle={{flexGrow: 1, justifyContent: 'center'}}
                horizontal={true}
                data = {this.state.gasCard}
                extraData = {this.state}
                style= {styles.FlatListStyle}
                renderItem = {({item,index}) => {
                    return (
                        <View>
                            <FlatListItem item = {item} index = {index}>
                            </FlatListItem>
                        </View>
                    );
                }}
                keyExtractor={(item, index) => index.toString()} 
                
                >

                </FlatList>
                  <View style = {styles.offerButton}>
                    <TouchableOpacity
                    style={styles.button}
                    onPress={() => this.newCard()}
                    >
                      <Text style = {styles.newCard}> Add a new loyalty card </Text>
                    </TouchableOpacity>
                  </View>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    mainView: {
      flex:1,
      backgroundColor: 'white',
      marginBottom:0,
    },
    headers: {
        backgroundColor: 'white',
        borderColor:'black',
        borderBottomWidth:1,
        marginRight:100,
        marginLeft:100,
    },
    titles: {
        color: '#12799f',
        textAlign: 'center',
    },
    TextViewStyle:
    {
        borderColor: '#292F36',
        borderWidth: 1,
        borderRadius: 25,
        margin: 5,
        width:150,
        height:75,
        justifyContent: 'center',
        alignItems: 'center'
    },
    FlatListStyle:{
      backgroundColor:'white',
      marginBottom:0,
    },
 
    TextStyle:
    {
        textAlign: 'center',
        color: '#12799f', 
        padding: 10,
    },
    mainContainer:{
        flexDirection: 'row',
        justifyContent : 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    listStyle:{
    justifyContent : 'center',
    alignItems: 'center',
    },
    offerButton:{
      marginTop:95,
      marginLeft:20,
      marginRight:20,
      backgroundColor:'white',
      marginBottom:5,
  },
  button:{
    alignItems: 'center',
    backgroundColor: '#0099ff',
    padding: 10,
    borderRadius:50,
  },
  newCard:{
    color:'white',
  }
  });