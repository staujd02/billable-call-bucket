import React, { useEffect, useState } from 'react';
import { HomeScreenProps } from '../types/routes';
import MainScreen from './MainScreen';
import TermsAndConditions from './TermsAndConditions';
import useAuthState from './hooks/useAuthState';
import Loading from './Loading';

const HomeScreen = (props: HomeScreenProps) => {
  
  const {
    getRegistrationState 
  } = useAuthState();

  const [loaded, setLoaded] = useState<boolean>(false);
  const [hasAccepeted, setHasAccepeted] = useState<boolean>(false);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const accepted = await getRegistrationState();
    setHasAccepeted(!!accepted && accepted.accepted);
    setLoaded(true)
  };

  return loaded 
    ? (hasAccepeted 
      ? <MainScreen {...props} /> 
      : <TermsAndConditions setHasAccepted={setHasAccepeted} />)
      : <Loading />;
};

export default HomeScreen;