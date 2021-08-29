import React, {useState} from 'react';
import {Alert, FlatList, Platform} from 'react-native';
import {BleManager, ScanMode} from 'react-native-ble-plx';
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';
import {useDebouncedCallback} from 'use-debounce';
import {useDispatch} from 'react-redux';
import {showMessage} from 'react-native-flash-message';

import SwitchButton from '../../components/SwitchButton';
import DeviceListEmpty from '../../components/DeviceListEmpty';
import SubTitle from '../../components/SubTitle';
import DeviceListItemCard from '../../components/DeviceListItemCard';
import Layout from '../../components/Layout';
import Separator from '../../components/Separator';
import ErrorMessageParser from '../../../utils/ErrorMessageParser';

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
        Alert.alert(error);

        return;
      }

      if (!device) {
        return Alert.alert('Device null');
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
      Alert.alert(error.message);
    }
  };

  const onLocationEnabledPressed = () => {
    if (Platform.OS === 'android') {
      RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({
        interval: 10000,
        fastInterval: 5000,
      })
        .then(data => {
          Alert.alert('Location and Bluetooth ' + data + '!!');

          setIsBluetoothScanning(true);
          setTimeout(() => {
            deviceScan();
          }, 5000);
        })
        .catch(error => {
          showMessage({
            message: ErrorMessageParser(JSON.stringify(error.code)),
            type: 'warn',
          });
        });
    }
  };

  const handleToggleBluetooth = async value => {
    console.log(value);
    const bluetoothState = await manager.state();
    if (value) {
      if (bluetoothState !== 'PoweredOn') {
        manager.enable();
        onLocationEnabledPressed();
      }
      onLocationEnabledPressed();
    }
    manager.stopDeviceScan();
    manager.disable();
    setIsBluetoothScanning(false);
    setDeviceList([]);
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
      showMessage({
        message: 'Device connection successful',
        type: 'success',
      });
    } catch (error) {
      showMessage({
        message: ErrorMessageParser(JSON.stringify(error.errorCode)),
        type: 'warn',
      });
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
