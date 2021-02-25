import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { RootStackParamList } from '../types/routes';
import HomeScreen from './HomeScreen';
import LinkClientToCall from './LinkClientToCall';
import CallLinkedToClient from './CallLinkedToClient';
import DraftBill from './DraftBill';
import EditLinkedCall from './EditLinkedCall';
import DraftBillsByClient from './DraftBillsByClient';
import BillingHistoryByClient from './BillingHistoryByClient';
import ClientBillingHistory from './ClientBillingHistory';
import EditClient from './EditClient';
import AddNewClient from './AddNewClient';
import Bill from './Bill';
import ClientDetail from './ClientDetail';
import ClientList from './ClientList';

const Stack = createStackNavigator<RootStackParamList>();

const MainNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="LinkClientToCall" component={LinkClientToCall} />
        <Stack.Screen name="DraftBill" component={DraftBill} />
        <Stack.Screen name="CallLinkedToClient" component={CallLinkedToClient} />
        <Stack.Screen name="EditLinkedCall" component={EditLinkedCall} />
        <Stack.Screen name="DraftBillsByClient" component={DraftBillsByClient} />
        <Stack.Screen name="BillingHistoryByClient" component={BillingHistoryByClient} />
        <Stack.Screen name="ClientBillingHistory" component={ClientBillingHistory} />
        <Stack.Screen name="EditClient" component={EditClient} />
        <Stack.Screen name="AddNewClient" component={AddNewClient} />
        <Stack.Screen name="Bill" component={Bill} />
        <Stack.Screen name="ClientDetail" component={ClientDetail} />
        <Stack.Screen name="ClientList" component={ClientList} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};


export default MainNavigation;