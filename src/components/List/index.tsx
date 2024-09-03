import React, {FC, useCallback, useEffect, useMemo, useState} from 'react';
import {Alert, FlatList, ListRenderItemInfo, View} from 'react-native';
import {List, Text} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import QRCode from '../../interfaces/QRCode';
import useQRCodeData from '../../db/getCodes';
import {useAtom} from 'jotai';
import {qrCodesAtom} from '../../atoms/qrCodesAtom';

interface IListProps {
  data: QRCode;
  onRemoveItem: (uuid: string) => void;
}

const ListElement: FC<IListProps> = ({data, onRemoveItem}) => {
  const removeItemCallback = useCallback(() => {
    Alert.alert('Confirmation', 'Do you want to remove this code?', [
      {text: 'Cancel', onPress: () => console.log('Cancel Pressed')},
      {text: 'OK', onPress: () => onRemoveItem(data.uuid)},
    ]);
  }, []);

  const dateOptions: Intl.DateTimeFormatOptions = {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  };

  return (
    <List.Section style={{position: 'relative'}} title="">
      <List.Accordion
        title={data.code}
        left={() => (
          <View
            style={{
              width: 35,
              height: 35,
              backgroundColor: data.is_synchronized ? 'green' : 'red',
              borderRadius: 40,
            }}
          />
        )}>
        <List.Item
          title={`Created: ${new Date(data.scan_date).toLocaleDateString(
            'en-GB',
            dateOptions,
          )}`}
        />
        <List.Item
          title={`Synced: ${
            data?.synchronized_date
              ? new Date(data?.synchronized_date).toLocaleDateString(
                  'en-GB',
                  dateOptions,
                )
              : ' - '
          }`}
        />
        <View
          onTouchEnd={removeItemCallback}
          style={{position: 'absolute', right: 20, bottom: 10}}>
          <MaterialCommunityIcons size={30} name="delete" />
        </View>
      </List.Accordion>
    </List.Section>
  );
};

const CodesList = () => {
  const [qrCodes, setQrCodes] = useAtom(qrCodesAtom);

  const onRemoveItem = useCallback(
    (uuid: string) => {
      setQrCodes(prevQrCodes => {
        return prevQrCodes.map(item =>
          item.uuid === uuid ? {...item, is_removed: true} : item,
        );
      });
    },
    [setQrCodes],
  );

  const listItems = useMemo(() => {
    return qrCodes.filter(element => !element.is_removed);
  }, [qrCodes]);

  return (
    <View style={{marginTop: 20, paddingHorizontal: 5}}>
      <FlatList<QRCode>
        data={listItems}
        style={{rowGap: 30}}
        ListEmptyComponent={() => (
          <Text style={{textAlign: 'center'}}>List is empty</Text>
        )}
        ItemSeparatorComponent={() => (
          <View style={{height: 20, borderBottomWidth: 2, marginBottom: 20}} />
        )}
        renderItem={({item}: ListRenderItemInfo<QRCode>) => (
          <ListElement onRemoveItem={onRemoveItem} data={item} />
        )}
        keyExtractor={item => item.uuid}
      />
    </View>
  );
};

export default CodesList;
