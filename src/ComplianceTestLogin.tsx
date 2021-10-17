import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { AppColorStyles, AppFontStyles } from '../styles/default';
import { ComplianceTestLoginProps } from '../types/routes';
import AppButton from './control/AppButton';

const TESTER_ACCOUNT_CREDENTIALS_USERNAME = "GoogleTestAccount";
const TESTER_ACCOUNT_CREDENTIALS_PASSWORD = "all-good-dogs-go-to-heaven";

const ComplianceTestLogin = ({ navigation }: ComplianceTestLoginProps) => {

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [attemptMade, setAttemptMade] = useState<boolean>(false);

  const login = () => {
    if (username.toLocaleLowerCase() === TESTER_ACCOUNT_CREDENTIALS_USERNAME.toLocaleLowerCase()
      && password === TESTER_ACCOUNT_CREDENTIALS_PASSWORD) {
      navigation.reset({
        index: 0,
        routes: [{ name: 'HomeScreen' }],
      });
    }
    else
      setAttemptMade(true);
  }

  return (
    <ScrollView contentContainerStyle={styles.contentContainerStyle} style={styles.column} >
      <View style={styles.headerBanner}>
        <Text style={styles.header}>Ensure you have registered your corporate login first.</Text>
      </View>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Username:</Text>
        <TextInput style={styles.textInputStyle} value={username} onChangeText={t => setUsername(t)} />
      </View>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Password:</Text>
        <TextInput style={styles.textInputStyle} secureTextEntry={true} value={password} onChangeText={t => setPassword(t)} />
      </View>
      {attemptMade && <Text style={styles.warningLabel}>Incorrect Username or Password.</Text>}
      <AppButton title="Login" onPress={login} />
    </ScrollView>
  );
};

export default ComplianceTestLogin;

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