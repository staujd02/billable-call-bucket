import React from 'react';
import { Button, FlatList, StyleSheet, Text, View } from 'react-native';
import { BillProps } from '../types/routes';

const Bill = (props: BillProps) => {

  const { navigation } = props;

  const onGotoCall = () => navigation.push('CallLinkedToClient');

  const data = [
    { key: 'Devin', duration: '1h 30min.' },
    { key: 'Dan', duration: '2h 30min.'  },
    { key: 'Dominic', duration: '30min.'  },
  ];

  return (
    <View style={styles.container} >
      <Text>Client Name</Text>
      <Text>Calls Billed</Text>
      <Text>Duration Billed</Text>
      <Text>Calls</Text>
      <FlatList
        data={data}
        renderItem={
          ({ item }) => <Button onPress={onGotoCall} title="Call Entry">{item.key} - {item.duration}</Button>
        }
      />
    </View>
  );
};

export default Bill;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});