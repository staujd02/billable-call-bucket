import React, { useEffect, useState } from 'react';
import auth from '@react-native-firebase/auth';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { AppColorStyles, AppFontStyles } from '../styles/default';
import { ThirdPartyAuthenticationProps } from '../types/routes';
import AppButton from './control/AppButton';
import useRegistration from './hooks/useAuthState';
import LoadingAnimation from './control/LoadingAnimation';
import { Guid } from 'guid-typescript';
import { ScrollView } from 'react-native-gesture-handler';

const ThirdPartyAuthentication = ({ navigation }: ThirdPartyAuthenticationProps) => {

  const [email, setEmail] = useState<string>();
  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);
  const [resetPassword, setResetPassword] = useState<string>();
  const [emailInUse, setEmailInUse] = useState<boolean>(false);
  const [showMessage, setShowMessage] = useState<boolean>(false);
  const [viewFocused, setViewFocused] = useState<boolean>(false);

  const {
    completeRegistrationState,
    createRegistrationState,
    getRegistrationState,
    indicateEmailVerificationWasSent,
  } = useRegistration();

  useEffect(() => {
    attemptSignIn();
  }, []);

  const sendResetEmail = () => {
    auth().sendPasswordResetEmail(email as string).catch(error => {
      setError('The email is already in use. Failed to send reset link:' + error);
    });
  }

  const sendRegistrationEmail = async () => {
      const authenticatedUser = await auth().currentUser;
      const registration = await getRegistrationState();
      if (authenticatedUser && !authenticatedUser.emailVerified && (!registration || !registration.emailVerificationSent)) {
        await authenticatedUser.sendEmailVerification();
        await indicateEmailVerificationWasSent();
        setLoading(false);
        setShowMessage(true);
      }
  }

  useEffect(() =>
    auth().onUserChanged(async authenticatedUser => {
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

  const attemptReSignIn = async () => {
    if (resetPassword && email) {
      try {
        await auth().signInWithEmailAndPassword(email, resetPassword);
        await createRegistrationState({
          acceptanceTimestamp: new Date(Date.now()),
          authenticationMethod: "EMAIL",
          passKey: resetPassword,
          userName: email,
          emailVerified: true,
          emailVerificationSent: true,
        });
      } catch (error: any) {
        if (error.code === 'auth/wrong-password') 
          setError("Wrong Password.");
        else
          setError(error?.code);
      }
    }
  }

  const attemptSignIn = async () => {
    const registration = await getRegistrationState();
    if (registration) {
      const { userName, passKey } = registration;
      const user = await auth().signInWithEmailAndPassword(userName, passKey);
      setShowMessage(true);
      setEmail(user.user.email || "");
      if (user.user.emailVerified) {
        await completeRegistration();
      }
    }
  }

  const completeRegistration = async () => {
    const registration = await getRegistrationState();
    if (registration) {
      await completeRegistrationState();
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
      await createRegistrationState({
        acceptanceTimestamp: new Date(Date.now()),
        authenticationMethod: "EMAIL",
        passKey,
        userName: email,
        emailVerified: false,
        emailVerificationSent: false,
      });
      await sendRegistrationEmail();
    } catch (error: any) {
      if (error.code === 'auth/email-already-in-use') {
        sendResetEmail();
        setEmailInUse(true);
      }
      else if (error.code === 'auth/invalid-email')
        setError('That email address is invalid!');
      else
        setError('Unknown Error: ' + error.code);
      setLoading(false);
    }
  }

  return (
    <View style={styles.column}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.flex}>
        <View style={styles.headerBanner}>
          <Text style={styles.header}>Register your corporate email for access.</Text>
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Corporate Email:</Text>
          <TextInput style={styles.textInputStyle} value={email} onChangeText={t => setEmail(t)} />
        </View>
        {error && <Text style={styles.warningLabel}>{error}</Text>}
        {!showMessage && !emailInUse && <AppButton title="Register Corporate Email" onPress={register} />}
        {showMessage && <Text style={styles.instructionLabel}>
          An email with a verification link been sent.
          Please follow instructions in the email to complete the registration process.
        </Text>}
        {emailInUse && <Text style={styles.instructionLabel}>
          This email is already in use.
          Check your inbox for an email containing instructions to reset your password.
          Then, enter your new password in the area below.
        </Text>}
        {emailInUse && <View style={styles.inputGroup}>
          <Text style={styles.label}>Password:</Text>
          <TextInput
            secureTextEntry={true}
            onFocus={() => setViewFocused(true)}
            onBlur={() => setViewFocused(false)}
            style={styles.textInputStyle}
            value={resetPassword}
            onChangeText={t => setResetPassword(t)} />
        </View>}
        {showMessage && <AppButton styleOverrides={styles.button} title="I confirmed my email" onPress={attemptSignIn} />}
        {showMessage && <AppButton title="Re-send Confirmation Email" onPress={resendConfirmation} />}
        {emailInUse && <AppButton styleOverrides={styles.button} title="Confirm Password" onPress={attemptReSignIn} />}
        {emailInUse && <AppButton styleOverrides={styles.button} title="Re-send Reset Email" onPress={sendResetEmail} />}
        {loading && <LoadingAnimation />}
        {viewFocused && <View style={styles.padding}></View>}
      </ScrollView>
    </View>
  );
};

export default ThirdPartyAuthentication;

const styles = StyleSheet.create({
  padding: {
    height: 350
  },
  button: {
    marginBottom: 15
  },
  column: {
    flex: 1,
    backgroundColor: '#fff',
  },
  flex: {
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  scrollView: {
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
    marginBottom: 10,
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