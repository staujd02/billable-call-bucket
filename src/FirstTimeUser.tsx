import React from "react";
import { StyleSheet, Text, View } from 'react-native';
import { AppColorStyles, AppFontStyles } from '../styles/default';
import { FirstTimeUserProps } from "../types/routes";

const FirstTimeUser = ({ navigation }: FirstTimeUserProps) => {

  return (
      <View style={styles.column}>
        <Text style={styles.header}>Big Logo</Text>
        <Text style={styles.header}>Daedalus</Text>
        <Text style={styles.header}>I have not registered my company login</Text>
        <Text style={styles.header}>Thin Bar</Text>
        <Text style={styles.header}>Login</Text>
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