import React, {FC, useCallback, useEffect, useMemo, useState} from 'react';
import {View} from 'react-native';
import {Snackbar, Text} from 'react-native-paper';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
  useCodeScanner,
} from 'react-native-vision-camera';

interface IRequestPermissionProps {
  requestPermission: () => void;
}

const RequestPermission: FC<IRequestPermissionProps> = ({
  requestPermission,
}) => {
  return (
    <View
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
      }}>
      <Text>App needs camera permission to scan QR Code</Text>
      <Text style={{alignItems: 'center'}}>
        Tap{' '}
        <Text onPress={() => requestPermission()} style={{color: 'purple'}}>
          here{' '}
        </Text>
        to give permission or go to settings.
      </Text>
    </View>
  );
};

const useValidateQRCode = (value: string) => {
  const regex = /^KELLTON000([a-zA-Z0-9]+)000$/;
  const match = value.match(regex);

  if (match) {
    return {isCorrect: true, value: match[1]};
  } else {
    return {isCorrect: false, value: undefined};
  }
};

interface IProps {
  onAddedCode: (code: string) => void;
}

const QRCodeScanner: FC<IProps> = ({onAddedCode}) => {
  const {hasPermission, requestPermission} = useCameraPermission();
  const [incorrectCodes, setIncorrectCodes] = useState<string[]>([]);
  const [isCameraActive, setIsCameraActive] = useState(true);

  const camera = useCameraDevice('back');

  const clearCode = useCallback((value: string) => {
    setTimeout(() => {
      setIncorrectCodes(currentCodes =>
        currentCodes.filter(code => code !== value),
      );
    }, 5000);
  }, []);

  const setCameraToActive = useCallback(() => {
    setTimeout(() => {
      setIsCameraActive(true);
    }, 1000);
  }, []);

  const onCodeScan = useCallback(
    (code: string) => {
      if (incorrectCodes.includes(code)) {
        setCameraToActive();
        return null;
      }

      const {isCorrect, value} = useValidateQRCode(code);

      if (!isCorrect) {
        setIncorrectCodes(prevCodes => [...prevCodes, code]);
        clearCode(code);
        setCameraToActive();
      } else {
        return value && onAddedCode(value);
      }
    },
    [incorrectCodes, clearCode],
  );

  const codeScanner = useCodeScanner({
    codeTypes: ['qr', 'ean-13'],
    onCodeScanned: codes => {
      setIsCameraActive(false);
      if (codes[0]?.value) {
        onCodeScan(codes[0]?.value);
      }
    },
  });

  if (!hasPermission) {
    return <RequestPermission requestPermission={requestPermission} />;
  }

  //   refreshing time - frames per second
  // user should be able to close snackbar - then should be able to add code again
  // implement decent ui

  const snackbars = useMemo(() => {
    return incorrectCodes.map(code => (
      <Snackbar
        key={code}
        style={{marginBottom: 30}}
        visible={true}
        action={{
          label: 'Undo',
          onPress: () => {
            setIncorrectCodes(incorrectCodes =>
              incorrectCodes.filter(arrCode => arrCode !== code),
            );
            setCameraToActive();
          },
        }}
        onDismiss={() => null}>
        <Text style={{color: '#fff'}}>
          Code {code} is incorrect. You should use format KELLTON000code000
        </Text>
      </Snackbar>
    ));
  }, [incorrectCodes]);

  return (
    <View style={{width: '100%', height: '100%', position: 'relative'}}>
      <SafeAreaProvider>
        {hasPermission && camera ? (
          <Camera
            codeScanner={codeScanner}
            style={{width: '100%', height: '100%', position: 'static'}}
            device={camera}
            isActive={isCameraActive}
          />
        ) : null}
        {snackbars}
      </SafeAreaProvider>
    </View>
  );
};

export default QRCodeScanner;
