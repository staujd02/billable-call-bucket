import React, { useEffect, useState } from 'react';
import { useIsFocused } from '@react-navigation/native';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { AppColorStyles, AppFontStyles } from '../styles/default';
import { DraftBillsByClientProps } from '../types/routes';
import AppButton from './control/AppButton';
import SearchBox from './control/SearchBox';
import useClients from './hooks/useClients';
import useBillExportor from './hooks/useBillExportor';
import ExportButton from './control/ExportButton';

const DraftBillsByClient = ({ navigation }: DraftBillsByClientProps) => {

  const [searchValue, setSearchValue] = useState("");
  const [loadCount, setLoadCount] = useState(10);

  const { clients, loadClientsWithOpenBills, searchClientsWithOpenBills } = useClients();
  const isFocused = useIsFocused();
  const { exportAllOpenBills } = useBillExportor();

  const onGoToLinkedToClient = (clientId: string) => navigation.push('DraftBill', { clientId });

  const loadMore = () => setLoadCount(loadCount + 5);

  useEffect(() => {
    if (isFocused)
      searchValue
        ? searchClientsWithOpenBills(searchValue, loadCount)
        : loadClientsWithOpenBills(loadCount);
  }, [searchValue, loadCount, isFocused]);

  return (
    <View style={styles.container} >
      <Text style={styles.header}>Clients With Open Bills</Text>
      <SearchBox value={searchValue} onChangeText={text => setSearchValue(text)} />
      <FlatList
        data={clients}
        keyExtractor={c => c.pk.toString()}
        style={styles.flatList}
        onScrollEndDrag={() => loadMore()}
        renderItem={
          ({ item }) => (
            <AppButton
              styleOverrides={styles.appButton}
              onPress={() => onGoToLinkedToClient(item.pk)}
              title={item.name} />
          )
        }
      />
      <View style={styles.spacer} />
      <ExportButton exportProcess={exportAllOpenBills} exportTitle={"Export All Open Bills"} />
      <View style={styles.spacer} />
    </View>
  );
}

export default DraftBillsByClient;

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