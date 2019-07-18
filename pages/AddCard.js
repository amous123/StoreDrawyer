//Page for adding a new card to user's wallet
import * as React from 'react';
<<<<<<< HEAD
import { View, TextInput, ScrollView, KeyboardAvoidingView, StyleSheet, Picker } from 'react-native';
import * as Permissions from 'expo-permissions';
import SafeArea from 'react-native-safe-area-view';
import styled from 'styled-components';

const Section = styled.View`
flex-direction: row;
justify-content: flex-start;
padding: 15px 20px;
=======
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
>>>>>>> dd0119b41b03f7f798e5349e821308451d4221e1
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
<<<<<<< HEAD
        //borderWidth : 3,
        //borderColor : "#FE4A49",
=======
>>>>>>> dd0119b41b03f7f798e5349e821308451d4221e1
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
<<<<<<< HEAD
    }
})

=======
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


>>>>>>> dd0119b41b03f7f798e5349e821308451d4221e1
const Subheading = styled.Text`
font-size: 16px;
color: #213052;
text-align: left;
`;

<<<<<<< HEAD
export default class AddCard extends React.Component {
    static navigationOptions = {
      title: 'New Loyalty Card',
=======
const { State: TextInputState } = TextInput;

var radio_props = [
    {label: 'Food', value: 0, fontSize:30 },
    {label: 'Clothing', value: 1 },
    {label: 'Gas', value:2}
  ];

export default class AddCard extends React.Component {
    static navigationOptions = {
      title: 'INSERT CARD INFORMATION',
>>>>>>> dd0119b41b03f7f798e5349e821308451d4221e1
    };
    constructor(props) { 
        super(props);
        this.state = { 
            firstName: '',
            lastName: '', 
<<<<<<< HEAD
            cardNumber: '',
            cardCategory: 0,
        }
    }
=======
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
>>>>>>> dd0119b41b03f7f798e5349e821308451d4221e1

    updateCategory = (cardCategory) => {
        this.setState({cardCategory:cardCategory});
    }
    
    async componentDidMount() {
        this.getPermissionsAsync();
<<<<<<< HEAD
    }
    
    formatCardNumber = (cardNumber) => {
        if (cardNumber.length >= 18) {
            this.setState({cardNumLimit: true});
            this.setState({cardNumber: cardNumber.slice(0, 19)}); 
            return;
        }else{
            this.setState({cardNumLimit:false});
            var regexExpression = /(\d{4})/g;
            var match = regexExpression.exec(cardNumber);
            var formattedCardNumber = "";
            
            while (match && this.state.cardNumLimit == false) {
                formattedCardNumber += match[0] + ( formattedCardNumber.length == 15 ? "" : "-");
                match = regexExpression.exec(cardNumber);
            }
            
            if (formattedCardNumber.length != 0) {
                formattedCardNumber += cardNumber.slice(formattedCardNumber.length, cardNumber.length);
                this.setState({cardNumber: formattedCardNumber}) ;
            }
            else {
                this.setState({cardNumber: cardNumber});
            }
        }
=======
        this.getUserCards();
>>>>>>> dd0119b41b03f7f798e5349e821308451d4221e1
    }
    
    getPermissionsAsync = async () => {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({ hasCameraPermission: status === 'granted' });
    };
<<<<<<< HEAD
    
    onTextChanged(t, cardNum) { //callback for immediate state change
        console.log(cardNum.length)
        if (cardNum.length == 3){
            if (t == 16) { }
            if (t == 2) { this.setState({ autoFocus1: false, autoFocus2: true }, () => { console.log(this.state) }) }
            if (t == 3) { this.setState({ autoFocus2: false, autoFocus3: true }, () => { console.log(this.state) }) }
            if (t == 4) { this.setState({ autoFocus3: false, autoFocus4: true }, () => { console.log(this.state) }) }
        }
      }

  render() { 
      return (
          <View>
            <SafeArea>
                <KeyboardAvoidingView behavior="padding" enabled> 
                    <ScrollView>
                        <View>
                        <Section>
                            <SectionItem>
                                <Heading>
                                    {'Insert card information'.toUpperCase()} 
                                </Heading>
                            </SectionItem>
                        </Section> 
                        <Section>
                            <SectionItem>
                                <View>
                                    <Subheading>First Name</Subheading>
                                    <TextInput 
                                    placeholder="First Name"
                                    style={{height: 100}}
                                    onChangeText={(firstName) => {this.setState({firstName: firstName}) ; console.log(this.state)}}
                                    value={this.state.firstName}/>
                                </View>
                            </SectionItem>
                            <SectionItem>
                                <View> 
                                    <Subheading>Last Name</Subheading>
                                    <TextInput 
                                    placeholder="Last Name"
                                    style={{height: 100}}
                                    onChangeText={(lastName) => this.setState({lastName: lastName})}
                                    value={this.state.lastName}/>
                                </View>
                            </SectionItem>
                        </Section>
                        <Section>
                            <Subheading>Card Number</Subheading>
                        </Section>
                        <Section >
                            <SectionItem>
                                <View style={CardInputItem}>
                                    <TextInput 
                                    ref={(TextInput) => { this.cardNumber = TextInput; }}
                                    keyboardType='numeric'
                                    returnKeyType='next'
                                    placeholder="0000000000000000"
                                    style={styles.cardInputItem}
                                    onChangeText={(cardNumber) => {this.setState({cardNumber:cardNumber})} }
                                    value={this.state.cardNumber}
                                    blurOnSubmit={false}
                                    maxLength={16}  
                                    />
                                </View>
                            </SectionItem>
                        </Section>
                        <Section>
                                <View>
                                    <Subheading>Category</Subheading>
                                    <Picker 
                                    selectedValue = {this.state.cardCategory} 
                                    onValueChange = {this.updateCategory}
                                    style={{ height: 100, width:100}}
                                    
                                    >
                                        <Picker.Item label = "Food" value = "0" />
                                        <Picker.Item label = "Clothing" value = "1" />
                                        <Picker.Item label = "Gas" value = "2" />
                                    </Picker>
                                </View>
                            <SectionItem>
                            </SectionItem>
                        </Section>
                        </View> 
                    </ScrollView>
                </KeyboardAvoidingView>
            </SafeArea>
=======

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
>>>>>>> dd0119b41b03f7f798e5349e821308451d4221e1
          </View>
      );
  }
}


