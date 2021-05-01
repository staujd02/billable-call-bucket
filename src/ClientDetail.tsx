import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { AppColorStyles, AppFontStyles } from '../styles/default';
import { Client } from '../types/calls';
import { ClientDetailProps } from '../types/routes';
import AppButton from './control/AppButton';
import useClients from './hooks/useClients';

const ClientDetail = ({ navigation, route }: ClientDetailProps) => {

  const [client, setClient] = useState<Client>(null);
  const { getClient } = useClients();

  const loadClient = async () => 
    setClient(await getClient(route.params.clientId))

  useEffect(() => {
    loadClient()
  }, []);

  const onGoToEditClient = () => navigation.push('EditClient');
  const onDelete = () => navigation.navigate('ClientList');

  return (
    <View style={styles.container} >
      <Text style={styles.header}>Client Detail</Text>
      <Text style={styles.label}>Name: {client?.name}</Text>
      <Text style={styles.label}>Description:</Text>
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
  row: {
    display: "flex",
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: "center",
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
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