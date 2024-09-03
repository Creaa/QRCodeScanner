import React, {useCallback, useEffect, useState} from 'react';
import PageLayout from './src/components/PageLayout';
import QRCodeScanner from './src/components/QRCodeScanner';
import createTable from './src/db/createTable';
import addCode from './src/db/addCode';
import CodesList from './src/components/List';
import {useAtom} from 'jotai';
import {qrCodesAtom} from './src/atoms/qrCodesAtom';
import useQRCodeData from './src/db/getCodes';
import NetInfo, {NetInfoState} from '@react-native-community/netinfo';
import synchronizeCodes from './src/gateway/synchronizeCodes';
import removeCodes from './src/gateway/removeCodes';

function App(): React.JSX.Element {
  const [isDBProcessinng, setIsDBProcessing] = useState<boolean>(false);
  const [isConnected, setIsConnected] = useState<boolean>(false);

  const [mode, setMode] = useState('scanner');
  const {data, refetch} = useQRCodeData();

  const [qrCodes, setQrCodes] = useAtom(qrCodesAtom);

  useEffect(() => {
    if (data) {
      setQrCodes(data);
    }
  }, [data, setQrCodes]);

  const onNewCodeHandler = useCallback((code: string) => {
    setIsDBProcessing(prevIsDBProcessing => {
      if (!prevIsDBProcessing) {
        addCode(code).finally(() => {
          setMode('list');
          setIsDBProcessing(false);
          refetch();
        });
        return true;
      } else {
        return prevIsDBProcessing;
      }
    });
  }, []);

  useEffect(() => {
    const setupDatabase = async () => {
      try {
        await createTable();
        console.log('Database table created or already exists.');
      } catch (error) {
        console.error('Error setting up database:', error);
      }
    };

    setupDatabase();

    const handleConnectivityChange = (state: NetInfoState) => {
      setIsConnected(state.isInternetReachable ?? false);
    };

    const unsubscribe = NetInfo.addEventListener(handleConnectivityChange);

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (isConnected) {
      const itemsToRemove = qrCodes
        .filter(element => element.is_removed)
        .map(element => element.uuid);

      const itemsToSynchronize = qrCodes
        .filter(element => !element.is_synchronized && !element.is_removed)
        .map(element => element.uuid);

      const removeData = async () => {
        if (itemsToRemove.length) {
          await removeCodes(itemsToRemove).then(() => refetch());
        }
      };

      const syncData = async () => {
        if (itemsToSynchronize.length) {
          await synchronizeCodes(itemsToSynchronize).then(() => refetch());
        }
      };

      removeData();
      syncData();
    }
  }, [qrCodes, isConnected, refetch]);

  return (
    <PageLayout mode={mode} setMode={setMode}>
      {mode === 'scanner' ? (
        <QRCodeScanner onAddedCode={onNewCodeHandler} />
      ) : (
        <CodesList />
      )}
    </PageLayout>
  );
}

export default App;
