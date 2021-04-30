import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { AppColorStyles, AppFontStyles } from '../styles/default';
import { ClientListProps } from '../types/routes';
import AppButton from './control/AppButton';
import SearchBox from './control/SearchBox';
import useClients from './hooks/useClients';

const ClientList = (props: ClientListProps) => {

  const { navigation } = props;
  
  const { clients, loadClients, searchClients } = useClients();

  const onGoToClientDetail = () => navigation.push('ClientDetail');
  const onGoToAddClient = () => navigation.push('AddNewClient');
  
  const [searchValue, setSearchValue] = useState("");
  const [loadCount, setLoadCount] = useState(10);
  
  useEffect(() => {
    searchValue
      ? searchClients(searchValue, loadCount)
      : loadClients(loadCount);
  }, [searchValue, loadCount]);

  return (
    <View style={styles.container} >
      <Text style={styles.header}>Client List</Text>
      <SearchBox value={searchValue} onChangeText={text => setSearchValue(text)} />
      <FlatList
        data={clients}
        keyExtractor={c => c.pk.toString()}
        renderItem={
          ({ item }) => (
            <AppButton
              onPress={onGoToClientDetail}
              title={item.name} />
          )
        }
      />
      <AppButton onPress={onGoToAddClient} title="Add Client" />
      <View style={styles.spacer} />
    </View>
  );
};

export default ClientList;

const styles = StyleSheet.create({
  spacer: {
    height: 20
  },
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
});