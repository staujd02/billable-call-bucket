import React, { useState } from 'react';
import auth from '@react-native-firebase/auth';
import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { AppColorStyles, AppFontStyles } from '../styles/default';
import { ThirdPartyAuthenticationProps } from '../types/routes';
import AppButton from './control/AppButton';
import useRegistration from './hooks/useAuthState';
import { AuthMethodTypes } from '../types/calls';

const ThirdPartyAuthentication = ({ navigation }: ThirdPartyAuthenticationProps) => {

  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [error, setError] = useState<string>();

  const {
    setRegistrationState
  } = useRegistration();

  const register = async () => {

    if (!email)
      return setError("You must enter a vaild email.");

    if (!password)
      return setError("You must create a password");

    try {
      await auth().createUserWithEmailAndPassword(email, password);
      await setRegistrationState({
        acceptanceTimestamp: new Date(Date.now()),
        authenticationMethod: AuthMethodTypes.EMAIL,
      });
      navigation.reset({
        index: 0,
        routes: [{ name: 'HomeScreen' }],
      });
    } catch (error: any) {
      if (error.code === 'auth/email-already-in-use')
        setError('That email address is already in use!');
      else if (error.code === 'auth/invalid-email')
        setError('That email address is invalid!');
      else
        setError('Unknown Error: ' + error.code);
    }
  }

  return (
    <ScrollView contentContainerStyle={styles.contentContainerStyle} style={styles.column} >
      <View style={styles.headerBanner}>
        <Text style={styles.header}>Registered your corporate email for access.</Text>
      </View>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Corporate Email:</Text>
        <TextInput style={styles.textInputStyle} value={email} onChangeText={t => setEmail(t)} />
      </View>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Create Password:</Text>
        <TextInput style={styles.textInputStyle} secureTextEntry={true} value={password} onChangeText={t => setPassword(t)} />
      </View>
      {error && <Text style={styles.warningLabel}>{error}</Text>}
      <AppButton title="Register Corporate Email" onPress={register} />
    </ScrollView>
  );
};

export default ThirdPartyAuthentication;

const styles = StyleSheet.create({
  column: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainerStyle: {
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