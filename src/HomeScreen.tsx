import React from 'react';
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