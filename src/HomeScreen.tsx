import React from 'react';
import { FlatList, RefreshControlBase } from 'react-native';
import { StyleSheet, Text, View } from 'react-native';
import { AppStyle } from '../styles/default';
import { HomeScreenProps } from '../types/routes';
import AppButton from './control/AppButton';
import SymbolButton from './control/SymbolButton';
import SelectableCallItem from './custom-control/SelectableCallItem';
import useCallLogs from './hooks/useCallLogs';

const HomeScreen = (props: HomeScreenProps) => {

  const { navigation } = props;

  const { callLogData, refreshLogs, loadMore } = useCallLogs();

  const onGoToDraftBillsByClient = () => navigation.push('DraftBillsByClient');
  const onGoToClientList = () => navigation.push('ClientList');
  const onGoToBillingHistoryByClient = () => navigation.push('BillingHistoryByClient');

  const onGoToLinkClientToCall = () => navigation.push('LinkClientToCall');

  return (
    <View style={styles.container} >
      <View style={styles.navigationRow} >
        <AppButton title="Draft Bills" onPress={onGoToDraftBillsByClient} />
        <AppButton title="Billing History" onPress={onGoToBillingHistoryByClient} />
        <AppButton title="Client List" onPress={onGoToClientList} />
      </View>
      <View style={styles.content} >
        <View style={styles.callHeader}>
          <SymbolButton onPress={() => loadMore(3)} symbol="chevron-circle-down" title="Load More"></SymbolButton>
          <Text style={styles.callHeaderText}>Recent Calls</Text>
          <SymbolButton onPress={() => refreshLogs()} symbol="sync-alt" title="Refresh"></SymbolButton>
        </View>
        <FlatList
          data={callLogData || []}
          style={styles.list}
          listKey='timestamp'
          renderItem={
            ({ item }) => <SelectableCallItem onPress={onGoToLinkClientToCall} callLog={item} />
          }
        />
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  navigationRow: {
    backgroundColor: AppStyle.navigationBackground,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: 20,
    marginTop: 20,
  },
  container: {
    flex: 1,
    backgroundColor: AppStyle.navigationBackground,
  },
  content: {
    paddingTop: 10,
    flex: 1,
    backgroundColor: AppStyle.background,
  },
  callHeader: {
    display: 'flex',
    flexDirection: "row",
    justifyContent: 'space-between',
    alignItems: "center",
    paddingLeft: 20,
    paddingRight: 20,
    marginBottom: 20,
    marginTop: 10,
  },
  callHeaderText: {
    color: AppStyle.text,
    textAlign: 'center',
    fontSize: AppStyle.titleSize,
  },
  list: {
    paddingLeft: 5,
    paddingRight: 5,
  }
});