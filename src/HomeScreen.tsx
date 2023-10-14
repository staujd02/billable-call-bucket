import React from 'react';
import { StyleSheet } from 'react-native';
import { AppColorStyles, AppFontStyles } from '../styles/default';
import { HomeScreenProps } from '../types/routes';
import MainScreen from './MainScreen';
import TermsAndConditions from './TermsAndConditions';

const HomeScreen = (props: HomeScreenProps) => {

  const hasAccepeted = false;

  return hasAccepeted 
    ? <MainScreen {...props} />
    : <TermsAndConditions />;
};

export default HomeScreen;

const styles = StyleSheet.create({
  button: {
    marginLeft: 20,
    marginRight: 20,
    marginTop: 10,
  },
  navigationRow: {
    height: 30,
    backgroundColor: AppColorStyles.navigationBackground,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: 20,
    marginTop: 20,
  },
  spacer: {
    height: 190,
  },
  container: {
    height: "100%",
    backgroundColor: AppColorStyles.navigationBackground,
  },
  content: {
    backgroundColor: AppColorStyles.background,
    paddingBottom: 40,
  },
  callHeader: {
    display: 'flex',
    flexDirection: "column",
    justifyContent: 'space-between',
    alignItems: "center",
    paddingLeft: 20,
    paddingRight: 20,
    marginBottom: 20,
    marginTop: 10,
  },
  callHeaderText: {
    color: AppColorStyles.text,
    textAlign: 'center',
    fontSize: AppFontStyles.titleSize,
  },
  list: {
    paddingLeft: 5,
    paddingRight: 5,
  }
});