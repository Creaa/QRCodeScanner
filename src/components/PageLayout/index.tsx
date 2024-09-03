import React, {FC} from 'react';
import {Platform, SafeAreaView, View} from 'react-native';
import TopBar from '../TopBar';
import Navigation from '../Navigation';

interface IProps {
  mode: string;
  children: JSX.Element;
  setMode: (mode: string) => void;
}

const PageLayout: FC<IProps> = ({children, mode, setMode}) => {
  return (
    <View>
      <View style={{justifyContent: 'space-between', height: '100%'}}>
        <SafeAreaView style={{height: Platform.OS === 'ios' ? '10%' : '5%'}}>
          <TopBar />
        </SafeAreaView>
        <View style={{height: '80%'}}>{children}</View>
        <View style={{height: '10%'}}>
          <Navigation mode={mode} setMode={setMode} />
        </View>
      </View>
    </View>
  );
};

export default PageLayout;
