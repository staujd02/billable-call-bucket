import React from 'react';
import { Button, FlatList, StyleSheet, Text, View } from 'react-native';
import { BillingHistoryByClientProps } from '../types/routes';

const BillingHistoryByClient = (props: BillingHistoryByClientProps) => {

  const { navigation } = props;

  const onGoToClientBillingHistory = () => navigation.push('ClientBillingHistory');

  const data = [
    { key: 'Devin', billCount: '3' },
    { key: 'Dan', billCount: '1' },
    { key: 'Dominic', billCount: '5' },
  ];

  return (
    <View style={styles.container} >
      <Text>Billing History By Client</Text>
      <FlatList
        data={data}
        renderItem={
          ({ item }) => (
            <Button onPress={onGoToClientBillingHistory} title="Client Billing History">
              {item.key} {item.billCount}
            </Button>
          )
        }
      />
    </View>
  );
};

export default BillingHistoryByClient;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});