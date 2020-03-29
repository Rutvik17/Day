import React, { Component } from 'react';
import {View, StyleSheet, Image, Text, TouchableOpacity, ScrollView} from 'react-native';
import {connect} from "react-redux";
import Colors from "./Colors";
import {LinearGradient} from "expo-linear-gradient";
import Fonts from "./Fonts";

class WeatherCard extends Component {
    state = {
        unit: 'C',
        weather: 0,
        isMounted: false,
        feelsLikeWeather: 0,
    };
    weatherIcons = {
        '01d': require('../assets/WeatherDayIcons/sunny.png'),
        '02d': require('../assets/WeatherDayIcons/cloudy.png'),
        '03d': require('../assets/WeatherDayIcons/mostlycloudy.png'),
        '04d': require('../assets/WeatherDayIcons/partlycloudy.png'),
        '09d': require('../assets/WeatherDayIcons/chancerain.png'),
        '10d': require('../assets/WeatherDayIcons/rain.png'),
        '11d': require('../assets/WeatherDayIcons/storm.png'),
        '13d': require('../assets/WeatherDayIcons/snow.png'),
        '50d': require('../assets/WeatherDayIcons/fog.png'),
        '01n': require('../assets/WeatherNightIcons/clear.png'),
        '02n': require('../assets/WeatherNightIcons/cloudy.png'),
        '03n': require('../assets/WeatherNightIcons/mostlycloudy.png'),
        '04n': require('../assets/WeatherNightIcons/partlycloudy.png'),
        '09n': require('../assets/WeatherNightIcons/chancerain.png'),
        '10n': require('../assets/WeatherNightIcons/rain.png'),
        '11n': require('../assets/WeatherNightIcons/storm.png'),
        '13n': require('../assets/WeatherNightIcons/snow.png'),
        '50n': require('../assets/WeatherNightIcons/fog.png'),
    };
    constructor(props) {
        super(props);
        this.state = {
            unit: props.weather.sys.country === 'US' ? 'F' : 'C',
            weather: 0,
            isMounted: false,
            feelsLikeWeather: 0
        };
    }

    componentDidMount() {
        this.setState({
           isMounted: true,
        });
        this.setState({
            weather: Math.round(this.props.weather.main.temp),
            feelsLikeWeather: Math.round(this.props.weather.main['feels_like'])
        });
        if (this.state.unit === 'F') {
            this.setState({
                weather: Math.round(this.props.weather.main.temp * (9/5)) + 32,
                feelsLikeWeather: Math.round(this.props.weather.main['feels_like'] * (9/5)) + 32
            });
        }
    }

    componentWillUnmount() {
        this.setState({
            isMounted: false
        });
    }

    convertToC= () => {
        if (this.state.unit === 'F') {
            let result = (this.state.weather - 32) * (5 / 9);
            let feelsLike = (this.state.feelsLikeWeather - 32) * (5 / 9);
            this.setState({
                weather: Math.round(result)
            });
            this.setState({
                feelsLikeWeather: Math.round(feelsLike)
            });
            this.setState({
                unit: 'C'
            });
        }
    };

    convertToF = () => {
        if (this.state.unit === 'C') {
            let result = (this.state.weather * (9/5)) + 32;
            let feelsLike = (this.state.feelsLikeWeather * (9/5)) + 32;
            this.setState({
                weather: Math.round(result)
            });
            this.setState({
                feelsLikeWeather: Math.round(feelsLike)
            });
            this.setState({
                unit: 'F'
            });
        }
    };

