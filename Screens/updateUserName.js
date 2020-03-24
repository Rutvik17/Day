import React, {useState} from "react";
import {View, StyleSheet, ScrollView, Animated, ActivityIndicator} from "react-native";
import Fonts from "../Components/Fonts";
import Colors from "../Components/Colors";
import ActionBar from "../Components/ActionBar";
import {OutlinedTextField} from "react-native-material-textfield";
import { RaisedTextButton } from "react-native-material-buttons";
import * as firebase from "firebase";
import 'firebase/firestore'
import Home from "./Home";
import {useDispatch, useSelector} from "react-redux";
import {currentUser} from "../Redux/Actions/Actions";
import LottieView from "lottie-react-native";
import {loadingAnimation} from "../Animations";

const UpdateUserName = props => {
    let animation;
    const dispatch = useDispatch();
    const moveAnimation = new Animated.ValueXY({x: 0, y: -20});
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const [showActivityIndicator, setShowActivityIndicator] = useState(false);
    const [nameSuccess, setNameSuccess] = useState(false);
    if (animation) {
        animation.play();
    }
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
    const onSubmitName = () => {
        setShowActivityIndicator(true);
        if (name === '') {
            setError('Please enter your first name');
            setShowActivityIndicator(false);
        } else {
            firebase.auth().currentUser.updateProfile(
                {
                    displayName: name
                }).then(() => {
                let user = firebase.auth().currentUser;
                dispatch(currentUser(user));
                firebase.firestore().collection('/Users').doc(user.uid)
                    .set({user: user.toJSON()}).then(() => {
                    setShowActivityIndicator(false);
                    setNameSuccess(true);
                }, error => {
                    setError(error.message);
                });
            }, error => {
                setShowActivityIndicator(false);
                setError(error.message);
            });
        }
    };

    const onChangeName = (name) => {
        setError('');
        setName(name);
    };

    if (showActivityIndicator) {
        return (
            <LottieView style={styles.container}
                        ref={r => animation = r}
                        source={loadingAnimation}
            />
        );
    } else if (nameSuccess) {
        return (
            <Home data={props.data}/>
        );
    } else {
        return (
            <View style={styles.container}>
                <ActionBar error={error}/>
                <ScrollView contentContainerStyle={styles.container} keyboardDismissMode={'on-drag'}
                            keyboardShouldPersistTaps={'handled'}>
                    <Animated.View style={[moveAnimation.getLayout()]}>
                        <View style={styles.form}>
                            <OutlinedTextField
                                label='First Name'
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
                                onChangeText={onChangeName}
                                error={error}
                            />
                        </View>
                        <View style={styles.buttonsContainer}>
                            <View style={styles.submitButton}>
                                <RaisedTextButton title={'Finish'}
                                                  titleColor={Colors.pink}
                                                  color={Colors.white}
                                                  titleStyle={{fontSize: 20, fontFamily: Fonts.primary}}
                                                  onPress={onSubmitName}/>
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

export default UpdateUserName;
