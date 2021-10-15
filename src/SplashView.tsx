import React from "react";
import { StyleSheet, View, Image, Text } from 'react-native';
import LoadingIcon from "./control/LoadingIcon";

const AppSplashScreen = () => {
  return (
    <View style={styles.background}>
      <LoadingIcon />
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
  logo: {
    width: 400, 
    height: 400,
  },
});

export default AppSplashScreen;