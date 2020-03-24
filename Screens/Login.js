import React, {useState} from 'react';
import {
    View,
    Text,
    StyleSheet, Animated,
    ScrollView, Keyboard, ActivityIndicator
} from 'react-native';
import * as firebase from 'firebase';
import {OutlinedTextField} from "react-native-material-textfield";
import {TextButton, RaisedTextButton} from 'react-native-material-buttons';
import Fonts from "../Components/Fonts";
import ActionBar from "../Components/ActionBar";
import Colors from "../Components/Colors";

const Login = props => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const moveAnimation = new Animated.ValueXY({x: 0, y: -20});
    const [error, setError] = useState();
    const [showActivityIndicator, setShowActivityIndicator] = useState(false);
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

    const onEmailFocus = () => {
        _moveFormUp();
    };

    const onEmailBlur = () => {
        _moveFormDown();
    };

    const onPasswordFocus = () => {
        _moveFormUp();
    };

    const onPasswordBlur = () => {
        _moveFormDown();
    };

    const checkEmailAndPassword = () => {
        let errors = {
            emailError: false,
            passwordError: false
        };
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (email === '') {
            setEmailError('Required');
            errors.emailError = true;
        } else if (reg.test(email) === false) {
            setEmailError('Please enter valid email address');
            errors.emailError = true;
        } else {
            setEmailError('');
            errors.emailError = false;
        }
        if (password === '') {
            setPasswordError('Required');
            errors.passwordError = true;
        } else if (password.length < 6) {
            setPasswordError('Password should be of minimum 6 characters');
            errors.passwordError = true;
        } else {
            setPasswordError('');
            errors.passwordError = false;
        }
        return errors;
    };

    const onPressSignUp = async () => {
        setShowActivityIndicator(true);
        Keyboard.dismiss();
        if (!checkEmailAndPassword().emailError && !checkEmailAndPassword().passwordError) {
            firebase.auth().createUserWithEmailAndPassword(email, password).then(response => {
                setShowActivityIndicator(false);
            }, error => {
                setShowActivityIndicator(false);
                setError(error.message);
            });
        } else {
            setShowActivityIndicator(false);
        }
    };

    const onPressLogin = () => {
        setShowActivityIndicator(true);
        Keyboard.dismiss();
        if (!checkEmailAndPassword().emailError && !checkEmailAndPassword().passwordError) {
            firebase.auth().signInWithEmailAndPassword(email, password).then(response => {
                setShowActivityIndicator(false);
            }, error => {
                setShowActivityIndicator(false);
                setError(error.message);
            });
        } else {
            setShowActivityIndicator(false);
        }
    };

    const onChangeEmail = (email) => {
        setEmail(email);
        setEmailError('');
    };

    const onChangePassword = (password) => {
        setPassword(password);
        setPasswordError('');
    };

    if (showActivityIndicator) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color={Colors.grey}/>
            </View>
        );
    } else {
        return (
            <View style={styles.container}>
                <ActionBar error={error}/>
                <Text style={styles.title}>
                    DAY
                </Text>
                <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps={"handled"}
                            keyboardDismissMode={"on-drag"}>
                    <Animated.View style={[moveAnimation.getLayout()]}>
                        <View style={styles.form}>
                            <OutlinedTextField
                                label='Email'
                                containerStyle={styles.inputFields}
                                onFocus={onEmailFocus}
                                onBlur={onEmailBlur}
                                tintColor={Colors.white}
                                baseColor={Colors.white}
                                textColor={Colors.white}
                                autoFocus={false}
                                labelTextStyle={{fontFamily: Fonts.primary}}
                                onChangeText={onChangeEmail}
                                value={email}
                                error={emailError}
                                errorColor={Colors.pink}
                            />
                            <OutlinedTextField
                                label='Password'
                                secureTextEntry={true}
                                containerStyle={styles.inputFields}
                                onFocus={onPasswordFocus}
                                onBlur={onPasswordBlur}
                                tintColor={Colors.white}
                                baseColor={Colors.white}
                                textColor={Colors.white}
                                autoFocus={false}
                                keyboardType='email-address'
                                labelTextStyle={{fontFamily: Fonts.primary}}
                                onChangeText={onChangePassword}
                                error={passwordError}
                                value={password}
                                errorColor={Colors.pink}
                            />
                        </View>
                        <View style={styles.buttonsContainer}>
                            <View style={styles.loginButtonContainer}>
                                <RaisedTextButton title={'Login'}
                                                  titleColor={Colors.yellow}
                                                  color={Colors.white}
                                                  titleStyle={{fontSize: 20, fontFamily: Fonts.primary}}
                                                  onPress={onPressLogin}/>
                            </View>
                            <View style={styles.signUpButtonContainer}>
                                <View style={styles.signUpTextView}>
                                    <Text style={styles.signUpText}>Don't have an Account ?</Text>
                                </View>
                                <View style={styles.signUpButton}>
                                    <TextButton title={'Sign Up'}
                                                titleColor={Colors.white}
                                                color={Colors.yellow}
                                                titleStyle={{fontSize: 16, fontFamily: Fonts.primary}}
                                                onPress={onPressSignUp}/>
                                </View>
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
        width: '100%',
        backgroundColor: Colors.black,
        justifyContent: 'center',
    },
    inputFields: {
        margin: 5,
        padding: 5
    },
    buttonsContainer: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    loginButtonContainer: {
        width: '95%'
    },
    signUpButtonContainer: {
        flexDirection: 'row',
    },
    signUpText: {
        color: Colors.yellow,
        fontFamily: Fonts.primary
    },
    signUpButton: {
        margin: 10
    },
    signUpTextView: {
        alignItems: 'flex-start',
        margin: 20,
    },
    title: {
        textAlign: 'center',
        fontSize: 24,
        letterSpacing: 3,
        color: Colors.yellow,
        margin: 15,
        fontFamily: Fonts.baloodaBold
    }
});

export default Login;
