import React, { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { AppColorStyles, AppFontStyles } from '../styles/default';
import { AddNewClientProps } from '../types/routes';

const AddNewClient = (props: AddNewClientProps) => {

  const { navigation } = props;

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const onDone = () => navigation.navigate('ClientList');

  return (
    <View style={styles.container} >
        <Text style={styles.header}>Add New Client</Text>
        <Text style={styles.header}>Add New Client</Text>
        <TextInput value={name} onChangeText={e => setName(e)}></TextInput>
        <Text style={styles.header}>Add New Client</Text>
        <TextInput value={description} onChangeText={e => setDescription(e)}></TextInput>
        <Button title="Done" onPress={onDone}>Done</Button>
    </View>
  );
};

export default AddNewClient;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    color: AppColorStyles.text,
    textAlign: 'center',
    fontSize: AppFontStyles.titleSize,
    marginBottom: 10,
    marginTop: 10,
  },
  label: {
    color: AppColorStyles.text,
    textAlign: 'center',
    marginBottom: 10,
    marginTop: 10,
  },
});