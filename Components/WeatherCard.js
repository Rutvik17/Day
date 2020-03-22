import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import {connect} from "react-redux";
import {getCurrentWeather} from "../Services/WeatherService";
import {bindActionCreators} from "redux";
import {currentWeather} from "../Redux/Actions/Actions";

class WeatherCard extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    componentWillUnmount() {

    }

    render() {
        return (
            <View>

            </View>
        );
    }
}

const styles = StyleSheet.create({

});

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        currentWeather: currentWeather
    }, dispatch);
}

function mapStateToProps(state) {
    return {
        user: state.currentUser,
        location: state.currentLocation
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WeatherCard);