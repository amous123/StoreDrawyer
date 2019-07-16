import React, { Component } from 'react';
import {Router, Stack, Scene} from 'react-native-router-flux';

import Login from './pages/LogInPage';
import Signup from './pages/SignUpPage';
import Yourwallet from './pages/YourWallet';
import Cardview from './pages/CardView';

export default class Routes extends Component {
    render() {
        return (
            <Router barButtonIconStyle ={styles.barButtonIconStyle}
                hideNavBar={false} 
                navigationBarStyle={{backgroundColor: '#F7F7FF',}} 
                titleStyle={{color: 'black',}}
            >
                <Stack key="root">
                <Scene key="login" component={Login} title="Login"/>
                <Scene key="signup" component={Signup} title="Sign up"/>
                <Scene key="yourwallet" component={Yourwallet} title="Wallet"/>
                <Scene key="cardview" component={Cardview} title="Cards"/>
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
