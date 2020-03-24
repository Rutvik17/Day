import React, { Component } from 'react';
import {Platform, View, StyleSheet, StatusBar, Button, ScrollView, Text, RefreshControl} from 'react-native';
import Constants from 'expo-constants';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import * as firebase from "firebase";
import Login from "./Login";
import ActionBar from "../Components/ActionBar";
import Colors from "../Components/Colors";
import Fonts from "../Components/Fonts";
import UserCard from "../Components/UserCard";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {currentLocationAction, currentWeather} from "../Redux/Actions/Actions";
import WeatherCard from "../Components/WeatherCard";
import {getCurrentWeather} from "../Services/WeatherService";
import LottieView from "lottie-react-native";
import {loadingAnimation} from "../Animations";

class Home extends Component {
    state = {
        location: null,
        errorMessage: null,
        locationPermission: null,
        refreshing: false,
        date: new Date()
    };
    constructor(props) {
        super(props);
        setInterval(() => {
            if (Platform.OS === 'ios') {
                this.setState({
                    date: [new Date().toLocaleString("en-US", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                    })]
                })
            } else {
                this.setState({
                    date: [new Date().toLocaleDateString()]
                });
            }
        }, 1000);
    }

    componentDidMount() {
        this.animation.play();
        this.getPermission();
    }

    onLogout = () => {
        firebase.auth().signOut().then(() => {
            return (
                <Login/>
            );
        });
    };

    onDelete = () => {
        this.props.data.navigation.navigate({routeName: 'ConfirmDelete'});
    };

    getPermission = async () => {
        if (Platform.OS === 'android' && !Constants.isDevice) {
            this.setState({
                errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
            });
            this.setState({
                refreshing: false
            });
        } else {
            try {
                let { status } = await Permissions.askAsync(Permissions.LOCATION);
                this.setState({
                    locationPermission: status
                });
                if (this.state.locationPermission === 'granted') {
                    this._getLocationAsync();
                }
                this.setState({
                    refreshing: false
                });
            } catch (e) {
                console.log(e);
                this.setState({
                    errorMessage: 'Something went wrong, please try again!',
                });
                this.setState({
                    refreshing: false
                });
            }
        }
    };

    _getLocationAsync = async () => {
        try {
            let location = await Location.getCurrentPositionAsync({});
            this.props.currentLocationAction(location);
            await getCurrentWeather(location.coords.latitude,
                location.coords.longitude).then((res) => {
                this.props.currentWeather(res);
            });
            location = await Location.reverseGeocodeAsync({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude
            });
            this.setState({ location });
        } catch (e) {
            console.log(e);
            this.setState({
                errorMessage: 'Something went wrong, please try again!',
            });
        }
    };

    onRefresh = () => {
        this.setState({
            refreshing: true
        });
        this.componentDidMount();
    };

    render() {
        if (this.state.locationPermission === 'granted' && this.state.location) {
            return (
                <View style={styles.container}>
                    <StatusBar barStyle="light-content"/>
                    <ActionBar
                        style={[styles.actionBar, styles.title]}
                        name={'DAY'}
                        error={this.state.errorMessage}
                    />
                    <ScrollView contentContainerStyle={styles.container}
                                refreshControl={<RefreshControl
                                    refreshing={this.state.refreshing}
                                    onRefresh={this.onRefresh}
                                    title="Pull to refresh"
                                    tintColor={Colors.grey}
                                    titleColor={Colors.grey}
                                />}
                    >
                        <View style={styles.userCardContainer}>
                            <UserCard location={this.state.location} date={this.state.date}/>
                        </View>
                        <View style={styles.homeScreenCardsContainers}>
                            <WeatherCard />
                        </View>
                        <View style={{margin: 2.5, padding: 2.5}}>
                            <View style={{margin: 2.5, padding: 2.5}}>
                                <Button title={'logout'} onPress={this.onLogout}/>
                            </View>
                            <View style={{margin: 2.5, padding: 2.5}}>
                                <Button title={'Delete'} onPress={this.onDelete}/>
                            </View>
                        </View>
                    </ScrollView>
                </View>
            );
        } else if (this.state.locationPermission === 'denied') {
            return (
                <View style={styles.locationPermissionContainer}>
                    <StatusBar barStyle="dark-content"/>
                        <Text style={{padding: 10, margin: 10, color: Colors.pink}}>
                            The app needs locations turned on to display information.
                            Please allow locations from settings.
                        </Text>
                </View>
            );
        } else {
            return (
                <LottieView style={styles.container}
                    ref={animation => {this.animation = animation}}
                    source={loadingAnimation}
                />
            );
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: Colors.black
    },
    locationPermissionContainer: {
        flex: 1,
        justifyContent: 'center',
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
    homeScreenCardsContainers: {
        margin: 5,
        padding: 5
    },
    title: {
        textAlign: 'center',
        fontSize: 24,
        color: Colors.white,
        fontFamily: Fonts.baloodaBold,
        letterSpacing: 3
    },
    actionBar: {
        backgroundColor: Colors.black
    }
});

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        currentLocationAction: currentLocationAction,
        currentWeather: currentWeather
    }, dispatch);
}

function mapStateToProps(state) {
    return {
        user: state.currentUser
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);