    render() {
        let weatherIcon;
        this.props.weather.weather.map((r) => {
            for (let icon in this.weatherIcons) {
                if (r.icon === icon) {
                    weatherIcon = r.icon.toString();
                }
            }
        });
        let weatherForecastView = (<View>

        </View>);
        weatherForecastView = this.props.weatherForecast.list.map((weather, index) => {
            let icon;
            weather.weather.map((r) => {
                icon = r.icon.toString();
            });
            let time;
            time = new Date(weather.dt * 1000);
            time = new Intl.DateTimeFormat('default', {
                    hour12: true,
                    hour: 'numeric',
                    minute: 'numeric'
                }).format(time);
            return (
                <View style={styles.weatherForecastContainer} key={index}>
                    <View key={index + 1}>
                        <Text style={{color: Colors.brown, textAlign: 'center', fontSize: 16, fontFamily: Fonts.primary}}>
                            {time}
                        </Text>
                    </View>
                    <View key={index + 2}>
                        <Text style={{color: Colors.brown, textAlign: 'center', fontSize: 24, fontFamily: Fonts.primary}}>
                            {(this.state.unit === 'C' ? Math.round(weather.main.temp) : Math.round(weather.main.temp * (9/5) + 32))
                            + String.fromCharCode(176)
                            + (this.state.unit === 'C' ? 'C' : 'F')}
                        </Text>
                    </View>
                    <View key={index + 3}>
                        <Image
                            style={{margin: 0,
                                width: 65,
                                height: 65,
                                resizeMode: 'cover'}}
                            source={this.weatherIcons[icon]}
                        />
                    </View>
                    <View key={index + 4}>
                        <Text  style={{color: Colors.brown, textAlign: 'center', fontSize: 16, fontFamily: Fonts.primary}}>
                            {weather.weather[0].main}
                        </Text>
                    </View>
                </View>
            );
        });
        return (
            <View style={{height: 275}}>
                <LinearGradient
                    style={styles.weatherCard}
                    colors={[Colors.black, Colors.black]}
                >
                    <View style={styles.weatherTemperature}>
                        <View style={styles.weatherTemperatureTextView}>
                            <Text style={styles.weatherTemperatureText}>
                                {this.state.weather
                                + String.fromCharCode(176)
                                + (this.state.unit === 'C' ? 'C' : 'F')}
                            </Text>
                            <Text style={styles.weatherTemperatureFeelsLikeText}>
                                {'Feels Like ' + this.state.feelsLikeWeather
                                + String.fromCharCode(176)
                                + (this.state.unit === 'C' ? 'C' : 'F')}
                            </Text>
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
                    </View>
                    <View style={styles.weatherImageContainer}>
                        <View style={styles.weatherImageView}>
                            <Image
                                style={styles.weatherImage}
                                source={this.weatherIcons[weatherIcon]}
                            />
                        </View>
                    </View>
                    <View style={styles.weatherTemperatureMainContainer}>
                        <Text style={styles.weatherTemperatureMain}>
                            {this.props.weather.weather[0].main}
                        </Text>
                    </View>
                </LinearGradient>
                <ScrollView
                    contentContainerStyle={styles.weatherForecastView}
                    horizontal={true}>
                    {weatherForecastView}
                </ScrollView>
            </View>
        );
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
    weatherForecastView: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        height: 150,
        borderRadius: 15,
    },
    weatherForecastContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        margin: 10
    },
    weatherImageContainer: {
        flexDirection: 'column',
        justifyContent: 'center'
    },
    weatherImageView: {
        alignSelf: 'center'
    },
    weatherImage: {
        margin: 0,
        width: 100,
        height: 100,
        resizeMode: 'cover',
    },
    weatherTemperature: {
        flexDirection: 'column',
        justifyContent: 'space-around'
    },
    weatherTemperatureText: {
        color: Colors.red,
        fontSize: 42,
        fontFamily: Fonts.primaryBold,
    },
    weatherTemperatureFeelsLikeText: {
        color: Colors.brown,
        fontSize: 14,
        fontFamily: Fonts.primary,
    },
    weatherTemperatureTextView: {

    },
    weatherTemperatureMainContainer: {
        alignSelf: 'center'
    },
    weatherTemperatureMain: {
        color: Colors.pink,
        fontSize: 24,
        fontWeight: 'normal',
        fontFamily: Fonts.primary,
        flexWrap: 'wrap'
    },
    convertTemperatureView: {
        alignSelf: 'center',
        flexDirection: 'row'
    },
    celsiusView: {

    },
    conversionText: {
        color: Colors.brown,
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
        weather: state.currentWeather,
        weatherForecast: state.weatherForecast
    }
}

export default connect(mapStateToProps)(WeatherCard);