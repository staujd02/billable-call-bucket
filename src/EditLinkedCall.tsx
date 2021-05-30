import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { AppColorStyles, AppFontStyles } from '../styles/default';
import { Call } from '../types/calls';
import { EditLinkedCallProps } from '../types/routes';
import AppButton from './control/AppButton';
import InlineTextInputWithLabel from './custom-control/InlineTextInputWithLabel';
import StaticCallDetails from './custom-control/StaticCallDetails';
import useCalls from './hooks/useCalls';

const EditLinkedCall = ({ route, navigation }: EditLinkedCallProps) => {

  const { callId, clientName } = route.params;

  const [call, setCall] = useState<Call>(null);
  const [callReason, setCallReason] = useState<string>("");
  const [contactNotes, setContactNotes] = useState<string>("");

  const { getCall, updateCall } = useCalls();

  const loadCall = async () => {
    const call = await getCall(callId);
    setCall(call);
    setCallReason(call.callReason);
    setContactNotes(call.contactNotes);
  }

  useEffect(() => {
    loadCall()
  }, []);

  const onSaveEdits = () => {
    updateCall({
      callPk: callId,
      callReason,
      contactNotes,
    });
    navigation.pop();
  }

  const isLoaded = call !== null;
  return (
    <View style={styles.column}>
      <Text style={styles.header}>Call for {clientName}</Text>
      {
        isLoaded
          ? <View style={styles.nestedColumn}>
            <StaticCallDetails call={call} />
            <InlineTextInputWithLabel
              label="Contact Notes:"
              onChangeText={s => setContactNotes(s)}
              value={contactNotes} />
            <InlineTextInputWithLabel
              label="Call Notes:"
              onChangeText={s => setCallReason(s)}
              value={callReason} />
          </View>
          : <Text>Loading Details...</Text>
      }
      <View style={styles.row}>
        <AppButton title="Save Edits" onPress={onSaveEdits} />
      </View>
    </View>
  );
};

export default EditLinkedCall;

const styles = StyleSheet.create({
  column: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  nestedColumn: {
    paddingLeft: 15,
    paddingRight: 15,
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