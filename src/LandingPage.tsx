import React, { useEffect } from "react";
import { LandingPageProps } from "../types/routes";
import useRegistration from "./hooks/useAuthState";
import AppSplashScreen from "./SplashView";

const LandingPage = ({ navigation }: LandingPageProps) => {

  const {
    getRegistrationState
  } = useRegistration();

  const checkUsersAuthState = async () => {
    const hasRegistered = (await getRegistrationState()) !== undefined;
    hasRegistered
      ? navigation.reset({
        index: 0,
        routes: [{ name: 'HomeScreen' }],
      })
      : navigation.reset({
        index: 0,
        routes: [{ name: 'FirstTimeUser' }],
      })
  }

  useEffect(() => {
    checkUsersAuthState();
  }, []);

  return <AppSplashScreen />
}

export default LandingPage;