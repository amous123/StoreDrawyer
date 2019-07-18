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
        // //initialize a default list for testing purposes
        // var cards = [];
        // var gap = new retailCard("Gap",0,2,0,1);
        // var starbucks = new retailCard("Starbucks",0,3,"1234 5678 9876 5432",0);
        // var secondCup = new retailCard("Second Cup",0,4,0,0);
        // var shell = new retailCard("Shell",0,5,0,2);
        // var esso = new retailCard("Esso",0,6,0,2);
        // var tims = new retailCard("Tims",0,7,0,0);
        // var mcdonalds = new retailCard("McDonald's",0,8,0,0);
        // var newCard = new retailCard
        // cards.push(ae,gap,starbucks,secondCup,shell,esso,tims,mcdonalds);
        this.state = {
            myCards : [],
            foodCards:[],
            clothingCards:[],
            gasCard:[],
        }

    }

    categorizeArr(){
        var foodCardsArr =[];
        var clothingCardsArr =[];
        var gasCardArr =[];
        var items = this.state.myCards;
        for(var i = 0; i < items.length; i++){
            switch(items[i].category){
                case 0:
                    foodCardsArr.push(items[i]);
                    this.setState({
                      foodCards :foodCardsArr, 
                    })
                    break;
                case 1:
                    clothingCardsArr.push(items[i]);
                    this.setState({
                      clothingCards :clothingCardsArr, 
                    })
                        break;
                case 2:
                    gasCardArr.push(items[i]);
                    this.setState({
                      gasCard :gasCardArr, 
                    })
                        break;
            }
        }
    }

<<<<<<< HEAD
    async componentDidMount(){
        this.categorizeArr();
        this.setTempCard();
    }

    async setTempCard(){
      try{
        await AsyncStorage.setItem('activeCard', this.state.myCards(0))
      }catch(error){
        console.log(error)
        console.log("Error setting temporary card")
      }
=======
    componentDidMount(){
      this.getUserCards();    
    }

    async getUserCards(){
      try{
        const cardsarr = await AsyncStorage.getItem('userCards')
        const parsedCardsarr = JSON.parse(cardsarr);
        if(cardsarr !== null){
          console.log("usercards exists")
          //usercards array exists, update the state
          this.setState({
            myCards:parsedCardsarr,
          });
        }
        else{
          //no usercards array exists
          console.log("no userCards array exists, setting empty array")
          await AsyncStorage.setItem('userCards', JSON.stringify([]))
        }
      }catch(error){
        console.log(error);
        console.log("getUsercards threw an unexpected error")
      }
      // var gap = new retailCard("Gap",0,2,0,1);
      // var cards = [];
      // cards.push(gap);
      // this.setState({
      //   myCards:cards,
      // })
      // var item = this.state.myCards;
      // try{  
      //   await AsyncStorage.setItem('userCards', JSON.stringify(item))
      // }catch(error){
      //   console.log("error caught")
      // }
      this.categorizeArr();
>>>>>>> dd0119b41b03f7f798e5349e821308451d4221e1
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
            onPress: () => this.scancard(),
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

<<<<<<< HEAD
=======
    scancard(){
      console.log("scan card pressed");
      Actions.scancard();
    }

>>>>>>> dd0119b41b03f7f798e5349e821308451d4221e1

    render(){
        return(
            <View style= {styles.mainView}>
              <Image 
            style={styles.help}
            source = {require('../assets/help.png')}></Image>
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
                         <TouchableOpacity onPress={() => this.cardview(item)}>
                            <FlatListItem item = {item} index = {index}>
                            </FlatListItem>
                            </TouchableOpacity>
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
                          <TouchableOpacity onPress={() => this.cardview(item)}>
                            <FlatListItem item = {item} index = {index}>
                            </FlatListItem>
                            </TouchableOpacity>
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
  },
  help:{
    marginTop:0,
    height:20,
    width:20,
    position:'absolute',
    marginLeft:375,
  },
  });