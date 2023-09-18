import React, { useState } from 'react';
import { Button, TextInput } from 'react-native';
import { StyleSheet, Text, View } from 'react-native';
import { AppColorStyles, AppFontStyles } from '../styles/default';
import { CallLog } from '../types/calls';
import { HomeScreenProps } from '../types/routes';
import AppButton from './control/AppButton';
import FlexingExtendableActionButton from './control/FlexingExtendableActionButton';
import { SelectDatePicker } from './control/DatePicker';
import { PhoneNumber } from './control/PhoneNumber';

const HomeScreen = (props: HomeScreenProps) => {

  const { navigation } = props;

  const [number, setNumber] = useState("");
  const [duration, setDuration] = useState(15 * 60); // In Seconds

  const [date, setDate] = useState(Date.now()); // Timestamp of Call
  const [dateOpen, setDateOpen] = useState(false);
  
  const [incoming, setIncoming] = useState(true);

  const onGoToDraftBillsByClient = () => navigation.push('DraftBillsByClient');
  const onGoToClientList = () => navigation.push('ClientList');
  const onGoToBillingHistoryByClient = () => navigation.push('BillingHistoryByClient');

  const onGoToLinkClientToCall = (callLog: CallLog) => navigation.push('LinkClientToCall', {
    callLog
  });

  const parsedDate = new Date(date);
  const formattedDate = parsedDate.toLocaleDateString() + " " + parsedDate.toLocaleTimeString();

  const isFifteenMinuteDefault = duration === 15 * 60;
  const isThirtyMinuteDefault = duration === 30 * 60;
  const isFortyFiveMinuteDefault = duration === 45 * 60;

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
        <View style={styles.callDetails}>
          <Text style={styles.label}>Number:</Text>
          <PhoneNumber 
            number={number} 
            style={styles.entry} 
            onChange={num => setNumber(num)}
          />
          <Text style={styles.label}>When:</Text>
          <Button title={formattedDate} onPress={() => setDateOpen(true)} />
          <SelectDatePicker 
            date={new Date(date)} 
            onCancel={() => { setDateOpen(false); }}
            onConfirm={(date) => { setDate(date.valueOf()); setDateOpen(false); }}
            open={dateOpen}
          />
          <Text style={styles.label}>Duration (in minutes):</Text>
          <FlexingExtendableActionButton
              actions={[
                {
                  layout: 1,
                  onPressAction: () => setDuration(15 * 60),
                  title: "15",
                  isSelected: isFifteenMinuteDefault
                },
                {
                  layout: 1,
                  onPressAction: () => setDuration(30 * 60),
                  title: "30",
                  isSelected: isThirtyMinuteDefault
                },
                {
                  layout: 1,
                  onPressAction: () => setDuration(45 * 60),
                  title: "45",
                  isSelected: isFortyFiveMinuteDefault
                },
                {
                  layout: 1,
                  onPressAction: () => setDuration(60 * 60),
                  title: "Custom",
                  isSelected: !isFifteenMinuteDefault && !isThirtyMinuteDefault && !isFortyFiveMinuteDefault
                }
              ]}/>
          <Text style={styles.label}>Phone Call Direction:</Text>
          <FlexingExtendableActionButton
              actions={[
                {
                  layout: 1,
                  onPressAction: () => setIncoming(true),
                  title: "Incoming",
                  isSelected: incoming
                },
                {
                  layout: 1,
                  onPressAction: () => setIncoming(false),
                  title: "Outgoing",
                  isSelected: !incoming
                }
              ]}/>
        </View>
        <Button
          title="Create Call Record"
          onPress={() => onGoToLinkClientToCall({
            dateTime: new Date(date).toISOString(),
            duration: duration,
            phoneNumber: number,
            timestamp: date.toString(),
            name: "Name",
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
    flex: 1,
    backgroundColor: AppColorStyles.navigationBackground,
  },
  entry: {
    fontSize: AppFontStyles.detailSize,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderColor: 'black',
  },
  label: {
    color: AppColorStyles.text,
    marginTop: 10,
    marginBottom: 10,
    textAlign: 'center',
    fontSize: AppFontStyles.detailSize,
  },
  content: {
    paddingTop: 10,
    flex: 1,
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
  callDetails: {
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