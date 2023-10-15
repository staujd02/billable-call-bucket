import React from "react";
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { AppColorStyles, AppFontStyles } from "../styles/default";
import AppButton from "./control/AppButton";
import { Terms } from "./constants/termsOfService";

const TermsAndConditions = () => {

  const onAccept = () => {}
  const onDecline = () => {}

  return (
    <View style={styles.column}>
      <Text style={styles.terms}>Terms and Conditions</Text>
      <ScrollView>
        <Text>{Terms}</Text>
        <View style={styles.sizeController}>
          <AppButton title="I agree to these terms" onPress={onAccept} />
          <AppButton title="I decline" onPress={onDecline} />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  column: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 10,
  },
  terms: {
    color: AppColorStyles.text,
    textAlign: 'center',
    fontSize: AppFontStyles.titleSize,
    marginTop: 10,
    marginBottom: 10,
  },
  sizeController: {
    padding: 15,
  },
  separator: {
    marginTop: 5,
    marginBottom: 5,
    height: 2,
    backgroundColor: "#0f1247",
  }
});

export default TermsAndConditions;