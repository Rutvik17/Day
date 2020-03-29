import React, {useState, Component} from 'react'
import {
    View,
    StyleSheet,
} from 'react-native'
import * as firebase from "firebase";
import Home from "./Home";
import Login from "./Login";
import UpdateUserName from "./updateUserName";
import {connect} from "react-redux";
import {currentUser} from "../Redux/Actions/Actions";
import {bindActionCreators} from "redux";
import Colors from "../Components/Colors";

class Index extends Component {
    state = {
        user: undefined,
    }
    constructor(props) {
        super(props);
        try {
            firebase.auth().onAuthStateChanged(user => {
                if (user) {
                    this.setState({
                        user: user
                    })
                } else {
                    this.setState({
                        user: user
                    })
                    this.props.currentUser(this.state.user);
                }
            });
        } catch (err) {
            console.log('error: ', err.message)
        }
    }

    render() {
        if (this.state.user) {
            this.props.currentUser(this.state.user);
            if (!this.state.user.displayName) {
                return (
                    <UpdateUserName data={this.props}/>
                );
            } else {
                return (
                    <Home data={this.props}/>
                );
            }
        } else if (this.state.user === null) {
            return (
                <Login/>
            );
        } else {
            return (
                <View style={styles.container}>
                </View>
            );
        }
    }
};

const styles = StyleSheet.create({
    welcome: {
        fontSize: 28
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.black
    }
});

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        currentUser: currentUser
    }, dispatch);
}

export default connect(null, mapDispatchToProps)(Index);
