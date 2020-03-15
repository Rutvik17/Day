import React, {useState} from 'react'
import {
    View,
    StyleSheet,
    ActivityIndicator
} from 'react-native'
import * as firebase from "firebase";
import Home from "./Home";
import Login from "./Login";
import UpdateUserName from "./updateUserName";
import {Provider, useDispatch} from "react-redux";
import {currentUser} from "../Redux/Actions/Actions";

const Index = props => {
    const [user, setUser] = useState();
    const dispatch = useDispatch();
    try {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                setUser(user);
            } else {
                setUser(user);
                dispatch(currentUser(user));
            }
        });
    } catch (err) {
        console.log('error: ', err.message)
    }

    if (user) {
        dispatch(currentUser(user));
        if (!user.displayName) {
            return (
                <UpdateUserName data={props}/>
            );
        } else {
            return (
                <Home data={props}/>
            );
        }
    } else if (!user) {
        return (
            <Login/>
        );
    } else {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#0000ff"/>
            </View>
        );
    }
};

const styles = StyleSheet.create({
    welcome: {
        fontSize: 28
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default Index;
