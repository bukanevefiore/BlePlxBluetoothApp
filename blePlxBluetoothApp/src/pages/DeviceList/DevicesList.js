import React, {useState} from 'react';
import {Alert, FlatList, Platform} from 'react-native';
import {BleManager} from 'react-native-ble-plx';
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';
import {requestLocationPermission} from '../../utils/requestLocationPermission';
import {useDebouncedCallback} from 'use-debounce';

import SwitchButton from '../../components/SwitchButton';
import DeviceListEmpty from '../../components/DeviceListEmpty';
import SubTitle from '../../components/SubTitle';
import DeviceListItemCard from '../../components/DeviceListItemCard';
import Layout from '../../components/Layout';

const manager = new BleManager();

const DevicesListPage = () => {
  const [switchBoolValue, setSwitchBoolValue] = useState(false);
  const [deviceList, setDeviceList] = useState([]);
  const [deviceId, setDeviceId] = useState([]);

  const deviceListEmpty = () => <DeviceListEmpty text="No Device" />;
  const deviceListItem = ({item}) => {
    return (
      <DeviceListItemCard
        {...item}
        imageLeft={require('../../assets/image_left.png')}
        imageRight={require('../../assets/ic_settings.png')}
      />
    );
  };

  // bluetooth aktif etme
  async function enabledBluetooth() {
    const bluetoothState = await manager.state();
    try {
      if (bluetoothState !== 'PoweredOn') {
        manager.enable;
        onLocationEnabledPressed();
      }
    } catch (error) {
      console.log(error);
    }
  }

  // startDeviceScan sonrası yapılacak işlem
  const handleDeviceScan = (error, device) => {
    console.log('içerde');

    if (error) {
      console.log('Hata: ' + JSON.stringify(error));
      return;
    }
    if (!device) {
      return console.log('cihazlar null');
    }

    addDeviceToList(device);

    console.log('burda');
  };

  // tarama sonucu bulunan cihazlardan, listede olmayan cihazları ekleme
  const addDeviceToList = device => {
    if (!deviceId.includes(device.id)) {
      setDeviceList([...deviceList, device]);
      setDeviceId([...deviceId, device.id]);
      console.log(device.id);
    }
  };

  // taramanın belli aralıklarla yapılması için use debounce kütüphanesi kullanımı
  const deviceScanListener = useDebouncedCallback(
    (error, device) => {
      handleDeviceScan(error, device);
    },
    200,
    {
      maxWait: 2000,
    },
  );

  //cihazları tarama
  const deviceScan = () => {
    try {
      const permisson = requestLocationPermission();
      console.log('Permission: ' + permisson);
      if (!permisson) {
      }

      manager.startDeviceScan(null, null, deviceScanListener);
    } catch (error) {
      console.log('try catch hatası: ' + error);
    }
  };

  // bluetooth kapatma
  const disableBluetooth = async () => {
    try {
      const bluetoothState = await manager.state();
      console.log('state: ' + bluetoothState);

      if (bluetoothState === 'PoweredOn') {
        manager.disable;
        //setDeviceValue(false);
        setDeviceList([]);
        manager.stopDeviceScan();
      }
      setSwitchBoolValue(false);
    } catch (error) {
      console.log(error);
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
          Alert.alert(data);
          setSwitchBoolValue(true);
          setTimeout(() => {
            deviceScan();
          }, 3000);
        })
        .catch(err => {
          Alert.alert('Error' + err.message + ', Code : ' + err.code);
        });
    }
  };

  // switch butonu durumu güncelleme
  const handleToggleBluetooth = value => {
    if (value) {
      console.log('tıklanadı');
      return enabledBluetooth();
    }
    disableBluetooth();
  };

  return (
    <Layout title="Device List">
      <SwitchButton
        value={switchBoolValue}
        onValueChange={handleToggleBluetooth}
      />
      <SubTitle title="Device List" />
      <FlatList
        keyExtractor={(item, index) => item.id}
        data={deviceList}
        ListEmptyComponent={deviceListEmpty}
        renderItem={deviceListItem}
      />
    </Layout>
  );
};

export default DevicesListPage;

/*

//   kendi kendine bundan eklemiş hata verdi {''}

*/

/*

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
