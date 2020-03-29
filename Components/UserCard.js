import React, {useEffect, useState} from 'react';
import {
    View,
    StyleSheet, Text, ActivityIndicator, Platform
} from 'react-native';
import Colors from "./Colors";
import { LinearGradient } from 'expo-linear-gradient';
import {useSelector} from "react-redux";
import Fonts from "./Fonts";
import LottieView from "lottie-react-native";
import {loadingAnimation} from "../Animations";

const UserCard = (props) => {
    let animation;
    const state = useSelector(state => state);
    let addressView = (<View></View>);
    let address1;
    if (Platform.OS === 'ios') {
        address1 = props.location[0].name;
    } else {
        address1 = props.location[0].name + ' ' + props.location[0].street
    }
    let city = props.location[0].city
        + ', ' + props.location[0].region;
    let address3 = props.location[0].postalCode
        + ' ' + props.location[0].isoCountryCode;
    return (
        <LinearGradient
            style={styles.userCard}
            colors={[Colors.black, Colors.black]}
        >
            <View style={styles.userCardLocationContainer}>
                <Text style={styles.userCardLocation}>
                    {city}
                </Text>
            </View>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    userCard: {
        display: 'flex',
        flexDirection: 'column',
        minWidth: '100%',
        maxWidth: '100%',
        padding: 10,
        borderRadius: 15,
        backgroundColor: Colors.pink,
    },
    userCardLocationContainer: {
        display: 'flex',
        flexWrap: 'wrap'
    },
    userCardLocation: {
        fontFamily: Fonts.titanOne,
        color: Colors.lightBlue,
        fontSize: 36,
        width: '100%',
        letterSpacing: 1,
        textAlign: 'center',
    },
});

export default UserCard;