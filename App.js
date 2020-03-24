import React, {useState} from 'react';
import {
    StatusBar,
    StyleSheet,
    View,
} from 'react-native';
import * as firebase from 'firebase';
import firebaseConfig from './FirebaseConfig';
import {AppLoading, SplashScreen} from 'expo';
import AppNavigator from "./Screens/AppNavigator";
import {Provider} from "react-redux";
import {createStore} from "redux";
import allReducers from "./Redux/Reducers/Index";
import * as Font from 'expo-font';

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default function App() {
    const [appReady, setAppReady] = useState(false);
    SplashScreen.preventAutoHide();
    setTimeout(() => {
        SplashScreen.hide();
        setAppReady(true);
    }, 1000);
    const store = createStore(
        allReducers,
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    );
    Font.loadAsync({
        'raleway': require('./assets/Fonts/Raleway/Raleway-Regular.ttf'),
        'raleway-bold': require('./assets/Fonts/Raleway/Raleway-Bold.ttf'),
        'balooda-regular': require('./assets/Fonts/BalooDa2/BalooDa2-Regular.ttf'),
        'balooda-bold': require('./assets/Fonts/BalooDa2/BalooDa2-Regular.ttf'),
        'varela-regular': require('./assets/Fonts/VarelaRound/VarelaRound-Regular.ttf'),
        'josefin-regular': require('./assets/Fonts/JosefinSans/JosefinSans-Regular.ttf'),
        'josefin-bold': require('./assets/Fonts/JosefinSans/JosefinSans-Bold.ttf'),
        'indie-flower-regular': require('./assets/Fonts/IndieFlower/IndieFlower-Regular.ttf')
    })
    if(appReady) {
        return (
            <Provider store={store}>
                <View style={styles.container}>
                    <StatusBar barStyle="light-content"/>
                    <AppNavigator />
                </View>
            </Provider>
        );
    } else {
        return (
            <AppLoading />
        );
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});
