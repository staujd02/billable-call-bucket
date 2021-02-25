import React from 'react';
import { FlatList } from 'react-native';
import { Button, StyleSheet, Text, View } from 'react-native';
import { HomeScreenProps } from '../types/routes';

const HomeScreen = (props: HomeScreenProps) => {

  const { navigation } = props;

  const onGoToDraftBillsByClient = () => navigation.push('DraftBillsByClient');
  const onGoToClientList = () => navigation.push('ClientList');
  const onGoToBillingHistoryByClient = () => navigation.push('BillingHistoryByClient');

  const onGoToLinkClientToCall = () => navigation.push('LinkClientToCall');

  const data = [
    { key: 'Jerry: (222) 111-1111'},
    { key: '(222) 222-2222'},
    { key: 'Kate: (333) 333-3332'},
  ];

  return (
    <View style={styles.container} >
      <Text>HomeScreen</Text>
      <Button title="Draft Bills By Client" onPress={onGoToDraftBillsByClient}>Billable List</Button>
      <Button title="Billing History By Client" onPress={onGoToBillingHistoryByClient}>Billed Call</Button>
      <Button title="Client List" onPress={onGoToClientList}>Client List</Button>
      <Text>Recent Calls</Text>
      <Button title="Recent Calls" onPress={() => false}>Recent Calls</Button>
      <FlatList
        data={data}
        renderItem={
          ({ item }) => (
            <Button onPress={onGoToLinkClientToCall} title="Recent Call">
              {item.key}
            </Button>
          )
        }
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});