import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { AppColorStyles, AppFontStyles } from '../styles/default';
import { Bill, Call } from '../types/calls';
import { BillProps } from '../types/routes';
import AppButton from './control/AppButton';
import DoubleTextLayout from './custom-control/DoubleTextLayout';
import SelectableBilledCallItem from './custom-control/SelectableBilledCallItem';
import useBills from './hooks/useBills';
import { formatDate, formatHoursMinutesSeconds, formatTimestamp } from './service/formatter';

const BillComponent = ({ route, navigation }: BillProps) => {

  const { billId, clientName } = route.params;

  const [bill, setBill] = useState<Bill>(null);

  const {
    getBill,
  } = useBills();

  const loadBill = async () => setBill(await getBill(billId))

  useEffect(() => {
    loadBill();
  }, [])

  const onGoHome = async () =>
    navigation.navigate('Home');

  const onGoToCallLinkedToClient = async ({ pk }: Call) =>
    navigation.navigate('CallLinkedToClient', {
      clientName,
      callId: pk,
      readOnly: true,
    });

  const calls = bill === null ? [] : bill.calls;
  const callDurationSum = calls.reduce((prev, cur) => cur.duration + prev, 0);

  const earliestCall = calls.reduce((prev, cur) => parseInt(cur.timestamp) > parseInt(prev.timestamp) ? prev : cur, calls[0]);
  const earliestCallDate = calls.length > 0
    ? formatTimestamp(earliestCall.timestamp)
    : "";

  const latestCall = calls.reduce((prev, cur) => parseInt(cur.timestamp) < parseInt(prev.timestamp) ? prev : cur, calls[0]);
  const latestCallDate = calls.length > 0
    ? formatTimestamp(latestCall.timestamp)
    : "";

  const finalizedOn = bill
    ? formatDate(bill.finalizedOn)
    : "";

  return (
    <View style={styles.container} >
      <Text style={styles.header}>{clientName}</Text>
      <DoubleTextLayout label="Total Duration:" content={formatHoursMinutesSeconds(callDurationSum)} />
      <DoubleTextLayout label="Number of Calls:" content={calls.length.toString()} />
      <DoubleTextLayout label="Earliest Call:" content={earliestCallDate} />
      <DoubleTextLayout label="Latest Call:" content={latestCallDate} />
      <DoubleTextLayout label="Finalized On:" content={finalizedOn} />
      <Text style={styles.header}>Calls</Text>
      <View style={styles.listContainer}>
        <FlatList
          data={calls}
          keyExtractor={c => c.pk.toString()}
          renderItem={
            ({ item }) => (
              <SelectableBilledCallItem
                call={item}
                onPress={() => onGoToCallLinkedToClient(item)}
              />
            )
          }
        />
      </View>
      <View style={styles.spacer}></View>
      <AppButton onPress={onGoHome} title="Go Home" />
      <View style={styles.spacer}></View>
    </View>
  );
};

export default BillComponent;

const styles = StyleSheet.create({
  spacer: {
    padding: 10
  },
  listContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: "row",
    paddingLeft: 10,
    paddingRight: 10,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    color: AppColorStyles.text,
    textAlign: 'center',
    fontSize: AppFontStyles.titleSize,
    marginBottom: 10,
    marginTop: 10,
  },
});