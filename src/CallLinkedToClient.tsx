import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { AppColorStyles, AppFontStyles } from '../styles/default';
import { Call } from '../types/calls';
import { CallLinkedToClientProps } from '../types/routes';
import CallDetails from './custom-control/CallDetails';
import useCalls from './hooks/useCalls';

const CallLinkedToClient = ({ navigation, route }: CallLinkedToClientProps) => {

  const { callId } = route.params;

  const [call, setCall] = useState<Call>(null);

  const { getCall } = useCalls();

  const loadCall = async () =>
    setCall(await getCall(callId));

  useEffect(() => {
    loadCall()
  }, []);

  const onGotoEdit = () => navigation.push('EditLinkedCall');
  const onDelete = () => navigation.pop();

  const isLoaded = call !== null;
  return (
    <View style={styles.container} >
      <Text style={styles.header}>Call Details</Text>
      {
        isLoaded
          ? <CallDetails call={call} />
          : <Text>Loading Details...</Text>
      }
      <Button title="Edit" onPress={onGotoEdit}>Edit</Button>
      <Button title="Delete" onPress={onDelete}>Delete</Button>
    </View>
  );
};

export default CallLinkedToClient;

const styles = StyleSheet.create({
  topHeader: {
    color: AppColorStyles.text,
    textAlign: 'left',
    fontSize: AppFontStyles.titleSize,
    marginBottom: 10,
    marginTop: 10,
  },
  header: {
    color: AppColorStyles.text,
    textAlign: 'center',
    fontSize: AppFontStyles.titleSize,
    marginBottom: 10,
    marginTop: 10,
  },
  detail: {
    color: AppColorStyles.detailText,
    fontSize: AppFontStyles.detailSize,
    textAlign: 'left',
    paddingLeft: 5,
  },
  container: {
    flex: 1,
    paddingHorizontal: 15,
    justifyContent: 'center',
  },
  list: {}
});