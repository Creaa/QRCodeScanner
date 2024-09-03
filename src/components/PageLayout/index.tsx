import React, {FC} from 'react';
import {View} from 'react-native';
import TopBar from '../TopBar';
import Navigation from '../Navigation';
import {SafeAreaView} from 'react-native-safe-area-context';

interface IProps {
  mode: string;
  children: JSX.Element;
  setMode: (mode: string) => void;
}

const PageLayout: FC<IProps> = ({children, mode, setMode}) => {
  return (
    <SafeAreaView style={{justifyContent: 'space-between', height: '100%'}}>
      <View style={{height: '5%'}}>
        <TopBar />
      </View>
      <View style={{height: '85%'}}>{children}</View>
      <View style={{height: '10%'}}>
        <Navigation mode={mode} setMode={setMode} />
      </View>
    </SafeAreaView>
  );
};

export default PageLayout;
