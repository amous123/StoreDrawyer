//Page for adding a new card to user's wallet
import * as React from 'react';
import { AsyncStorage, Alert, View, ScrollView, KeyboardAvoidingView, StyleSheet, TouchableOpacity, Dimensions, Keyboard, UIManager } from 'react-native';
import * as Permissions from 'expo-permissions';
import SafeArea from 'react-native-safe-area-view';
import styled from 'styled-components';
import { TextInput, Headline, List, Text, HelperText } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import RadioForm from 'react-native-simple-radio-button';
import { Actions } from 'react-native-router-flux';
import retailCard from '../retailCard';
import {Image} from 'react-native-elements'

const Section = styled.View`
flex-direction: column;
justify-content: flex-start;
padding: 10px 20px 10px 20px;
background: #FFF;
`;

const Heading = styled.Text`
font-size: 14px;
color: #9DA8BA;
text-align: center;
margin-bottom: 10px;
`;

const SectionItem = styled.View`
flex: 1;
flex-direction: column;
justify-content: center;
align-items: flex-start;  
`;

const CardInputItem = styled.View`
flex: 1;
flex-direction: row;
justify-content: center;
align-items: flex-start;
`; 

const styles = StyleSheet.create({
    cardInputItem: {
        justifyContent: "center",
        alignItems: "flex-start",
        height: 25,
        fontSize:18,
    },
    validNumber: {
        justifyContent: "center",
        alignItems: "flex-start",
        borderWidth : 1,
        borderColor : "#157A6E",
        height: 25,
        fontSize:18,
    },
    heading:{
        fontSize: 14,
        color: '#9DA8BA',
        textAlign: 'left',
        marginBottom: 0,
        paddingLeft:"2%",
    },
    sectionItem:{
        flex:1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    textIn:{
        marginLeft: 15,
        marginRight: 15,
        width: 50,
    },
    input: {
        paddingBottom: "3%",
        fontSize:14,
        borderRadius: 5,
        marginBottom: "7%",
        width: 300,
        justifyContent: 'center',
        backgroundColor: '#ffffff',
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
      },
})


const Subheading = styled.Text`
font-size: 16px;
color: #213052;
text-align: left;
`;

const { State: TextInputState } = TextInput;

var radio_props = [
    {label: 'Food', value: 0, fontSize:30 },
    {label: 'Clothing', value: 1 },
    {label: 'Gas', value:2}
  ];

export default class AddCard extends React.Component {
    static navigationOptions = {
      title: 'INSERT CARD INFORMATION',
    };
    constructor(props) { 
        super(props);
        this.state = { 
            firstName: '',
            lastName: '', 
            name:'',
            cardName:'',
            cardNumber: '',
            cardCategory: 0,
            currentPoints:0,
            checked: 'first',
            radioState:0,
            userCards:[],

            validFN: false,
            validLN: false,
            validCa: false,
            validCN: false,
            expanded: true
        }
    }

    yourWallet(){
        Actions.yourwallet();
    }

    async addCard(){
        var cardToAdd  = new retailCard(
            this.state.cardName,
            this.state.currentPoints,
            69,
            this.state.cardNumber,
            this.state.cardCategory,
            );
        var cards = this.state.userCards;
        cards.push(cardToAdd);
        const item = JSON.stringify(cards);
        try{
            await AsyncStorage.setItem('userCards',item);
        }catch(error){
            console.log("newCard thre an error!")
        }
        this.newCard();
    }
    newCard(){
        Alert.alert(
            'New Card Added',
            'Congradulations ' + this.state.name +  " your " + this.state.cardName + " card with point balance of " + this.state.currentPoints + " has been properly saved",
            [
              {text: 'Proceed to wallet',
               onPress: () =>this.yourWallet()},
            ],
            {cancelable: false},
          );
      }

    _handlePress = () =>
    this.setState({
      expanded: !this.state.expanded
    });

    updateCategory = (cardCategory) => {
        this.setState({cardCategory:cardCategory});
    }
    
    async componentDidMount() {
        this.getPermissionsAsync();
        this.getUserCards();
    }
    
    getPermissionsAsync = async () => {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({ hasCameraPermission: status === 'granted' });
    };

    validateFN = (input) => {
        this.setState({validFN: input.length >= 2, firstName: input});
    }
    
    validateLN = (input) => {
        this.setState({validLN: input.length >= 2, lastName: input});
    }

    validateCA = (input) => {
        this.setState({validCa: input.length >= 2 && input != 0, cardNumber: input});
    }

    validateCN = (input) => {
        this.setState({validCa: input.length >= 8, cardNumber: input});
    }

    async getUserCards(){
        try{
        const card = await AsyncStorage.getItem('userCards');
        const parsedCardsarr = JSON.parse(card);
        if(card !== null){
            this.setState({
                userCards:parsedCardsarr,
            })
        }
    }catch(error){
        console.log("Get user cards threw an error")
    }
    }

    

  render() { 
    const { checked } = this.state;

    const {shift} = this.state;

    const radioToggleOff = <View style={{justifyContent: 'center'}}>
                            <Icon name="radio-button-unchecked" size={30} color="#1C88E5" />
                        </View>;
    const radioToggleOn = <View style={{justifyContent: 'center'}}>
                                <Icon name="radio-button-checked" size={30} color="#1C88E5" />
                        </View>;
      return (
          <View style={{backgroundColor: 'white'}}> 
              <SafeArea style={{backgroundColor: 'white'}}>
                <KeyboardAvoidingView style={{backgroundColor: 'white'}} behavior="padding" enabled>
                    <ScrollView style={{backgroundColor: 'white', paddingBottom:100}}>
                        <Section>
                            <SectionItem>
                                <Heading style={styles.heading}>Card owner information</Heading>
                            </SectionItem>
                            <TextInput 
                                        label= "First Name"
                                        outlined="true"
                                        style={styles.input}
                                        theme={{ colors: { primary: "#1C88E5", background:"#ffffff", underlineColor:'#1C88E5'}}}
                                        onChangeText={(firstName) => {this.setState({firstName: firstName}) ; console.log(this.state) ; this.validateFN(firstName) ; this.setState({name: firstName})}}
                                        onSubmitEditing={() => { this.lastNameInput.focus()}}
                                        error={this.state.firstName && !this.state.validFN}
                                        value={this.state.firstName}/>
                                        <HelperText
                                        type="error"
                                        visible={this.state.firstName && !this.state.validLN}
                                        >
                                            Cannot put an empty card owner name
                                        </HelperText>

                            
                            <TextInput 
                                        label = "Last Name"
                                        style={styles.input}
                                        theme={{ colors: { primary: "#1C88E5", background:"#ffffff", underlineColor:'#1C88E5'}}}
                                        // onChangeText={(lastName) => this.setState({lastName: lastName})}
                                        onChangeText={(lastName) => {this.setState({lastName: lastName}) ; console.log(this.state) ; this.validateLN(lastName) ; this.setState({name: this.state.firstName+ " " + lastName})}}
                                        value={this.state.lastName}
                                        error={this.state.lastName && !this.state.validLN}
                                        ref = {(input) => this.lastNameInput = input}/>
                                    <HelperText
                                        type="error"
                                        visible={!this.state.validLN && this.state.lastName}
                                        >
                                            Cannot put an empty card owner name
                                        </HelperText>
                        </Section>
                        <Section>
                            <SectionItem>
                                <Heading style={styles.heading}>Card information</Heading>
                            </SectionItem>
                            <TextInput 
                                        label = "Card Name"
                                        style={styles.input}
                                        theme={{ colors: { primary: "#1C88E5", background:"#ffffff", underlineColor:'#1C88E5'}}}
                                        onChangeText={(cardName) => {this.setState({cardName: cardName}) ; console.log(this.state) ; this.validateCN(cardName) } }
                                        error={ this.state.cardName && !this.state.validCN}
                                        onSubmitEditing={() => this.cardNumberInput.focus()}
                                        value={this.state.cardName}/>
                                    <HelperText
                                        type="error"
                                        visible={!this.state.validCN && this.state.cardName}
                                        >
                                            Cannot put an empty card establishment name
                                        </HelperText>
                                <TextInput 
                                        label = "Card Number"
                                        style={styles.input}
                                        keyboardType="decimal-pad"
                                        returnKeyType="done"
                                        theme={{ colors: { primary: "#1C88E5", background:"#ffffff", underlineColor:'#1C88E5'}}}
                                        onChangeText={(cardNumber) => { this.setState({cardNumber: cardNumber}) ; console.log(this.state) ; this.validateCA(cardNumber)} }
                                        ref = {(input) => this.cardNumberInput = input}
                                        onSubmitEditing={() => this.cardPointInput.focus()}
                                        value={this.state.cardNumber}/>
                                        <HelperText
                                        type="error"
                                        visible={!this.state.validCa && this.state.cardNumber}
                                        >
                                            Cannot put an empty card number
                                        </HelperText>
                                <TextInput
                                    label = "Current points"
                                    style={styles.input}
                                    keyboardType="decimal-pad"
                                    returnKeyType="done"
                                    theme={{ colors: { primary: "#1C88E5", background:"#ffffff", underlineColor:'#1C88E5'}}}
                                    onChangeText={(currentPoints) => this.setState({currentPoints: currentPoints})}
                                    ref = {(input) => this.cardPointInput = input}
                                    value={this.state.currentPoints}/>
                                <Text style={styles.input}>Choose a card category</Text>
                                <RadioForm
                                placeholder = "Choose a card category"
                                radio_props={radio_props}
                                initial={0}
                                onPress={(value) => {this.setState({cardCategory:value})}}
                                />
                        </Section>
                        <View style = {styles.offerButton}>
                            <TouchableOpacity
                            style={styles.button}
                            onPress={() => this.addCard()}
                            >
                                <Text style = {styles.newCard}> Add a new loyalty card </Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
              </SafeArea>
          </View>
      );
  }
}


