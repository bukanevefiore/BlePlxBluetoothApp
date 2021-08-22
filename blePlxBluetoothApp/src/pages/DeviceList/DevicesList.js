import React, {useState} from 'react';
import {Alert, FlatList, Platform} from 'react-native';
import {BleManager, ScanMode} from 'react-native-ble-plx';
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';
import {requestLocationPermission} from '../../utils/requestLocationPermission';
import {useDebouncedCallback} from 'use-debounce';
import {useDispatch} from 'react-redux';

import SwitchButton from '../../components/SwitchButton';
import DeviceListEmpty from '../../components/DeviceListEmpty';
import SubTitle from '../../components/SubTitle';
import DeviceListItemCard from '../../components/DeviceListItemCard';
import Layout from '../../components/Layout';
import Separator from '../../components/Separator';

const manager = new BleManager();

const DevicesListPage = ({navigation}) => {
  const [isBluetoothScanning, setIsBluetoothScanning] = useState(false);
  const [deviceList, setDeviceList] = useState([]);
  const dispatch = useDispatch();

  const handledeviceListEmpty = () => <DeviceListEmpty text="No Device" />;
  const handledeviceListItem = ({item}) => {
    return (
      <DeviceListItemCard
        device={item}
        onPress={() => connectToDevice(item.id)}
        imageLeft={require('../../assets/image_left.png')}
        imageRight={require('../../assets/image_right.png')}
      />
    );
  };

  // tarama sonucu bulunan cihazlardan, listede olmayan cihazları ekleme
  const addDeviceToList = device => {
    const deviceIndex = deviceList.findIndex(
      deviceIdControl => deviceIdControl.id === device.id,
    );

    if (deviceIndex === -1) {
      setDeviceList([...deviceList, device]);
    }
  };

  // taramanın belli aralıklarla yapılması için use debounce kütüphanesi kullanımı
  const deviceScanListener = useDebouncedCallback(
    (error, device) => {
      if (error) {
        Alert.alert('Hata: ' + JSON.stringify(error));
        console.log(JSON.stringify(error));
        return;
      }

      if (!device) {
        return Alert.alert('cihazlar null');
      }

      addDeviceToList(device);
    },
    200,
    {
      maxWait: 1000,
    },
  );

  //cihazları tarama
  const deviceScan = () => {
    try {
      const permisson = requestLocationPermission();
      if (!permisson) {
        Alert.alert('Konum izni yok!!');
      }

      const scanOptions = {scanMode: ScanMode.LowPower};
      manager.startDeviceScan(null, scanOptions, deviceScanListener);
    } catch (error) {
      Alert.alert('try catch hatası: ', error);
    }
  };

  // konum hizmetini aktif etme
  const onLocationEnabledPressed = () => {
    if (Platform.OS === 'android') {
      RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({
        interval: 10000,
        fastInterval: 5000,
      })
        .then(data => {
          Alert.alert('Location and Bluetooth activated...');
          setIsBluetoothScanning(true);
          setTimeout(() => {
            deviceScan();
          }, 5000);
        })
        .catch(err => {
          Alert.alert('Error' + err.message + ', Code : ' + err.code);
        });
    }
  };

  const handleToggleBluetooth = async value => {
    const bluetoothState = await manager.state();
    if (value) {
      if (bluetoothState !== 'PoweredOn') {
        manager.enable();
        onLocationEnabledPressed();
      }
    }
    manager.disable();
    setDeviceList([]);
    manager.stopDeviceScan();
    setDeviceList([]);
    setIsBluetoothScanning(false);
  };

  // cihaz bağlantısı
  async function connectToDevice(deviceId) {
    try {
      const connectedDevice = await manager.connectToDevice(deviceId);
      console.log(connectedDevice.id);

      dispatch({
        type: 'SET_DEVICE',
        payload: {
          device: connectedDevice,
        },
      });

      navigation.navigate('DeviceDetail');
    } catch (error) {
      Alert.alert('Ble Plx / Catch', 'Bağlantı başarısız: ' + error);
    }
  }

  return (
    <Layout title="Bluetooth Low Energy">
      <SwitchButton
        value={isBluetoothScanning}
        onValueChange={handleToggleBluetooth}
      />
      <SubTitle title="Device List" />
      <FlatList
        keyExtractor={(item, index) => item.id}
        data={deviceList}
        ListEmptyComponent={handledeviceListEmpty}
        renderItem={handledeviceListItem}
        ItemSeparatorComponent={Separator}
      />
    </Layout>
  );
};

export default DevicesListPage;

//  [BleError: Device 7D:F1:01:A5:6A:B4 was disconnected]

/*
  {''}
try catch hatası: Error: Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:
1. You might have mismatching versions of React and the renderer (such as React DOM)
2. You might be breaking the Rules of Hooks
3. You might have more than one copy of React in the same app
See https://reactjs.org/link/invalid-hook-call for tips about how to debug and fix this problem.

*/

/*



BleError: Cannot start scanning operation

Hata: {"message":"Cannot start scanning operation","errorCode":600,
"attErrorCode":null,"iosErrorCode":null,"androidErrorCode":null,
"reason":"Scan failed because application registration failed (code 6)",
"name":"BleError","line":6623,"column":28,
"sourceURL":"http://localhost:8081/index.bundle?platform=android&dev=true&minify=false&app=com.bleplxbluetoothapp&modulesOnly=false&runModule=true"}
*/

/*
<Button title="tara" onPress={deviceScan} />
manager.startDeviceScan([serviceId], {allowDuplicates: false}, async (error, device) => {});
      */
