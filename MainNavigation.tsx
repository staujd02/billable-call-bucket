import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './HomeScreen';

const Stack = createStackNavigator();

const MainNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Link Client To Call" component={LinkClientToCall} />
        <Stack.Screen name="Call Linked To Client" component={CallLinkedToClient} />
        <Stack.Screen name="Un-Billed Client Calls" component={UnbilledClientCalls} />
        <Stack.Screen name="Billable Call Entry" component={BillableCallEntry} />
        <Stack.Screen name="Billed Calls" component={BilledCalls} />
        <Stack.Screen name="Clients With Unbilled Calls" component={ClientsWithUnbilledCalls} />
        <Stack.Screen name="Clients Bill History" component={ClientsBillHistory} />
        <Stack.Screen name="Add Client" component={AddClient} />
        <Stack.Screen name="Client Detail" component={ClientDetail} />
        <Stack.Screen name="Client List" component={ClientList} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigation;