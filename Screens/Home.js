import React, {useState} from 'react';
import {
    View,
    StyleSheet, Button, ScrollView,
} from 'react-native';
import * as firebase from "firebase";
import Login from "./Login";
import ActionBar from "../Components/ActionBar";
import Colors from "../Components/Colors";
import Fonts from "../Components/Fonts";
import UserCard from "../Components/UserCard";

const Home = props => {
    const onLogout = () => {
        firebase.auth().signOut().then(() => {
            return (
                <Login/>
            );
        });
    };

    const onDelete = () => {
        props.data.navigation.navigate({routeName: 'ConfirmDelete'});
    };

    return (
        <View style={styles.container}>
            <ActionBar style={[styles.actionBar, styles.title]}/>
            <ScrollView contentContainerStyle={styles.container}>
                <View style={styles.userCardContainer}>
                    <UserCard/>
                </View>
                <Button title={'logout'} onPress={onLogout}/>
                <Button title={'Delete'} onPress={onDelete}/>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: Colors.black
    },
    titleContainer: {
        margin: 10,
    },
    userCardContainer: {
        margin: 5,
        padding: 5
    },
    title: {
        textAlign: 'center',
        fontSize: 24,
        fontWeight: 'normal',
        color: Colors.white,
        fontFamily: Fonts.primary,
        letterSpacing: 3
    }
});

export default Home;
