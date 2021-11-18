import React from "react";
import { StyleSheet, View, Text } from 'react-native';
import LoadingIcon from "./control/LoadingIcon";

const AppSplashScreen = () => {
  return (
    <View style={styles.background}>
      <LoadingIcon />
      <Text style={styles.text}>Decrypting Application Store...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#FFFFFA',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    marginTop: 240, 
    fontSize: 16,
  },
});

export default AppSplashScreen;