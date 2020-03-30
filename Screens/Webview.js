import React, {Component} from 'react';
import {
    View,
    StyleSheet,
} from 'react-native';
import WebView from "react-native-webview";
import ActionBar from "../Components/ActionBar";
import Colors from "../Components/Colors";
import {loadingAnimation} from "../Animations";
import LottieView from "lottie-react-native";

class Webview extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        if (this.animation) {
            this.animation.play();
        }
    }

    loading = () => {
        return (
            <LottieView style={styles.container}
                        ref={animation => {this.animation = animation}}
                        source={loadingAnimation}
            />
        );
    };

    render() {
        if (this.props.navigation
            && this.props.navigation.state
            && this.props.navigation.state.params
            && this.props.navigation.state.params.url) {
            return (
                <View style={styles.container}>
                    <ActionBar backArrow={true} data={this.props}/>
                    <WebView
                        startInLoadingState={true}
                        source={{uri: this.props.navigation.state.params.url}}
                        renderLoading={() => {
                            return this.loading();
                        }}
                        originWhitelist={['*']}
                    >
                    </WebView>
                </View>
            );
        } else {
            {this.loading()}
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.black
    }
});

export default Webview;