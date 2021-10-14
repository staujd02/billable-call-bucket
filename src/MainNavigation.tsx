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
import { AppColorStyles } from '../styles/default';
import FirstTimeUser from './FirstTimeUser';

const Stack = createStackNavigator<RootStackParamList>();

const defaultStyle = {
  backgroundColor: AppColorStyles.headerBackground,
};

const MainNavigation = () => {
  const createOptions = (title: string) => ({  title, headerTintColor: AppColorStyles.headerText, headerStyle: defaultStyle });
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="FirstTimeUser" component={FirstTimeUser} options={createOptions('FirstTimeUser')} />
        <Stack.Screen name="Home" component={HomeScreen} options={createOptions('Home')} />
        <Stack.Screen name="LinkClientToCall" component={LinkClientToCall} options={createOptions('Link Client To Call')} />
        <Stack.Screen name="DraftBill" component={DraftBill} options={createOptions('Open Bill')} />
        <Stack.Screen name="CallLinkedToClient" component={CallLinkedToClient} options={createOptions('Call Linked To Client')} />
        <Stack.Screen name="EditLinkedCall" component={EditLinkedCall} options={createOptions('Edit Linked Call')} />
        <Stack.Screen name="DraftBillsByClient" component={DraftBillsByClient} options={createOptions('Open Bills By Client')} />
        <Stack.Screen name="BillingHistoryByClient" component={BillingHistoryByClient} options={createOptions('Billing History By Client')} />
        <Stack.Screen name="ClientBillingHistory" component={ClientBillingHistory} options={createOptions('Client Billing History')} />
        <Stack.Screen name="EditClient" component={EditClient} options={createOptions('Edit Client')} />
        <Stack.Screen name="AddNewClient" component={AddNewClient} options={createOptions('Add New Client')} />
        <Stack.Screen name="Bill" component={Bill} options={createOptions('Bill')} />
        <Stack.Screen name="ClientDetail" component={ClientDetail} options={createOptions('Client Detail')} />
        <Stack.Screen name="ClientList" component={ClientList} options={createOptions('Client List')} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};


export default MainNavigation;