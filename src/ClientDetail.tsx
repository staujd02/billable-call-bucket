import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { ClientDetailProps } from '../types/routes';

const ClientDetail = (props: ClientDetailProps) => {

  const { navigation } = props;

  const onGoToEditClient = () => navigation.push('EditClient');
  const onDelete = () => navigation.navigate('ClientList');

  return (
    <View style={styles.container} >
        <Text>Client Detail</Text>
        <Text>Name</Text>
        <Text>Description</Text>
        <Button title="Edit" onPress={onGoToEditClient}>Edit</Button>
        <Button title="Delete" onPress={onDelete}>Delete</Button>
    </View>
  );
};

export default ClientDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});