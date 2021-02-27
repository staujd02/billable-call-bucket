import React from 'react';
import { Button, FlatList, StyleSheet, Text, View } from 'react-native';
import { DraftBillProps } from '../types/routes';

const DraftBill = (props: DraftBillProps) => {

  const { navigation } = props;

  const onGoToLinkedToClient = () => navigation.push('CallLinkedToClient');
  const onGoToBill = () => navigation.navigate('Bill');

  const data = [
    { key: 'Nurse', duration: "15 min." },
    { key: 'Doctor', duration: "3 min." },
    { key: 'Lead', duration: "2 min." },
    { key: 'Program Manager', duration: "5 min." },
    { key: 'Doctor Two', duration: "35 min." },
  ];

  return (
    <View style={styles.container} >
      <Text>Draft Bill</Text>
      <Text>Client Name</Text>
      <Text>Calls</Text>
      <FlatList
        data={data}
        renderItem={
          ({ item }) => (
            <Button onPress={onGoToLinkedToClient} title="Call Detail">
              {item.key} - {item.duration}
            </Button>
          )
        }
      />
      <Button onPress={onGoToBill} title="Invoice Bill"></Button>
    </View>
  );
};

export default DraftBill;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});