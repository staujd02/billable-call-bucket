import React from 'react';
import { FlatList } from 'react-native';
import { StyleSheet, Text, View } from 'react-native';
import { AppStyle } from '../styles/default';
import { HomeScreenProps } from '../types/routes';
import AppButton from './control/AppButton';
import SelectableListItem from './control/SelectableListItem';

const HomeScreen = (props: HomeScreenProps) => {

  const { navigation } = props;

  const onGoToDraftBillsByClient = () => navigation.push('DraftBillsByClient');
  const onGoToClientList = () => navigation.push('ClientList');
  const onGoToBillingHistoryByClient = () => navigation.push('BillingHistoryByClient');

  const onGoToLinkClientToCall = () => navigation.push('LinkClientToCall');

  const data = [
    { key: 'Jerry: (222) 111-1111' },
    { key: '(222) 222-2222' },
    { key: 'Kate: (232) 333-3332' },
    { key: 'Kate: (133) 333-3332' },
    { key: 'Kate: (233) 333-3332' },
    { key: 'Kate: (333) 353-3332' },
    { key: 'Kate: (444) 333-3332' },
    { key: 'Kate: (555) 333-3332' },
    { key: 'Kate: (666) 333-3332' },
    { key: 'Kate: (777) 333-3332' },
    { key: 'Kate: (888) 333-3332' },
    { key: 'Kate: (999) 333-3332' },
    { key: 'Kate: (313) 333-3332' },
    { key: 'Kate: (323) 333-3332' },
    { key: 'Kate: (333) 333-3332' },
    { key: 'Kate: (343) 333-3332' },
    { key: 'Kate: (353) 333-3332' },
  ];

  return (
    <View style={styles.container} >
      <View style={styles.navigationRow} >
        <AppButton title="Draft Bills" onPress={onGoToDraftBillsByClient} />
        <AppButton title="Billing History" onPress={onGoToBillingHistoryByClient} />
        <AppButton title="Client List" onPress={onGoToClientList} />
      </View>
      <View style={styles.content} >
        <Text style={styles.callHeader} >Recent Calls</Text>
        <FlatList
          data={data}
          style={styles.list}
          renderItem={
            ({ item }) => <SelectableListItem onPress={onGoToLinkClientToCall} title={item.key} />
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