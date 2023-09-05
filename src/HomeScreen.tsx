import React from 'react';
import { Button } from 'react-native';
import { StyleSheet, Text, View } from 'react-native';
import { AppColorStyles, AppFontStyles } from '../styles/default';
import { CallLog } from '../types/calls';
import { HomeScreenProps } from '../types/routes';
import AppButton from './control/AppButton';

const HomeScreen = (props: HomeScreenProps) => {

  const { navigation } = props;

  const onGoToDraftBillsByClient = () => navigation.push('DraftBillsByClient');
  const onGoToClientList = () => navigation.push('ClientList');
  const onGoToBillingHistoryByClient = () => navigation.push('BillingHistoryByClient');

  const onGoToLinkClientToCall = (callLog: CallLog) => navigation.push('LinkClientToCall', {
    callLog
  });

  return (
    <View style={styles.container} >
      <View style={styles.navigationRow} >
        <AppButton title="Open Bills" onPress={onGoToDraftBillsByClient} />
        <AppButton title="Billing History" onPress={onGoToBillingHistoryByClient} />
        <AppButton title="Client List" onPress={onGoToClientList} />
      </View>
      <View style={styles.content} >
        <View style={styles.callHeader}>
          <Text style={styles.callHeaderText}>Add Call Record</Text>
        </View>
        <Button 
          title="Add Phone Record"
          onPress={() => onGoToLinkClientToCall({
            dateTime: Date.now().toString(),
            duration: 100,
            name: "Name",
            phoneNumber: "Number",
            rawType: 1,
            timestamp: Date.now().toString(),
            type: 'INCOMING'
          })}>
          Add Phone Record
        </Button>
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  navigationRow: {
    backgroundColor: AppColorStyles.navigationBackground,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: 20,
    marginTop: 20,
  },
  container: {
    flex: 1,
    backgroundColor: AppColorStyles.navigationBackground,
  },
  content: {
    paddingTop: 10,
    flex: 1,
    backgroundColor: AppColorStyles.background,
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
    color: AppColorStyles.text,
    textAlign: 'center',
    fontSize: AppFontStyles.titleSize,
  },
  list: {
    paddingLeft: 5,
    paddingRight: 5,
  }
});