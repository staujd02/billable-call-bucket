import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { AppColorStyles, AppFontStyles } from '../styles/default';
import { EditClientProps } from '../types/routes';
import AppButton from './control/AppButton';
import useClients from './hooks/useClients';

const EditClient = (props: EditClientProps) => {

  const { navigation, route } = props;

  const id = () => route.params.clientId;

  const { getClient, updateClient } = useClients();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [clientPk, setClientPk] = useState("");

  const onDone = async () => { 
    await updateClient({
      name,
      description,
      pk: clientPk,
    });
    navigation.pop();
  }

  const loadClient = async () =>{
    const { name, description, pk } =  await getClient(id());
    setName(name);
    setDescription(description);
    setClientPk(pk);
  }

  useEffect(() => {
    loadClient()
  }, []);

  return (
    <View style={styles.container} >
      <Text style={styles.label}>Name:</Text>
      <TextInput style={styles.entry} value={name} onChangeText={e => setName(e)}></TextInput>
      <Text style={styles.label}>Description:</Text>
      <TextInput style={styles.entry} value={description} onChangeText={e => setDescription(e)}></TextInput>
      <View style={styles.spacer}></View>
      <AppButton title="Save Changes" onPress={onDone} />
    </View>
  );
};

export default EditClient;

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
    borderBottomWidth: 1,
    borderColor: 'black',
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
    marginTop: 10,
    textAlign: 'center',
    fontSize: AppFontStyles.detailSize,
  },
});