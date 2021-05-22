import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { formatHoursMinutesSeconds, formatTimestamp } from './service/formatter';
import { AppColorStyles, AppFontStyles } from '../styles/default';
import { Bill, Client } from '../types/calls';
import { DraftBillProps } from '../types/routes';
import AppButton from './control/AppButton';
import DoubleTextLayout from './custom-control/DoubleTextLayout';
import MarkableBilledCall from './custom-control/MarkableBilledCall';
import useBills from './hooks/useBills';
import useCalls from './hooks/useCalls';
import useClients from './hooks/useClients';

const DraftBill = ({ navigation, route }: DraftBillProps) => {

  const id = () => route.params.clientId;

  const [client, setClient] = useState<Client>(null);
  const [bill, setBill] = useState<Bill>(null);

  const { getClient } = useClients();
  const {
    getOpenBill,
    markBillAsFinalized,
  } = useBills();
  const {
    markCallAsBilled,
    clearCallsAsBilledStatus
  } = useCalls();

  const loadClient = async () => setClient(await getClient(id()))
  const loadBill = async () => setBill(await getOpenBill(id()))

  useEffect(() => {
    loadClient();
    loadBill();
  }, [])

  const toggleCallBilledStatus = async pk => {
    const call = bill.calls.find(c => c.pk === pk);
    call.isBilled
      ? await clearCallsAsBilledStatus(pk)
      : await markCallAsBilled(pk)
    await loadBill();
  };

  const onGoToCallLinkedToClient = pk =>
    navigation.push('CallLinkedToClient', { callId: pk, clientName: client.name });

  const onFinalizeBill = async () => {
    await markBillAsFinalized(bill.pk);
    navigation.navigate('Bill', { billId: bill.pk, clientName: client.name });
  }

  const calls = bill === null ? [] : bill.calls;
  const clientName = client === null ? "" : client.name;
  const callDurationSum = calls.reduce((prev, cur) => cur.duration + prev, 0);

  const earliestCall = calls.reduce((prev, cur) => parseInt(cur.timestamp) > parseInt(prev.timestamp) ? prev : cur, calls[0]);
  const earliestCallDate = calls.length > 0
    ? formatTimestamp(earliestCall.timestamp)
    : "";

  const latestCall = calls.reduce((prev, cur) => parseInt(cur.timestamp) < parseInt(prev.timestamp) ? prev : cur, calls[0]);
  const latestCallDate = calls.length > 0
    ? formatTimestamp(latestCall.timestamp)
    : "";

  return (
    <View style={styles.container} >
      <View style={styles.content}>
        <Text style={styles.header}>{clientName}</Text>
        <DoubleTextLayout label="Total Duration:" content={formatHoursMinutesSeconds(callDurationSum)} />
        <DoubleTextLayout label="Number of Calls:" content={calls.length.toString()} />
        <DoubleTextLayout label="Earliest Call:" content={earliestCallDate} />
        <DoubleTextLayout label="Latest Call:" content={latestCallDate} />
        <Text style={styles.header}>Calls</Text>
      </View>
      <FlatList
        data={calls}
        style={styles.list}
        keyExtractor={c => c.pk.toString()}
        renderItem={
          ({ item }) => (
            <MarkableBilledCall
              call={item}
              onGoToCallLinkedToClient={onGoToCallLinkedToClient}
              toggleCallBilledStatus={toggleCallBilledStatus} />
          )
        }
      />
      <AppButton onPress={onFinalizeBill} title="Finalize Bill" />
      <View style={styles.spacer}></View>
    </View>
  );
};

export default DraftBill;

const styles = StyleSheet.create({
  spacer: {
    padding: 10
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  list: {
    paddingLeft: 5,
    paddingRight: 5,
  },
  header: {
    color: AppColorStyles.text,
    textAlign: 'center',
    fontSize: AppFontStyles.titleSize,
    marginBottom: 10,
    marginTop: 10,
  },
  content: {
    paddingTop: 10,
    flex: 1,
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: AppColorStyles.background,
  },
});