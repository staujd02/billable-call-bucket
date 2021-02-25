import React from 'react';
import { Button, FlatList, StyleSheet, Text, View } from 'react-native';
import { DraftBillsByClientProps } from '../types/routes';

const DraftBillsByClient = (props: DraftBillsByClientProps) => {

  const { navigation } = props;

  const onGoToDraftBill = () => navigation.push('DraftBill');

  const data = [
    { key: 'Dave', callCount: "3" },
    { key: 'Joaniz', callCount: "2" },
    { key: 'Sarah', callCount: "4" },
    { key: 'Meradith', callCount: "8" },
    { key: 'Keith', callCount: "1" },
  ];
  
  return (
    <View style={styles.container} >
      <Text>Draft Bills By Client</Text>
      <Text>Draft Bills</Text>
      <FlatList
        data={data}
        renderItem={
          ({ item }) => (
            <Button onPress={onGoToDraftBill} title="Client Detail">
              {item.key} {item.callCount}
            </Button>
          )
        }
      />
    </View>
  );
};

export default DraftBillsByClient;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});