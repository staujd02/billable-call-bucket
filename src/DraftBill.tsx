import React, { useEffect, useState } from 'react';
import { useIsFocused } from '@react-navigation/native';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { formatHoursMinutesSeconds } from './service/formatter';
import { AppColorStyles, AppFontStyles } from '../styles/default';
import { Bill, Client } from '../types/calls';
import { DraftBillProps } from '../types/routes';
import AppButton from './control/AppButton';
import DoubleTextLayout from './custom-control/DoubleTextLayout';
import MarkableBilledCall from './custom-control/MarkableBilledCall';
import useBills from './hooks/useBills';
import useCalls from './hooks/useCalls';
import useClients from './hooks/useClients';
import { countCalls, findEarliestCallDate, findLatestCallDate, sumCallDuration } from './utility/callRollups';

const DraftBill = ({ navigation, route }: DraftBillProps) => {

  const id = () => route.params.clientId;

  const [client, setClient] = useState<Client>(null);
  const [bill, setBill] = useState<Bill>(null);

  const isFocused = useIsFocused();

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
    if (isFocused) {
      loadClient();
      loadBill();
    }
  }, [isFocused])

  const toggleCallBilledStatus = async pk => {
    const call = bill.calls.find(c => c.pk === pk);
    call.isBilled
      ? await clearCallsAsBilledStatus(pk)
      : await markCallAsBilled(pk)
    await loadBill();
  };

  const onGoToCallLinkedToClient = pk =>
    navigation.push('CallLinkedToClient', {
      callId: pk,
      clientName: client.name,
      readOnly: false
    });

  const onFinalizeBill = async () => {
    await markBillAsFinalized(bill.pk);
    navigation.replace('Bill', { billId: bill.pk, clientId: id() });
  }

  const clientName = client === null ? "" : client.name;
  const calls = bill === null ? [] : bill.calls.filter(c => c.isValid());

  const numberOfCalls = countCalls(bill);
  const callDurationSum = sumCallDuration(bill);
  const earliestCallDate = findEarliestCallDate(calls);
  const latestCallDate = findLatestCallDate(calls);

  return (
    <View style={styles.container} >
      <Text style={styles.header}>{clientName}</Text>
      <DoubleTextLayout label="Total Duration:" content={formatHoursMinutesSeconds(callDurationSum)} />
      <DoubleTextLayout label="Number of Calls:" content={numberOfCalls.toString()} />
      <DoubleTextLayout label="Earliest Call:" content={earliestCallDate} />
      <DoubleTextLayout label="Latest Call:" content={latestCallDate} />
      <Text style={styles.header}>Calls</Text>
      <View style={styles.listContainer}>
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
      </View>
      <View style={styles.spacer}></View>
      <AppButton onPress={onFinalizeBill} title="Finalize Bill" />
      <View style={styles.spacer}></View>
    </View>
  );
};

export default DraftBill;

const styles = StyleSheet.create({
  spacer: {
    padding: 5
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: AppColorStyles.background,
  },
  listContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: "column",
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: AppColorStyles.background,
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
    // backgroundColor: AppColorStyles.background,
    backgroundColor: 'green',
  },
});