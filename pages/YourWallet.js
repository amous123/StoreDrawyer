import React, { Component } from 'react';
import {createStackNavigator, createAppContainer} from 'react-navigation';
import { Alert,AppRegistry, FlatList, StyleSheet, Text, View, ScrollView,TouchableOpacity,AsyncStorage } from 'react-native';
import { Card, ListItem, Button, Icon, Image } from 'react-native-elements';
import retailCard from '../retailCard';
import {Actions} from 'react-native-router-flux';



//flat list item representing each card in the user's wallet
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
        // State variables initialized to hold the users cards,
        //food,clothing, and gas represent the different categories of cards the user has
        this.state = {
            myCards : [],
            foodCards:[],
            clothingCards:[],
            gasCard:[],
        }

    }
    //this method takes the initialize list of user cards and creates 3 new distinct arrays from them,
    //each array is a category of cards
    categorizeArr(){
        var foodCardsArr =[];
        var clothingCardsArr =[];
        var gasCardArr =[];
        var items = this.state.myCards;
        for(var i = 0; i < items.length; i++){
          //swtich case to push items to the appropriate arrays
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

    componentDidMount(){
      this.getUserCards();    
    }


    //use async storage to get the user cards
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
          //no usercards array exists, typically this will only run once on the first run
          console.log("no userCards array exists, setting empty array")
          await AsyncStorage.setItem('userCards', JSON.stringify([]))
        }
      }catch(error){
        console.log(error);
        console.log("getUsercards threw an unexpected error")
      }
      this.categorizeArr();
    }

    cardview(item){
      Actions.cardview({card:item});
    }

    //add new card button, displays an alert
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

    //go to add card page
    addcard(){
      console.log("enter details pressed");
      Actions.addcard();
    }
    
    //go to scancard
    scancard(){
      console.log("scan card pressed");
      Actions.scancard();
    }


    render(){
        return(
            <View style= {styles.mainView}>
              <Image 
            style={styles.help}
            source = {require('../assets/help.png')}></Image>
                {/* one of the headers used to seperate the different caetegories */}
                <View style = {styles.headers}><Text style = {styles.titles}>Food</Text></View>
                {/* A flat list is used to dynamically render the content of the categorized arrays
                3 flatlist in total are present, one for each array */}
                <FlatList 
                contentContainerStyle={{flexGrow: 1, justifyContent: 'center'}}
                horizontal={true}
                data = {this.state.foodCards}
                extraData = {this.state}
                style= {styles.FlatListStyle}
                renderItem = {({item,index}) => {
                    return (
                        <View>
                          {/* Each individual "card" gets surround by a touchable opacity, this is so that
                        a user may click the card and be sent to the cardview screen, display details for the selected card */}
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
                  {/* flatlist 2 */}
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
                  {/* flatlist 3 */}
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
                {/* add a new card button that is present on the bottom of the page */}
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