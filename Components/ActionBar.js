import React from 'react';
import {
    View,
    Text,
    StyleSheet,
} from 'react-native';
import Colors from "./Colors";
import Fonts from "./Fonts";
import { FontAwesome } from '@expo/vector-icons';

const ActionBar = props => {
    const {style, ...rest} = props;
    if(props.error) {
        let error = props.error;
        return (
            <View style={styles.errorContainer}>
                <View>
                    <Text style={styles.error}>
                        {error}
                    </Text>
                </View>
            </View>
        );
    }
    if(props.backArrow) {
        return (
            <View style={[styles.container, style]} {...rest}>
                <View style={styles.leftContainer}>
                    <FontAwesome onPress={() => props.data.navigation.pop()} style={[styles.icon]} name="angle-left" size={32}/>
                </View>
            </View>
        );
    }
    return (
        <View style={[styles.container, style]} {...rest}>
            <View style={styles.titleContainer}>
                <Text style={[styles.title, style]} {...rest}>
                    {props.name}
                </Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: 70,
        width: '100%',
        backgroundColor: Colors.black,
        flexDirection: 'row',
    },
    errorContainer: {
        height: 70,
        width: '100%',
        backgroundColor: Colors.pink,
        justifyContent: 'flex-start',
    },
    titleContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 35,
    },
    leftContainer: {
        marginTop: 35,
        marginLeft: 20,
        flexDirection: 'row',
        justifyContent: 'flex-start'
    },
    icon: {
        color: Colors.white,
    },
    title: {
        textAlign: 'center',
        fontSize: 24,
        fontWeight: 'bold',
        color: Colors.white,
        fontFamily: Fonts.primary
    },
    error: {
        textAlign: 'center',
        fontSize: 12,
        fontWeight: 'normal',
        color: Colors.white,
        marginTop: 40,
        fontFamily: Fonts.primary
    }
});

export default ActionBar;
