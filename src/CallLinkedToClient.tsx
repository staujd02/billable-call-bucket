import { useIsFocused } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { AppColorStyles, AppFontStyles } from '../styles/default';
import { Call } from '../types/calls';
import { CallLinkedToClientProps } from '../types/routes';
import AppButton from './control/AppButton';
import CallDetails from './custom-control/CallDetails';
import useCalls from './hooks/useCalls';

const CallLinkedToClient = ({ navigation, route }: CallLinkedToClientProps) => {

  const { callId, clientName, readOnly } = route.params;

  const [call, setCall] = useState<Call | null>(null);
  
  const isFocused = useIsFocused();

  const { getCall, deleteCall } = useCalls();

  const loadCall = async () =>
    setCall(await getCall(callId));

  useEffect(() => {
    if(isFocused)
      loadCall();
  }, [isFocused]);

  const onGotoEdit = () => navigation.push('EditLinkedCall', { ...route.params });
  const onDelete = async () => {
    setCall(null);
    await deleteCall(callId);
    navigation.pop();
  }

  const isLoaded = call !== null;
  return (
    <View style={styles.column}>
      <Text style={styles.header}>Call for {clientName}</Text>
      {
        isLoaded
          ? <CallDetails call={call as Call} />
          : <Text>Loading Details...</Text>
      }
      {
        !readOnly &&
        <View style={styles.row}>
          <AppButton title="Edit" onPress={onGotoEdit} />
          <AppButton title="Delete" onPress={onDelete} />
        </View>
      }
    </View>
  );
};

export default CallLinkedToClient;

const styles = StyleSheet.create({
  column: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  row: {
    backgroundColor: '#fff',
    alignSelf: 'stretch',
    display: "flex",
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: "center",
    marginTop: 20,
  },
  header: {
    color: AppColorStyles.text,
    textAlign: 'center',
    fontSize: AppFontStyles.titleSize,
    marginTop: 10,
    marginBottom: 10,
  },
  label: {
    color: AppColorStyles.text,
    textAlign: 'center',
    fontSize: AppFontStyles.detailSize,
  },
});