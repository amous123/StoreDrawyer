import React, { Component } from 'react';
import {Router, Stack, Scene} from 'react-native-router-flux';

import Login from './pages/LogInPage';
import Signup from './pages/SignUpPage';
import Yourwallet from './pages/YourWallet';
import Cardview from './pages/CardView';
import AddCard from './pages/AddCard';
<<<<<<< HEAD
import ScanCard from './pages/ScanCard';
=======
>>>>>>> c3e1d2fbc0cb07198c69c81b27a911732b4ce796

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
                <Scene key="addcard" component={AddCard} title="New Loyalty Card"/>
                <Scene key="login" component={Login} title="Login"/>
                <Scene key="signup" component={Signup} title="Sign up"/>
                <Scene key="cardview" component={Cardview} title="Cards"/>
<<<<<<< HEAD
                <Scene key="scancard" component={ScanCard} title="Scan Barcode"/>
=======
                <Scene key ="addcard" component = {AddCard} title = "Add Card"/>
>>>>>>> c3e1d2fbc0cb07198c69c81b27a911732b4ce796
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
