import React, { Component } from 'react';
import {View, StyleSheet, Image, Text, TouchableOpacity} from 'react-native';
import {connect} from "react-redux";
import Colors from "./Colors";
import {LinearGradient} from "expo-linear-gradient";
import Fonts from "./Fonts";

class WeatherCard extends Component {
    state = {
        unit: 'C',
        weather: 0,
        isMounted: false
    };
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.setState({
           isMounted: true,
        });
    }

    componentWillUnmount() {
        this.setState({
            isMounted: false
        });
    }

    componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS): void {
        if (this.props.weather !== prevProps.weather) {
            if (this.state.isMounted) {
                this.setState({
                    weather: Math.round(this.props.weather.main.temp)
                });
            }
        }
    }

    convertToC= () => {
        if (this.state.unit === 'F') {
            let result = (this.state.weather - 32) * (5 / 9);
            this.setState({
                weather: Math.round(result)
            });
            this.setState({
                unit: 'C'
            });
        }
    };

    convertToF = () => {
        if (this.state.unit === 'C') {
            let result = (this.state.weather * (9/5)) + 32;
            this.setState({
                weather: Math.round(result)
            });
            this.setState({
                unit: 'F'
            });
        }
    };

    render() {
        if (this.props.weather && this.props.weather.weather) {
            return (
                <LinearGradient
                    style={styles.weatherCard}
                    colors={[Colors.yellow, Colors.orange]}
                >
                <View style={styles.weatherTemperature}>
                    <Text style={styles.weatherTemperatureText}>
                        {this.state.weather
                        + String.fromCharCode(176)
                        + (this.state.unit === 'C' ? 'C' : 'F')}
                    </Text>
                </View>
                <View style={styles.weatherImageContainer}>
                    <View style={styles.weatherImageView}>
                        <Image
                            style={styles.weatherImage}
                            source={{uri: this.props.weather.weather[0].icon}}
                        />
                    </View>
                    <View style={styles.weatherTemperatureMainContainer}>
                        <Text style={styles.weatherTemperatureMain}>
                            {this.props.weather.weather[0].main}
                        </Text>
                    </View>
                </View>
                <View style={styles.convertTemperatureView}>
                    <TouchableOpacity
                        style={styles.celsiusView}
                        onPress={this.convertToC}
                    >
                        <Text style={styles.conversionText}>
                            C {' '}
                        </Text>
                    </TouchableOpacity>
                    <Text style={styles.conversionText}>
                        / {' '}
                    </Text>
                    <TouchableOpacity
                        style={styles.fahrenheitView}
                        onPress={this.convertToF}
                    >
                        <Text style={styles.conversionText}>
                            F
                        </Text>
                    </TouchableOpacity>
                </View>
                </LinearGradient>
            );
        } else {
            return (
                <View>

                </View>
            );
        }
    }
}

const styles = StyleSheet.create({
    weatherCard: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        minWidth: '100%',
        maxWidth: '100%',
        height: 125,
        borderRadius: 15,
        backgroundColor: Colors.pink,
    },
    weatherImageContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
    },
    weatherImageView: {

    },
    weatherImage: {
        margin: 0,
        width: 80,
        height: 80,
        resizeMode: 'cover'
    },
    weatherTemperature: {
        alignSelf: 'center'
    },
    weatherTemperatureText: {
        color: Colors.white,
        fontSize: 24,
        fontWeight: 'bold',
        fontFamily: Fonts.primary,
    },
    weatherTemperatureMainContainer: {
        alignSelf: 'center'
    },
    weatherTemperatureMain: {
        color: Colors.white,
        fontSize: 24,
        fontWeight: 'normal',
        fontFamily: Fonts.primary,
    },
    convertTemperatureView: {
        alignSelf: 'center',
        flexDirection: 'row'
    },
    celsiusView: {

    },
    conversionText: {
        color: Colors.white,
        fontSize: 24,
        fontWeight: 'normal',
        fontFamily: Fonts.primary,
    },
    fahrenheitView: {

    }
});

function mapStateToProps(state) {
    return {
        user: state.currentUser,
        location: state.currentLocation,
        weather: state.currentWeather
    }
}

export default connect(mapStateToProps)(WeatherCard);