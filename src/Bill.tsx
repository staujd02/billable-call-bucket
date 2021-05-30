import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { AppColorStyles, AppFontStyles } from '../styles/default';
import { Bill, Call, Client } from '../types/calls';
import { BillProps } from '../types/routes';
import AppButton from './control/AppButton';
import ExportButton from './control/ExportButton';
import DoubleTextLayout from './custom-control/DoubleTextLayout';
import SelectableBilledCallItem from './custom-control/SelectableBilledCallItem';
import useBillExportor from './hooks/useBillExportor';
import useBills from './hooks/useBills';
import useClients from './hooks/useClients';
import { formatDate, formatHoursMinutesSeconds } from './service/formatter';
import { countCalls, findEarliestCallDate, findLatestCallDate, sumCallDuration } from './utility/callRollups';

const BillComponent = ({ route, navigation }: BillProps) => {

  const { billId, clientId } = route.params;

  const [bill, setBill] = useState<Bill>(null);
  const [client, setClient] = useState<Client>(null);

  const {
    getBill,
  } = useBills();
  
  const {
    getClient,
  } = useClients();

  const loadBill = async () => setBill(await getBill(billId));
  const loadClient = async () => setClient(await getClient(clientId));

  useEffect(() => {
    loadBill();
    loadClient()
  }, [])

  const { exportSpecificBill } = useBillExportor();

  const onGoHome = async () =>
    navigation.navigate('Home');

  const onGoToCallLinkedToClient = async ({ pk }: Call) =>
    navigation.navigate('CallLinkedToClient', {
      clientName: client?.name,
      callId: pk,
      readOnly: true,
    });

  const calls = bill === null ? [] : bill.calls;

  const numberOfCalls = countCalls(bill);
  const callDurationSum = sumCallDuration(bill);
  const earliestCallDate = findEarliestCallDate(calls);
  const latestCallDate = findLatestCallDate(calls);

  const exportThisBill = () => exportSpecificBill(billId, client);

  const finalizedOn = bill
    ? formatDate(bill.finalizedOn)
    : "";

  return (
    <View style={styles.container} >
      <Text style={styles.header}>{client?.name}</Text>
      <DoubleTextLayout label="Total Duration:" content={formatHoursMinutesSeconds(callDurationSum)} />
      <DoubleTextLayout label="Number of Calls:" content={numberOfCalls.toString()} />
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
      <View style={styles.spacer}>
        <AppButton onPress={onGoHome} title="Go Home" />
        {client && <ExportButton exportProcess={exportThisBill} exportTitle={"Export This Bill"} />}
      </View>
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