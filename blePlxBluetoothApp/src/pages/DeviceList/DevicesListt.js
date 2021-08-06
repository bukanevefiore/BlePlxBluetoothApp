import React, { useState } from 'react';
import { View, Text, SafeAreaView, FlatList } from 'react-native';

import SwitchButton from '../../components/SwitchButton';
import styles from './DevicesList.styles';
import DeviceListEmpty from '../../components/DeviceListEmpty';
import SubTitle from '../../components/SubTitle';
import DeviceListItemCard from '../../components/DeviceListItemCard';

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


    const deviceListEmpty = () => <DeviceListEmpty text="Cihaz Yok" />
    const deviceListItem = ({item}) => {
        return <DeviceListItemCard {...item} imageLeft={require('../../assets/ic_laptop.png')} imageRight={require('../../assets/ic_settings.png')}/>
    } 


    const enableBluetooth = () => {
        try {
            // bluetooth açma..
            setSwitchBoolValue(true);
        } catch (error) {
            console.log(error);
        }
    }


    const disableBluetooth = async () => {
        try {
            // bluetooth kapama..
            setSwitchBoolValue(false);
        } catch (error) {
            console.log(error);
        }
    }


    const switchBluetoothEnabled = value => {
        if (value) {
            console.log("tıklanadı");
            return enableBluetooth();
        }
        disableBluetooth();
    };


    return (
        <SafeAreaView style={styles.container}>
           <SwitchButton value={switchBoolValue} onValueChange={switchBluetoothEnabled} />
           <SubTitle title="Device List"/>
           <FlatList data={deviceList}
                ListEmptyComponent={deviceListEmpty}
                renderItem={deviceListItem} />
        </SafeAreaView>
    )
}

export default DevicesListPage;

  /*
  
           
       
        */