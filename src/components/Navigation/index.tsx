import React, {FC} from 'react';
import {StyleSheet, View} from 'react-native';
import {Text} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

interface IProps {
  mode: string;
  setMode: (mode: string) => void;
}

const Navigation: FC<IProps> = ({mode, setMode}) => {
  return (
    <View style={styles.container}>
      <View style={styles.menuList}>
        <View
          onTouchEnd={() => setMode('scanner')}
          style={[
            styles.menuItem,
            mode === 'scanner' && styles.activeMenuItem,
          ]}>
          <MaterialCommunityIcons color="#fff" size={30} name="qrcode-scan" />
          <Text style={styles.menuText}>Scanner</Text>
        </View>
        <View
          onTouchEnd={() => setMode('list')}
          style={[styles.menuItem, mode === 'list' && styles.activeMenuItem]}>
          <MaterialCommunityIcons color="#fff" size={30} name="folder" />
          <Text style={styles.menuText}>History</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(0,0,0, 0.8)',
    width: '100%',
  },
  menuList: {
    paddingTop: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    columnGap: '20%',
  },
  menuItem: {
    alignItems: 'center',
    opacity: 0.6,
  },
  activeMenuItem: {
    opacity: 1,
  },
  menuText: {
    fontSize: 14,
    color: '#fff',
    marginTop: 8,
  },
});

export default Navigation;
