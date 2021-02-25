import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const EditClient = () => {
  return (
    <View style={styles.container} >
        <Text>Edit Client</Text>
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