import React, { useEffect, useState } from 'react';
import auth from '@react-native-firebase/auth';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { AppColorStyles, AppFontStyles } from '../styles/default';
import { ThirdPartyAuthenticationProps } from '../types/routes';
import AppButton from './control/AppButton';
import useRegistration from './hooks/useAuthState';
import LoadingAnimation from './control/LoadingAnimation';
import { Guid } from 'guid-typescript';

const ThirdPartyAuthentication = ({ navigation }: ThirdPartyAuthenticationProps) => {

  const [email, setEmail] = useState<string>();
  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);
  const [showMessage, setShowMessage] = useState<boolean>(false);

  const {
    setRegistrationState,
    getRegistrationState,
  } = useRegistration();

  useEffect(() => {
    attemptSignIn();
  }, []);

  useEffect(() =>
    auth().onUserChanged(async authenticatedUser => {
      if (authenticatedUser && !authenticatedUser.emailVerified) {
        await authenticatedUser.sendEmailVerification();
        setLoading(false);
        setShowMessage(true);
      }
      if (authenticatedUser?.emailVerified) {
        const registration = await getRegistrationState();
        if (registration)
          await completeRegistration();
      }
    }), []);

  const resendConfirmation = async () => {
    const user = auth().currentUser;
    if (user && !user.emailVerified)
      await user.sendEmailVerification();
  }

  const attemptSignIn = async () => {
    const registration = await getRegistrationState();
    if (registration) {
      const { userName, passKey } = registration;
      const user = await auth().signInWithEmailAndPassword(userName, passKey);
      if (user.user.emailVerified) {
        await completeRegistration();
      }
    }
  }

  const completeRegistration = async () => {
    const registration = await getRegistrationState();
    if (registration) {
      await setRegistrationState({
        ...registration,
        emailVerified: false,
      });
      navigation.reset({
        index: 0,
        routes: [{ name: 'HomeScreen' }],
      });
    }
  }

  const register = async () => {

    if (!email)
      return setError("You must enter an email address.");

    try {
      setLoading(true);
      const passKey = Guid.create().toString();
      await auth().createUserWithEmailAndPassword(email, passKey);
      await setRegistrationState({
        acceptanceTimestamp: new Date(Date.now()),
        authenticationMethod: "EMAIL",
        passKey,
        userName: email,
        emailVerified: false,
      });
    } catch (error: any) {
      if (error.code === 'auth/email-already-in-use')
        setError('That email address is already in use!');
      else if (error.code === 'auth/invalid-email')
        setError('That email address is invalid!');
      else
        setError('Unknown Error: ' + error.code);
      setLoading(false);
    }
  }

  return (
    <View style={styles.column} >
      <View style={styles.headerBanner}>
        <Text style={styles.header}>Register your corporate email for access.</Text>
      </View>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Corporate Email:</Text>
        <TextInput style={styles.textInputStyle} value={email} onChangeText={t => setEmail(t)} />
      </View>
      {error && <Text style={styles.warningLabel}>{error}</Text>}
      {!showMessage && <AppButton title="Register Corporate Email" onPress={register} />}
      {showMessage && <Text style={styles.instructionLabel}>
        An email with a verification link been sent.
        Please follow instructions in the email to complete the registration process.
      </Text>}
      {showMessage && <AppButton title="Re-send Confirmation Email" onPress={resendConfirmation} />}
      {loading && <LoadingAnimation />}
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
  instructionLabel: {
    color: AppColorStyles.detailText,
    textAlign: 'center',
    fontSize: AppFontStyles.detailSize,
    padding: 10,
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