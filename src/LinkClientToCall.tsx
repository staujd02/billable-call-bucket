import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const LinkClientToCall = () => {
  return (
    <View style={styles.container} >
        <Text>Link Client to Calls</Text>
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