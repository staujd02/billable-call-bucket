import React from 'react';
import { Button, FlatList, StyleSheet, Text, View } from 'react-native';
import { ClientBillingHistoryProps } from '../types/routes';

const ClientBillingHistory = (props: ClientBillingHistoryProps) => {

  const { navigation } = props;

  const onGoToBill = () => navigation.push('Bill');
  
  const data = [
    { key: '10', durationBilled: '3h 55min.' },
    { key: '6', durationBilled: '1h 10min.' },
    { key: '12', durationBilled: '3h 25min.' },
    { key: '8', durationBilled: '1h 15min.' },
    { key: '2', durationBilled: '19min.' },
  ];

  return (
    <View style={styles.container} >
      <Text>Client Billing History</Text>
      <Text>Calls Bill #</Text>
      <Text>Duration Billed #</Text>
      <Text>Calls</Text>
      <FlatList
        data={data}
        renderItem={
          ({ item }) => (
            <Button onPress={onGoToBill} title="Call">
              Calls: {item.key} - {item.durationBilled}
            </Button>
          )
        }
      />
    </View>
  );
};

export default ClientBillingHistory;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});