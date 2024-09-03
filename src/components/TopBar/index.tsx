import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, Text, Icon} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const TopBar = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>KELLTONCODE SCANNER</Text>
      <MaterialCommunityIcons color={'#fff'} size={20} name="wifi" />
    </View>
  );
};

export default TopBar;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: 'rgba(0,0,0, 0.8)',
    display: 'flex',
    height: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    columnGap: 12,
    zIndex: 9999,
  },
  text: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
});
