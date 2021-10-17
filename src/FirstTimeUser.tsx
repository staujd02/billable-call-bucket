import React from "react";
import { StyleSheet, View } from 'react-native';
import { AppColorStyles, AppFontStyles } from '../styles/default';
import { FirstTimeUserProps } from "../types/routes";
import AnimatedLogo from "./control/AnimatedLogo";
import AppButton from "./control/AppButton";

const FirstTimeUser = ({ navigation }: FirstTimeUserProps) => {
  return (
    <View style={styles.column}>
      <AnimatedLogo />
      <View>
        <View style={styles.sizeController}>
          <AppButton title="Login" onPress={() => navigation.navigate('ComplianceTestLogin')} />
        </View>
        <View style={styles.separator}></View>
        <View style={styles.sizeController}>
          <AppButton title="Register my corporate login" onPress={() => navigation.push('TermsAndConditions')} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  column: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  sizeController: {
    padding: 15,
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
  separator: {
    marginTop: 5,
    marginBottom: 5,
    height: 2,
    backgroundColor: "#0f1247",
  }
});

export default FirstTimeUser;