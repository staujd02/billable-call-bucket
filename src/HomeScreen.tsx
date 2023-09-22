import React, { useEffect, useState } from 'react';
import { Button } from 'react-native';
import { StyleSheet, Text, View } from 'react-native';
import { AppColorStyles, AppFontStyles } from '../styles/default';
import { CallLog } from '../types/calls';
import { HomeScreenProps } from '../types/routes';
import AppButton from './control/AppButton';
import { CreatePhoneRecordForm } from './custom-control/CreatePhoneRecordForm';
import useContacts from './hooks/useContacts';
import { viewExistingContact } from 'react-native-contacts';

const HomeScreen = (props: HomeScreenProps) => {

  const { navigation } = props;

  const { loadContactByNumber, loadedContact } = useContacts();

  const [number, setNumber] = useState("");
  const [duration, setDuration] = useState(15 * 60); // In Seconds
  const [date, setDate] = useState(Date.now()); // Timestamp of Call
  const [incoming, setIncoming] = useState(true);

  useEffect(() => {
    loadContactByNumber(number);
  }, [number]);

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
        <CreatePhoneRecordForm 
            date={date} 
            duration={duration} 
            number={number} 
            incoming={incoming} 
            name={loadedContact ? `${loadedContact?.givenName} ${loadedContact?.familyName}` : "None"}
            setDate={setDate} 
            setDuration={setDuration} 
            setNumber={setNumber} 
            setIncoming={setIncoming} />
        <Button
          title="Create Call Record"
          onPress={async () => onGoToLinkClientToCall({
            dateTime: new Date(date).toISOString(),
            duration: duration,
            phoneNumber: number,
            timestamp: date.toString(),
            name: loadedContact ? `${loadedContact?.givenName} ${loadedContact?.familyName}` : "",
            type: incoming ? 'INCOMING' : 'OUTGOING',
          })} />
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
    overflow: "scroll",
    backgroundColor: AppColorStyles.navigationBackground,
  },
  content: {
    paddingTop: 10,
    backgroundColor: AppColorStyles.background,
  },
  callHeader: {
    display: 'flex',
    flexDirection: "column",
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