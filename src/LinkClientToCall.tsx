import React from 'react';
import { Button, FlatList, StyleSheet, Text, View } from 'react-native';
import { LinkClientToCallProps } from '../types/routes';
import MultiActionButton from './control/MultiActionButton';

const LinkClientToCall = (props: LinkClientToCallProps) => {

  const { navigation } = props;

  const onGoToDraftBill = () => navigation.navigate('DraftBill');
  const onGoToClientDetail = () => navigation.push('ClientDetail');

  const data = [
    { key: 'Dave' },
    { key: 'Joaniz' },
    { key: 'Sarah' },
    { key: 'Meradith' },
    { key: 'Keith' },
  ];

  return (
    <View style={styles.container} >
      <Text>Clients</Text>
      <Button title="Recent Calls" onPress={() => false}>Recent Calls</Button>
      <FlatList
        data={data}
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
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});