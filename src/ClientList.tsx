import { useIsFocused } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { AppColorStyles, AppFontStyles } from '../styles/default';
import { ClientListProps } from '../types/routes';
import AppButton from './control/AppButton';
import SearchBox from './control/SearchBox';
import useClients from './hooks/useClients';

const ClientList = (props: ClientListProps) => {

  const { navigation } = props;

  const { clients, loadClients, searchClients } = useClients();

  const isFocused = useIsFocused();

  const onGoToClientDetail = (id: string) =>
    navigation.push('ClientDetail', { clientId: id });
  const onGoToAddClient = () => navigation.push('AddNewClient');

  const [searchValue, setSearchValue] = useState("");
  const [loadCount, setLoadCount] = useState(10);

  useEffect(() => {
    if (isFocused)
      searchValue
        ? searchClients(searchValue, loadCount)
        : loadClients(loadCount);
  }, [searchValue, loadCount, isFocused]);

  return (
    <View style={styles.container} >
      <Text style={styles.header}>Client List</Text>
      <SearchBox value={searchValue} onChangeText={text => setSearchValue(text)} />
      <FlatList
        data={clients?.filter(c => c.isValid())}
        keyExtractor={c => c.pk.toString()}
        style={styles.flatList}
        renderItem={
          ({ item }) => (
            <AppButton
              styleOverrides={styles.appButton}
              onPress={() => onGoToClientDetail(item.pk)}
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
  flatList: {
    alignSelf: 'stretch',
    marginBottom: 10
  },
  appButton: {
    borderRadius: 5,
    borderWidth: 1,
    marginLeft: 10,
    marginRight: 10,
    paddingHorizontal: 15,
    paddingVertical: 15,
    fontSize: 16,
    textAlign: 'center',
    alignSelf: 'stretch',
    marginBottom: 10,
  },
  header: {
    color: AppColorStyles.text,
    textAlign: 'center',
    fontSize: AppFontStyles.titleSize,
    marginBottom: 10,
    marginTop: 10,
  },
});