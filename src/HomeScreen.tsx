import React from 'react';
import { FlatList } from 'react-native';
import { StyleSheet, Text, View } from 'react-native';
import { AppStyle } from '../styles/default';
import { HomeScreenProps } from '../types/routes';
import AppButton from './control/AppButton';
import SelectableCallItem from './custom-control/SelectableCallItem';
import useCallLogs from './hooks/useCallLogs';

const HomeScreen = (props: HomeScreenProps) => {

  const { navigation } = props;

  const { callLogData } = useCallLogs();

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
        <Text style={styles.callHeader}>Recent Calls</Text>
        <FlatList
          data={callLogData || []}
          style={styles.list}
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
    color: AppStyle.text,
    textAlign: 'center',
    fontSize: AppStyle.titleSize,
    marginBottom: 10,
  },
  list: {
    paddingLeft: 5,
    paddingRight: 5,
  }
});