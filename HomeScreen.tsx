import { StackView } from '@react-navigation/stack';
import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

const HomeScreen = () => {
  return (
    <View style={styles.container} >
        <Text>HomeScreen</Text>
        <Button title="Recent Calls" onPress={()=>false}>Recent Calls</Button>
        <Button title="Billable List" onPress={()=>false}>Billable List</Button>
        <Button title="Billed Calls" onPress={()=>false}>Billed Call</Button>
        <Button title="Manage Client List" onPress={()=>false}>Manage Client List</Button>
        <Text>Recent Calls</Text>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});