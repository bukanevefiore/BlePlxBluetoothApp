import React, { useState } from 'react';
import { View, Text, SafeAreaView, FlatList, Switch } from 'react-native';

import SwitchButton from '../../components/SwitchButton';
import styles from './DevicesList.styles';
import DeviceListEmpty from '../../components/DeviceListEmpty';

const DevicesListPage = () => {
    const [switchBoolValue, setSwitchBoolValue] = useState(false);


    const deviceListEmpty = () => <DeviceListEmpty text="Cihaz Yok" />



    const enableBluetooth = () => {
        try {
            // bluetooth açma..
            setSwitchBoolValue(true);
        } catch (error) {

        }
    }


    const disableBluetooth = async () => {
        try {
            // bluetooth kapama..
            setSwitchBoolValue(false);
        } catch (error) {

        }
    }


    const switchBluetoothEnabled = value => {
        if (value) {
            return enableBluetooth();
        }
        disableBluetooth();
    }


    return (
        <SafeAreaView style={styles.container}>
           <Switch value={switchBoolValue} onValueChange={switchBluetoothEnabled} />
        </SafeAreaView>
    )
}

export default DevicesListPage;

  /*
  
            <FlatList data={ }
                ListEmptyComponent={deviceListEmpty}
                renderItem={deviceItem} />
       
        */