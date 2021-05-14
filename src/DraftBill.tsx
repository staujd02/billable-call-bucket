import React, { useEffect, useState } from 'react';
import { Button, FlatList, StyleSheet, Text, View } from 'react-native';
import { Bill, Client } from '../types/calls';
import { DraftBillProps } from '../types/routes';
import AppButton from './control/AppButton';
import useBills from './hooks/useBills';
import useClients from './hooks/useClients';

const DraftBill = ({ navigation, route }: DraftBillProps) => {

  const id = () => route.params.clientId;

  const [client, setClient] = useState<Client>(null);
  const [bill, setBill] = useState<Bill>(null);

  const { getClient } = useClients();
  const { getOpenBill } = useBills();

  const loadClient = async () => setClient(await getClient(id()))
  const loadBill = async () => setBill(await getOpenBill(id()))

  useEffect(() => {
    loadClient();
    loadBill();
  }, [])

  const onGoToCallLinkedToClient = () => navigation.push('CallLinkedToClient');
  const onGoToBill = () => navigation.navigate('Bill');

  const calls = bill === null ? [] : bill.calls;
  const clientName = client === null ? "" : client.name;

  return (
    <View style={styles.container} >
      <Text>Draft Bill</Text>
      <Text>Client: {clientName}</Text>
      <Text>Calls</Text>
      <FlatList
        data={calls}
        keyExtractor={c => c.pk.toString()}
        renderItem={
          ({ item }) => (
            <AppButton
              onPress={onGoToCallLinkedToClient}
              title={item.contactNotes + ' ' + item.callReason} />
          )
        }
      />
      <Button onPress={onGoToBill} title="Invoice Bill"></Button>
    </View>
  );
};

export default DraftBill;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});