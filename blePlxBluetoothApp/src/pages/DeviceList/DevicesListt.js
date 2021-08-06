import React, { useState } from 'react';
import { View, Text, SafeAreaView, FlatList, Platform, Button } from 'react-native';
import { BleManager } from 'react-native-ble-plx';
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';
import { requestLocationPermission } from '../../utils/requestLocationPermission';

import SwitchButton from '../../components/SwitchButton';
import styles from './DevicesList.styles';
import DeviceListEmpty from '../../components/DeviceListEmpty';
import SubTitle from '../../components/SubTitle';
import DeviceListItemCard from '../../components/DeviceListItemCard';
import Layout from '../../components/Layout';
import { data } from 'browserslist';


const manager = new BleManager();

const DevicesListPage = () => {
/*
    const deviceList = [
        {
            name: 'Cris',
            key: '1'
        },
        {
            name: 'Lara',
            key: '2'
        },
    ]; 
*/
    const [switchBoolValue, setSwitchBoolValue] = useState(false);
    const [deviceList, setDeviceList] = useState([]);

    const deviceListEmpty = () => <DeviceListEmpty text="No Device" />
    const deviceListItem = ({item}) => {
        return <DeviceListItemCard {...item} imageLeft={require('../../assets/ic_laptop.png')} imageRight={require('../../assets/ic_settings.png')}/>
    } 


    // bluetooth aktif etme
    async function enabledBluetooth() {
        const bluetoothState = await manager.state();
        try {
            if(bluetoothState !== 'PoweredOn') {
                manager.enable;
                setSwitchBoolValue(true);
                onLocationEnabledPressed();
                
            }           
        } catch (error) {
            console.log(error);
        }
    }

    //cihazları tarama
    const deviceScan = () => {
        const permisson = requestLocationPermission();
        console.log("Permission: "+permisson);
        if(!permisson) {
            return console.log("izin yok");
        }
        try {
            manager.startDeviceScan(null,null, (error, device) => {
                console.log("içerde");
                if(error) {
                    console.log("Hata: " +error);
                    return;
                }
                if(!device) {
                    return console.log("cihazlar null");
                }
                if(device.name === 'TI BLE Sensor Tag' || device.name === 'Sensor Tag') {
                    manager.stopDeviceScan();
                }

                setDeviceList([...deviceList, device]);
                console.log("burda");
                console.log(device);
                

            })
        } catch (error) {
            console.log("try catch hatası: " +error);
        }
    }


    // bluetooth kapatma
    const disableBluetooth = async () => {
        const bluetoothState = await manager.state();
        try {
            if(bluetoothState === 'PoweredOn') {
                manager.disable;
                setDeviceList(false);
                
            }
            setSwitchBoolValue(false);
        } catch (error) {
            console.log(error);
        }
    }

    // konum hizmetini aktif etme
    const onLocationEnabledPressed = () => {
        if(Platform.OS === 'android' ) {
            RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({interval: 10000, fastInterval: 5000})
            .then(data => {
                alert(data);
                setSwitchBoolValue(true);
            }).catch(err => {
                alert("Error" +err.message + ", Code : " + err.code);
            });
        }
    }


    // switch butonu durumu güncelleme
    const switchBluetoothEnabled = value => {
        if (value) {
            console.log("tıklanadı");
            return enabledBluetooth();
        }
        disableBluetooth();
    };


    return (      
          <Layout title = "Device List">
               <SwitchButton value={switchBoolValue} onValueChange={switchBluetoothEnabled} />
           <SubTitle title="Device List"/>
           <FlatList data={deviceList}
                ListEmptyComponent={deviceListEmpty}
                renderItem={deviceListItem} />
                <Button title="tara" onPress={deviceScan} />
          </Layout>     
    )
}

export default DevicesListPage;

  /*
  
           
       
        */