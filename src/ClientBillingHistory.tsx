import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { AppColorStyles, AppFontStyles } from '../styles/default';
import { Bill, Client } from '../types/calls';
import { ClientBillingHistoryProps } from '../types/routes';
import DoubleTextLayout from './custom-control/DoubleTextLayout';
import SelectableBillItem from './custom-control/SelectableBillItem';
import useBills from './hooks/useBills';
import useClients from './hooks/useClients';

const ClientBillingHistory = ({ navigation, route }: ClientBillingHistoryProps) => {

  const { clientId } = route.params;

  const [client, setClient] = useState<Client>(null);
  const [bills, setBills] = useState<Array<Bill>>([]);

  const { getClient } = useClients();
  const { getSortedClientBills } = useBills();

  const onGoToBill = (bill: Bill) =>
    navigation.push('Bill', {
      clientName: client.name,
      billId: bill.pk,
    });

  const onGoToDraftBill = () =>
    navigation.push('DraftBill', { clientId });

  const loadClient = async () => 
    setClient(await getClient(clientId));

  const loadClientBills = async () => 
    setBills(await getSortedClientBills(clientId));

  useEffect(() => {
    loadClient();
    loadClientBills();
  }, [])

  return (
    <View style={styles.container} >
      <Text style={styles.header}>{client?.name}'s Billing History</Text>
      <DoubleTextLayout label="Number of Bills:" content={client?.bills.length.toString()} />
      <DoubleTextLayout label="Totat Duration Billed:" content={"?"} />
      <DoubleTextLayout label="Total Calls Billed:" content={"?"} />
      <Text style={styles.header}>Bills</Text>
      <View style={styles.listContainer}>
        <FlatList
          data={bills}
          style={styles.list}
          keyExtractor={c => c.pk.toString()}
          renderItem={
            ({ item }) => (
              <SelectableBillItem
                bill={item}
                onClosedBillPress={() => onGoToBill(item)}
                onOpenBillPress={() => onGoToDraftBill()} />
            )
          }
        />
      </View>
    </View>
  );
};

export default ClientBillingHistory;

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    paddingLeft: 10,
    paddingRight: 10,
  },
  spacer: {
    padding: 10
  },
  container: {
    flex: 1,
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
    backgroundColor: AppColorStyles.background,
  }
});