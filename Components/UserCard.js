import React from 'react';
import {
    View,
    StyleSheet, Text
} from 'react-native';
import Colors from "./Colors";
import { LinearGradient } from 'expo-linear-gradient';
import {useSelector} from "react-redux";
import Fonts from "./Fonts";

const UserCard = () => {
    const user = useSelector(state => state.currentUser);
    return (
      <LinearGradient
          style={styles.userCard}
          colors={[Colors.grey, Colors.yellow, Colors.orange]}
      >
          <View style={styles.userCardAvatarContainer}>
              <Text style={styles.userCardAvatar}>DAY</Text>
          </View>
          <View style={styles.userCardNumberContainer}>
              <Text style={styles.userCardNumber}>
                  1234
              </Text>
          </View>
          <View style={styles.userCardInfoContainer}>
              <Text style={styles.userCardInfo}>
                  {user.displayName}
              </Text>
          </View>
      </LinearGradient>
    );
};

const styles = StyleSheet.create({
    userCard: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        minWidth: '100%',
        height: 250,
        padding: 25,
        borderRadius: 15,
        backgroundColor: Colors.pink,
        shadowColor: Colors.white,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 1,
        elevation: 5
    },
    userCardAvatarContainer: {

    },
    userCardAvatar: {
        fontFamily: Fonts.primary,
        color: Colors.white,
        fontSize: 25
    },
    userCardNumberContainer: {
        display: 'flex',
        justifyContent: 'center',
    },
    userCardNumber: {
        fontFamily: Fonts.primary,
        fontSize: 35
    },
    userCardInfoContainer: {
        display: 'flex',
        justifyContent: 'center',
        fontFamily: Fonts.primary,
        fontSize: 25
    },
    userCardInfo: {
        fontFamily: Fonts.primary,
        fontSize: 25
    }
});

export default UserCard;