import React from 'react';
import { PermissionsAndroid } from 'react-native';


export async function requestLocationPermission() {
    try {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION, {
                title: 'Bluetooth taraması için konum izni',
                message: 'wahtever',
                buttonNeutral: 'Ask Me Later',
                buttonNegative: 'Cancel',
                buttonPositive: 'OK',
            },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log('Bluetooth taraması için konum izni verildi');
            return true;
        }
        else {
            console.log('Bluetooth taraması için konum izni iptal edildi');
            return false;
        }
    } catch (error) {
        console.warn(error);
        return false;
    }
}