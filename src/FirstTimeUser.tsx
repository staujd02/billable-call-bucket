import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from 'react-native';
import { AppColorStyles, AppFontStyles } from '../styles/default';
import AppSplashScreen from "./SplashView";

const FirstTimeUser = () => {

  const [establishedAuthentication, setEstablishedAuthentication] = useState<boolean>(false);

  const checkUsersAuthState = async () => {
    // setEstablishedAuthentication(await )
  }

  useEffect(() => {
    checkUsersAuthState();
  }, []);

  return !establishedAuthentication
  ? <AppSplashScreen />
  : (
    <View style={styles.column}>
      <Text style={styles.header}>Big Logo</Text>
      <Text style={styles.header}>Daedalus</Text>
      <Text style={styles.header}>Login</Text>
      <Text style={styles.header}>Thin Bar</Text>
      <Text style={styles.header}>I have not registered my company login</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  column: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  row: {
    backgroundColor: '#fff',
    alignSelf: 'stretch',
    display: "flex",
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: "center",
    marginTop: 20,
  },
  header: {
    color: AppColorStyles.text,
    textAlign: 'center',
    fontSize: AppFontStyles.titleSize,
    marginTop: 10,
    marginBottom: 10,
  },
  label: {
    color: AppColorStyles.text,
    textAlign: 'center',
    fontSize: AppFontStyles.detailSize,
  },
});

export default FirstTimeUser;