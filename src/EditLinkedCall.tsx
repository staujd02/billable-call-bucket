import React, { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { EditLinkedCallProps } from '../types/routes';

const EditLinkedCall = (props: EditLinkedCallProps) => {

  const { navigation } = props;

  const [contact, setContact] = useState("");
  const [callNotes, setCallNotes] = useState("");

  const onGoToCallLinkedToClient = () => navigation.navigate('CallLinkedToClient');

  return (
    <View style={styles.container} >
      <Text>Edit Linked Call</Text>
      <Text>Call Details...</Text>
      <TextInput value={contact} onChangeText={e => setContact(e)}></TextInput>
      <TextInput value={callNotes} onChangeText={e => setCallNotes(e)}></TextInput>
      <Button title="Done" onPress={onGoToCallLinkedToClient}>Done</Button>
    </View>
  );
};

export default EditLinkedCall;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});