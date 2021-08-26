import React, {useState} from 'react';
import {Alert, FlatList, Platform} from 'react-native';
import {BleManager, ScanMode} from 'react-native-ble-plx';
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';
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

  const addDeviceToList = device => {
    const deviceIndex = deviceList.findIndex(
      deviceIdControl => deviceIdControl.id === device.id,
    );

    if (deviceIndex === -1) {
      setDeviceList([...deviceList, device]);
    }
  };

  const deviceScanListener = useDebouncedCallback(
    (error, device) => {
      if (error) {
        Alert.alert('Hata: ' + JSON.stringify(error));

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

  const deviceScan = () => {
    try {
      const scanOptions = {scanMode: ScanMode.LowPower};
      manager.startDeviceScan(null, scanOptions, deviceScanListener);
    } catch (error) {
      Alert.alert('try catch hatası: ', error);
    }
  };

  const onLocationEnabledPressed = () => {
    if (Platform.OS === 'android') {
      RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({
        interval: 10000,
        fastInterval: 5000,
      })
        .then(data => {
          Alert.alert('Location and Bluetooth ' + data);
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
    setIsBluetoothScanning(false);
  };

  // cihaz bağlantısı
  async function connectToDevice(deviceId) {
    try {
      const connectedDevice = await manager.connectToDevice(deviceId);

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
