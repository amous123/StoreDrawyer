//Page for adding a new card to user's wallet
import * as React from 'react';
import { Alert, View, ScrollView, KeyboardAvoidingView, StyleSheet, TouchableOpacity, Dimensions, Keyboard, UIManager } from 'react-native';
import * as Permissions from 'expo-permissions';
import SafeArea from 'react-native-safe-area-view';
import styled from 'styled-components';
import { TextInput, Headline, List, Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import RadioForm from 'react-native-simple-radio-button';
import { Actions } from 'react-native-router-flux';

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
        fontSize: 22,
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
        fontSize:18,
        borderRadius: 5,
        marginBottom: "7%",
        width: 150,
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
      }
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
      title: 'New Transaction',
    };
    constructor(props) { 
        super(props);
        activecard = this.props.card;
        points = activecard.points;
        this.state = { 
            cardNumber: '1234 5678 9876 5432',
            cardRate: 2.5,
            currentPoints:points,
            amountSpent: 0,
            newPoints: 0,
        }
    }

    yourWallet(){
        Actions.yourwallet();
    }


    newCard(){
        Alert.alert(
            'Transaction saved',
            "Your Starbucks card now holds a balance of " + this.state.newPoints + " points!",
            [
                {text: 'Cancel', onPress: () => console.log('Cancel Press')},
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
        this.setState({validCa: input.length >= 2, cardNumber: input});
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
                                <Heading style={styles.heading}>Transaction Details</Heading>
                            </SectionItem>
                            <TextInput 
                                        label= "Total$"
                                        outlined="true"
                                        style={styles.input}
                                        keyboardType="decimal-pad"
                                        returnKeyType="done"
                                        theme={{ colors: { primary: "#1C88E5", background:"#ffffff", underlineColor:'#1C88E5'}}}
                                        onChangeText={(amountSpent) => {this.setState({amountSpent: amountSpent}) ; console.log(this.state) ;  this.setState({newPoints: this.state.currentPoints+(amountSpent*this.state.cardRate)}) ; console.log(this.state) }}
                                        value={this.state.amountSpent}/>
                        </Section>
                        <Section>
                            <SectionItem>
                            <Text style={{padding: 10, fontSize: 22, color: '#9DA8BA' }}>
                            Your current balance is : {  this.state.newPoints + this.state.currentPoints} points
                            </Text>
                            </SectionItem>
                        </Section>
                        <View style = {styles.offerButton}>
                            <TouchableOpacity
                            style={styles.button}
                            onPress={() => this.newCard()}
                            >
                                <Text style = {styles.newCard}> Save changes </Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
              </SafeArea>
          </View>
      );
  }
}


