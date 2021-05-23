import React, { useEffect, useState } from 'react';
import { useIsFocused } from '@react-navigation/native'
import { StyleSheet, Text, View } from 'react-native';
import { AppColorStyles, AppFontStyles } from '../styles/default';
import { Client } from '../types/calls';
import { ClientDetailProps } from '../types/routes';
import AppButton from './control/AppButton';
import useClients from './hooks/useClients';


const ClientDetail = ({ navigation, route }: ClientDetailProps) => {

  const [client, setClient] = useState<Client>(null);

  const isFocused = useIsFocused();

  const { getClient, deleteClient } = useClients();

  const id = () => route.params.clientId;

  const loadClient = async () =>
    setClient(await getClient(id()));

  useEffect(() => {
    if (isFocused)
      loadClient()
  }, [isFocused]);

  const onGoToEditClient = () =>
    navigation.push('EditClient', { clientId: id() });

  const onDelete = async () => {
    setClient(null);
    await deleteClient(id());
    navigation.pop();
  }

  return (
    <View style={styles.column} >
      <Text style={styles.header}>{client?.name}</Text>
      <Text style={styles.label}>{client?.description}</Text>
      <View style={styles.row}>
        <AppButton title="Edit" onPress={onGoToEditClient} />
        <AppButton title="Delete" onPress={onDelete} />
      </View>
    </View>
  );
};

export default ClientDetail;

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