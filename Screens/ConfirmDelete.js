import React, {useState} from "react";
import {View, StyleSheet, ScrollView, Animated, ActivityIndicator} from "react-native";
import * as firebase from "firebase";
import ActionBar from "../Components/ActionBar";
import {OutlinedTextField} from "react-native-material-textfield";
import Fonts from "../Components/Fonts";
import Colors from "../Components/Colors";
import {RaisedTextButton} from "react-native-material-buttons";
import 'firebase/firestore'
import {useSelector} from "react-redux";

const ConfirmDelete = props => {
    let currentUser = useSelector(state => state.currentUser);
    const moveAnimation = new Animated.ValueXY({x: 0, y: -20});
    const [password, setPassword] = useState();
    const [error, setError] = useState();
    const [loading, setLoading] = useState(false);
    const _moveFormUp = () => {
        Animated.spring(moveAnimation, {
            toValue: {x: 0, y: -90},
        }).start();
    };
    const _moveFormDown = () => {
        Animated.spring(moveAnimation, {
            toValue: {x: 0, y: -20},
        }).start();
    };

    const onChangePassword = (password) => {
        setPassword(password);
    };

    const onConfirmDelete = () => {
        let isError = false;
        setLoading(true);
        if (!password) {
            setError('Password is required');
            isError = true;
        } else {
            setError(null);
            isError = false;
        }
        if (!isError) {
            firebase.auth().signInWithEmailAndPassword(currentUser.email, password).then(() => {
                firebase.firestore().collection('Users/')
                    .doc(currentUser.uid).delete().then(() => {
                    currentUser.delete().then(() => {
                        // User deleted
                        props.navigation.pop();
                    }, error => {
                        setError(error.message);
                        setLoading(false);
                        firebase.firestore().collection('/Users').doc(currentUser.uid)
                            .set({user: currentUser.toJSON()}).then(() => {
                                // User record added back on delete fail
                        }, error => {
                            setError(error.message);
                        });
                    });
                }, error => {
                    setError(error.message);
                    setLoading(false);
                });
            }, error => {
                setError('Invalid Password');
                setLoading(false);
            });
        } else {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color={Colors.white}/>
            </View>
        );
    } else {
        return (
            <View style={styles.container}>
                <ActionBar error={error} backArrow={true} data={props}/>
                <ScrollView contentContainerStyle={styles.container} keyboardDismissMode={'on-drag'}
                            keyboardShouldPersistTaps={'handled'}>
                    <Animated.View style={[moveAnimation.getLayout()]}>
                        <View style={styles.form}>
                            <OutlinedTextField
                                label='Password'
                                secureTextEntry={true}
                                containerStyle={styles.inputFields}
                                inputContainerStyle={styles.innerInputContainer}
                                tintColor={Colors.white}
                                baseColor={Colors.white}
                                textColor={Colors.white}
                                onFocus={_moveFormUp}
                                onBlur={_moveFormDown}
                                autoFocus={false}
                                labelTextStyle={{fontFamily: Fonts.primary}}
                                errorColor={Colors.pink}
                                onChangeText={onChangePassword}
                                error={error}
                            />
                        </View>
                        <View style={styles.buttonsContainer}>
                            <View style={styles.submitButton}>
                                <RaisedTextButton title={'Delete'}
                                                  titleColor={Colors.pink}
                                                  color={Colors.white}
                                                  titleStyle={{fontSize: 20, fontFamily: Fonts.primary}}
                                                  onPress={onConfirmDelete}/>
                            </View>
                        </View>
                    </Animated.View>
                </ScrollView>
            </View>
        );
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: Colors.black
    },
    inputFields: {
        margin: 5,
        padding: 5,
    },
    innerInputContainer: {
        borderRadius: 5
    },
    buttonsContainer: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    submitButton: {
        width: '95%'
    },
});

export default ConfirmDelete;
