import React from 'react';
import auth from '@react-native-firebase/auth';
import { StyleSheet, Text, View } from 'react-native';
import { AppColorStyles, AppFontStyles } from '../styles/default';
import { ThirdPartyAuthenticationProps } from '../types/routes';

const ThirdPartyAuthentication = ({ navigation }: ThirdPartyAuthenticationProps) => {
  // https://firebase.google.com/docs/auth/web/firebaseui
  // https://firebase.google.com/docs/web/setup

  auth()
    .createUserWithEmailAndPassword('jane.doe@example.com', 'SuperSecretPassword!')
    .then(() => {
      console.log('User account created & signed in!');
    })
    .catch(error => {
      if (error.code === 'auth/email-already-in-use') {
        console.log('That email address is already in use!');
      }

      if (error.code === 'auth/invalid-email') {
        console.log('That email address is invalid!');
      }

      console.error(error);
    });

  return (
    <View style={styles.column} >
      <Text style={styles.header}>Ensure you have registered your corporate login first.</Text>
    </View>
  );
};

export default ThirdPartyAuthentication;

const styles = StyleSheet.create({
  column: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  textInputStyle: {
    backgroundColor: '#fff',
    borderColor: '#000',
    borderRadius: 10,
    borderWidth: 2,
    paddingLeft: 10,
    flex: 1,
  },
  header: {
    flex: 1,
    textAlign: 'center',
    color: AppColorStyles.text,
    fontSize: AppFontStyles.titleSize,
  },
  label: {
    textAlign: 'right',
    fontSize: AppFontStyles.detailSize,
    marginRight: 5,
  },
  warningLabel: {
    color: AppColorStyles.warningTextColor,
    textAlign: 'center',
    fontSize: AppFontStyles.detailSize,
    marginBottom: 5,
  },
  inputGroup: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  headerBanner: {
    display: "flex",
    flexDirection: "row",
    marginTop: 20,
    marginBottom: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: AppColorStyles.buttonBackground,
  },
});