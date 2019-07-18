import React, { Component } from 'react';
import {Router, Stack, Scene} from 'react-native-router-flux';

import Login from './pages/LogInPage';
import Signup from './pages/SignUpPage';
import Yourwallet from './pages/YourWallet';
import Cardview from './pages/CardView';
import AddCard from './pages/AddCard';
import ScanCard from './pages/ScanCard';
<<<<<<< HEAD
=======
import Transaction from './pages/Transation';
>>>>>>> dd0119b41b03f7f798e5349e821308451d4221e1

export default class Routes extends Component {
    render() {
        return (
            <Router barButtonIconStyle ={styles.barButtonIconStyle}
                hideNavBar={false} 
                navigationBarStyle={{backgroundColor: '#F7F7FF',}} 
                titleStyle={{color: 'black',}}
            >
                <Stack key="root">
                <Scene key="yourwallet" component={Yourwallet} title="Wallet"/>
                <Scene key="transac" component={Transaction} title="New Transaction"/>
                <Scene key="addcard" component={AddCard} title="New Loyalty Card"/>
                <Scene key="login" component={Login} title="Login"/>
                <Scene key="signup" component={Signup} title="Sign up"/>
                <Scene key="cardview" component={Cardview} title="Cards"/>
                <Scene key="scancard" component={ScanCard} title="Scan Barcode"/>
<<<<<<< HEAD
                <Scene key="addcard" component={AddCard} title="New Loyalty Card"/>
=======
>>>>>>> dd0119b41b03f7f798e5349e821308451d4221e1
                </Stack>
            </Router>
        )
    }
}

const styles = {
    barButtonIconStyle: {
        tintColor: 'white'
    }
}
