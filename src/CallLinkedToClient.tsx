import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { CallLinkedToClientProps } from '../types/routes';

const CallLinkedToClient = (props: CallLinkedToClientProps) => {

  const { navigation } = props;

  const onGotoEdit = () => navigation.push('EditLinkedCall');
  const onDelete = () => navigation.pop();

  return (
    <View style={styles.container} >
        <Text>Call Details...</Text>
        <Text>Contact</Text>
        <Text>Call Notes</Text>
        <Button title="Edit" onPress={onGotoEdit}>Edit</Button>
        <Button title="Delete" onPress={onDelete}>Delete</Button>
    </View>
  );
};

export default CallLinkedToClient;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});