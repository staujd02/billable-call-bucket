import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { AppColorStyles, AppFontStyles } from '../styles/default';
import { AddNewClientProps } from '../types/routes';
import AppButton from './control/AppButton';
import useClients from './hooks/useClients';

const AddNewClient = (props: AddNewClientProps) => {

  const { navigation } = props;
  const { addClient } = useClients();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const onDone = async () => { 
    await addClient({
      name,
      description,
    });
    navigation.navigate('ClientList');
  }

  return (
    <View style={styles.container} >
      <Text style={styles.header}>Add New Client</Text>
      <Text style={styles.label}>Name:</Text>
      <TextInput style={styles.entry} value={name} onChangeText={e => setName(e)}></TextInput>
      <Text style={styles.label}>Description:</Text>
      <TextInput style={styles.entry} value={description} onChangeText={e => setDescription(e)}></TextInput>
      <View style={styles.spacer}></View>
      <AppButton title="Add Client" onPress={onDone} />
    </View>
  );
};

export default AddNewClient;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  spacer: {
    height: 20,
  },
  entry: {
    fontSize: AppFontStyles.detailSize,
    marginBottom: 10,
  },
  header: {
    color: AppColorStyles.text,
    textAlign: 'center',
    fontSize: AppFontStyles.titleSize,
    marginTop: 10,
    marginBottom: 30,
  },
  label: {
    color: AppColorStyles.text,
    textAlign: 'center',
    fontSize: AppFontStyles.detailSize,
  },
});