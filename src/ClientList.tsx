import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { ClientListProps } from '../types/routes';

const ClientList = (props: ClientListProps) => {

  const { navigation } = props;

  const onGoToClientDetail = () => navigation.push('ClientDetail');
  const onGoToAddClient = () => navigation.push('AddNewClient');

  const data = [
    { key: 'Dave' },
    { key: 'Joaniz' },
    { key: 'Sarah' },
    { key: 'Meradith' },
    { key: 'Keith' },
  ];

  return (
    <View style={styles.container} >
      <Text>Client List</Text>
      <FlatList
        data={data}
        renderItem={
          ({ item }) => (
            <Button onPress={onGoToClientDetail} title="Client Detail">
              {item.key}
            </Button>
          )
        }
      />
      <Button onPress={onGoToAddClient} title="Add Client">Add Client</Button>
    </View>
  );
};

export default ClientList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});