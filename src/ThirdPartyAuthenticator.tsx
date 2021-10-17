import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { AppColorStyles, AppFontStyles } from '../styles/default';
import { ThirdPartyAuthenticationProps } from '../types/routes';

const ThirdPartyAuthentication = ({ navigation }: ThirdPartyAuthenticationProps) => {
  return (
    <View style={styles.column} >
      <Text style={styles.header}>Ensure you have registered your corporate login first.</Text>
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