//Page for adding a new card to user's wallet
import * as React from 'react';
import { View, TextInput, ScrollView, KeyboardAvoidingView, StyleSheet, Picker } from 'react-native';
import * as Permissions from 'expo-permissions';
import SafeArea from 'react-native-safe-area-view';
import styled from 'styled-components';

const Section = styled.View`
flex-direction: row;
justify-content: flex-start;
padding: 15px 20px;
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
        //borderWidth : 3,
        //borderColor : "#FE4A49",
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
    }
})

const Subheading = styled.Text`
font-size: 16px;
color: #213052;
text-align: left;
`;

export default class AddCard extends React.Component {
    static navigationOptions = {
      title: 'AddCard',
    };
    constructor(props) { 
        super(props);
        this.state = { 
            firstName: '',
            lastName: '', 
            cardNumber: '',
            cardCategory: 0,
        }
    }

    updateCategory = (cardCategory) => {
        this.setState({cardCategory:cardCategory});
    }
    
    async componentDidMount() {
        this.getPermissionsAsync();
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
    }
    
    getPermissionsAsync = async () => {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({ hasCameraPermission: status === 'granted' });
    };
    
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
          </View>
      );
  }
}


