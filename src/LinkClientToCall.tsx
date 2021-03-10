import React, { useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { AppStyle } from '../styles/default';
import { LinkClientToCallProps } from '../types/routes';
import MultiActionButton from './control/MultiActionButton';
import SearchBox from './control/SearchBox';

const LinkClientToCall = (props: LinkClientToCallProps) => {

  const { navigation } = props;

  const onGoToDraftBill = () => navigation.navigate('DraftBill');
  const onGoToClientDetail = () => navigation.push('ClientDetail');

  const [searchValue, setSearchValue] = useState("");

  const data = [
    { key: 'Dave' },
    { key: 'Joaniz' },
    { key: 'Sarah' },
    { key: 'Meradith' },
    { key: 'Keith' },
    { key: 'Keith1' },
    { key: 'Keith2' },
    { key: 'Keith3' },
    { key: 'Keith4' },
    { key: 'Keith5' },
  ];

  return (
    <View style={styles.container} >
      <Text style={styles.header}>Call Details</Text>
      <Text style={styles.header}>...</Text>
      <Text style={styles.header}>Clients</Text>
      <SearchBox value={searchValue} onChangeText={text => setSearchValue(text)} />
      <FlatList
        style={styles.list}
        data={data.filter(d => !searchValue || d.key.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()))}
        renderItem={
          ({ item }) => (
            <MultiActionButton 
              mainTitle={item.key} 
              onPressMainAction={onGoToClientDetail}
              onPressSecondaryAction={onGoToDraftBill}
              secondaryTitle={"bill " + item.key} 
              secondarySymbol='money-bill'  />
          )
        }
      />
    </View>
  );
};

export default LinkClientToCall;

const styles = StyleSheet.create({
  header: {
    color: AppStyle.text,
    textAlign: 'center',
    fontSize: AppStyle.titleSize,
    marginBottom: 10,
    marginTop: 10,
  },
  container: {
    flex: 1,
    // backgroundColor: AppStyle.background,
    paddingHorizontal: 15,
    justifyContent: 'center',
  },
  list: {}
});