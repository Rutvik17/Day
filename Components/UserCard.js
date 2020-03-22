import React, {useEffect, useState} from 'react';
import {
    View,
    StyleSheet, Text, ActivityIndicator
} from 'react-native';
import Colors from "./Colors";
import { LinearGradient } from 'expo-linear-gradient';
import {useSelector} from "react-redux";
import Fonts from "./Fonts";

const UserCard = (props) => {
    const state = useSelector(state => state);
    const [date, setDate] = useState(new Date().toLocaleString("en-US", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit"
    }));
    setInterval(() => {
        setDate(new Date().toLocaleString("en-US", {
            day: "numeric",
            month: "short",
            year: "numeric",
            hour: "numeric",
            minute: "2-digit"
        }))
    }, 1000);
    let addressView = (<View></View>);
    if (props.location && props.location.length) {
        let address1 = props.location[0].name;
        let address2 = props.location[0].city
            + ' ' + props.location[0].region;
        let address3 = props.location[0].postalCode
            + ' ' + props.location[0].isoCountryCode;
        addressView = (
            <View style={styles.userCardLocationContainer}>
                <Text style={styles.userCardLocation}>
                    {address1}
                </Text>
                <Text style={styles.userCardLocation}>
                    {address2}
                </Text>
                <Text style={styles.userCardLocation}>
                    {address3}
                </Text>
            </View>
        );
    }
    return (
        <LinearGradient
            style={styles.userCard}
            colors={[Colors.pink, Colors.grey]}
        >
            {props.location && props.location.length && addressView}
            <View style={styles.userCardDateContainer}>
                <Text style={styles.userCardDate}>
                    {date}
                </Text>
            </View>
            <View style={styles.userCardInfoContainer}>
                <Text style={styles.userCardInfo}>
                    {state.currentUser.displayName.toUpperCase()}
                </Text>
            </View>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    userCard: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        minWidth: '100%',
        height: 250,
        padding: 25,
        borderRadius: 15,
        backgroundColor: Colors.pink,
    },
    userCardLocationContainer: {
        display: 'flex',
        justifyContent: 'center',
    },
    userCardLocation: {
        fontFamily: Fonts.primary,
        color: Colors.white,
        fontSize: 20,
        fontWeight: 'normal',
        letterSpacing: 1
    },
    userCardDateContainer: {
        display: 'flex',
        justifyContent: 'center',
    },
    userCardDate: {
        fontFamily: Fonts.primary,
        fontSize: 20,
        color: Colors.white
    },
    userCardInfoContainer: {
        display: 'flex',
        justifyContent: 'center',
    },
    userCardInfo: {
        fontFamily: Fonts.primary,
        fontSize: 20,
        color: Colors.white,
    }
});

export default UserCard;