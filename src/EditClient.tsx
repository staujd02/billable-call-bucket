import React, { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { EditClientProps } from '../types/routes';

const EditClient = (props: EditClientProps) => {

  const { navigation } = props;
  
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  
  const onDone = () => navigation.navigate('ClientDetail');

  return (
    <View style={styles.container} >
      <Text>Edit Client</Text>
      <TextInput value={name} onChangeText={e => setName(e)}></TextInput>
      <TextInput value={description} onChangeText={e => setDescription(e)}></TextInput>
      <Button title="Done" onPress={onDone}>Done</Button>
    </View>
  );
};

export default EditClient;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});