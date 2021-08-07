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
    const [deviceValue, setDeviceValue] = useState();


    const deviceListEmpty = () => <DeviceListEmpty text="No Device" />
    const deviceListItem = ({ item }) => {
        return <DeviceListItemCard {...item} imageLeft={require('../../assets/ic_laptop.png')} imageRight={require('../../assets/ic_settings.png')} />
    }


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

    //cihazları tarama
    const deviceScan = () => {
        const permisson = requestLocationPermission();
        console.log("Permission: " + permisson);
        if (!permisson) {
            return console.log("izin yok");
        }
        try {
            manager.startDeviceScan(null, null, (error, device) => {
                console.log("içerde");
                if (error) {
                    console.log("Hata: " + error);
                    return;
                }
                if (!device) {
                    return console.log("cihazlar null");
                }



                setTimeout(() => {
                    setDeviceList([...deviceList, device]);
                    //setDeviceList(device.name);
                    //setDeviceList([...deviceList, device]);
                    // manager.stopDeviceScan();
                    // Add your logic for the transition
                }, 20000);

                console.log("burda");
                console.log(device);

            })
        } catch (error) {
            console.log("try catch hatası: " + error);
        }
    }


    // bluetooth kapatma
    const disableBluetooth = async () => {
        const bluetoothState = await manager.state();
        console.log("state: " + bluetoothState);
        try {
            if (bluetoothState === 'PoweredOn') {
                manager.disable;
                setDeviceList(false);
                //manager.stopDeviceScan();
            }
            setSwitchBoolValue(false);
        } catch (error) {
            console.log(error);
        }
    }

    // konum hizmetini aktif etme
    const onLocationEnabledPressed = () => {
        if (Platform.OS === 'android') {
            RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({ interval: 10000, fastInterval: 5000 })
                .then(data => {
                    alert(data);
                    setSwitchBoolValue(true);
                    setTimeout(() => {
                       deviceScan();
                    }, 2000);
                }).catch(err => {
                    alert("Error" + err.message + ", Code : " + err.code);
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
        <Layout title="Device List">
            <SwitchButton value={switchBoolValue} onValueChange={switchBluetoothEnabled} />
            <SubTitle title="Device List" />
            <FlatList
                keyExtractor={(item, index) => item.id}
                data={deviceList}
                ListEmptyComponent={deviceListEmpty}
                renderItem={deviceListItem} />
            
        </Layout>
    )
}

export default DevicesListPage;



//  BleError: Cannot start scanning operation

/*
<Button title="tara" onPress={deviceScan} />
   

manager.startDeviceScan([serviceId], {allowDuplicates: false}, async (error, device) => {});

      */


/*

const data = {
    "_manager": {
        "_activePromises": {

        },
        "_activeSubscriptions": {

        },
        "_errorCodesToMessagesMapping": {
            "0": "Unknown error occurred. This is probably a bug! Check reason property.",
            "1": "BleManager was destroyed",
            "100": "BluetoothLE is unsupported on this device",
            "101": "Device is not authorized to use BluetoothLE",
            "102": "BluetoothLE is powered off",
            "103": "BluetoothLE is in unknown state",
            "104": "BluetoothLE is resetting",
            "105": "Bluetooth state change failed",
            "2": "Operation was cancelled",
            "200": "Device {deviceID} connection failed",
            "201": "Device {deviceID} was disconnected",
            "202": "RSSI read failed for device {deviceID}",
            "203": "Device {deviceID} is already connected",
            "204": "Device {deviceID} not found",
            "205": "Device {deviceID} is not connected",
            "206": "Device {deviceID} could not change MTU size",
            "3": "Operation timed out",
            "300": "Services discovery failed for device {deviceID}",
            "301": "Included services discovery failed for device {deviceID} and service: {serviceUUID}",
            "302": "Service {serviceUUID} for device {deviceID} not found",
            "303": "Services not discovered for device {deviceID}",
            "4": "Operation was rejected",
            "400": "Characteristic discovery failed for device {deviceID} and service {serviceUUID}",
            "401": "Characteristic {characteristicUUID} write failed for device {deviceID} and service {serviceUUID}",
            "402": "Characteristic {characteristicUUID} read failed for device {deviceID} and service {serviceUUID}",
            "403": "Characteristic {characteristicUUID} notify change failed for device {deviceID} and service {serviceUUID}",
            "404": "Characteristic {characteristicUUID} not found",
            "405": "Characteristics not discovered for device {deviceID} and service {serviceUUID}",
            "406": "Cannot write to characteristic {characteristicUUID} with invalid data format: {internalMessage}",
            "5": "Invalid UUIDs or IDs were passed: {internalMessage}",
            "500": "Descriptor {descriptorUUID} discovery failed for device {deviceID}, service {serviceUUID} and characteristic {characteristicUUID}",
            "501": "Descriptor {descriptorUUID} write failed for device {deviceID}, service {serviceUUID} and characteristic {characteristicUUID}",
            "502": "Descriptor {descriptorUUID} read failed for device {deviceID}, service {serviceUUID} and characteristic {characteristicUUID}",
            "503": "Descriptor {descriptorUUID} not found",
            "504": "Descriptors not discovered for device {deviceID}, service {serviceUUID} and characteristic {characteristicUUID}",
            "505": "Cannot write to descriptor {descriptorUUID} with invalid data format: {internalMessage}",
            "506": "Cannot write to descriptor {descriptorUUID}. It's not allowed by iOS and therefore forbidden on Android as well.",
            "600": "Cannot start scanning operation",
            "601": "Location services are disabled"
        },
        "_eventEmitter": {
            "_disableCallsIntoModule": false,
            "_subscriber": [
                "EventSubscriptionVendor"
            ]
        },
        "_scanEventSubscription": {
            "context": "undefined",
            "emitter": [
                "NativeEventEmitter"
            ],
            "eventType": "ScanEvent",
            "key": 0,
            "listener": [
                "Function scanListener"
            ],
            "subscriber": [
                "EventSubscriptionVendor"
            ]
        },
        "_uniqueId": 1
    },
    "id": "57:5F:D2:39:A8:EC",
    "isConnectable": null,
    "localName": null,
    "manufacturerData": "BgABCSACZq/ptpyEJ9BaRHkXN3QXtWaXx9I+FIo=",
    "mtu": 23,
    "name": null,
    "overflowServiceUUIDs": null,
    "rssi": -42,
    "serviceData": null,
    "serviceUUIDs": null,
    "solicitedServiceUUIDs": null,
    "txPowerLevel": null
}

*/
