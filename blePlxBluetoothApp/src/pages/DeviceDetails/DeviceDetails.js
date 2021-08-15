import React, {useState} from 'react';
import {Text, View} from 'react-native';
import styles from './DeviceDetails.styles';
import {useSelector} from 'react-redux';
import {Buffer} from 'buffer';

export default function DeviceDetailPage() {
  const device = useSelector(d => d.selectedDevice);
  const [characteristicList, setcharacteristicList] = useState([]);

  async function getCharacteristics() {
    await device.discoverAllServicesAndCharacteristics();
    const services = await device.services();
    services.forEach(async service => {
      const characteristics = await device.characteristicsForService(
        service.uuid,
      );
      characteristics.forEach(async characteristicsArray => {
        const heightBuffer = Buffer.alloc(2);
        heightBuffer.writeUInt16LE(characteristicsArray.value, 0);

        const characteristic =
          await device.writeCharacteristicWithResponseForService(
            characteristicsArray.serviceUUID,
            characteristicsArray.uuid,
            heightBuffer.toString('base64'),
          );
        console.log(characteristic);
      });
    });
  }

  getCharacteristics();

  return (
    <View style={styles.container}>{device && <Text>{device.id}</Text>}</View>
  );
}

//  serviceUUID: "00001800-0000-1000-8000-00805f9b34fb"
//  characteristicsuuid: "00002a00-0000-1000-8000-00805f9b34fb"

/*
  const getAll = async () => {
    try {
      await device.discoverAllServicesAndCharacteristics();
      const services = await device.services();
      await getServicesAndCharacteristics(services);
    } catch (error) {}
  };

  const getServicesAndCharacteristics = allServices => {
    return new Promise((resolve, reject) => {
      allServices.then(services => {
        const characteristics = [];

        services.forEach((service, i) => {
          service.characteristics().then(c => {
            characteristics.push(c);
            console.log(characteristics);

            if (i === services.length - 1) {
              const temp = characteristics.reduce((acc, current) => {
                return [...acc, ...current];
              }, []);
              const dialog = temp.find(
                characteristic => characteristic.isWritableWithoutResponse,
              );
              if (!dialog) {
                reject('No writable characteristic');
              }
              resolve(dialog);
            }
          });
        });
      });
    });
  };

  getAll();
  
 
  async function getServicesAndCharacteristics() {
    try {
      await device.discoverAllServicesAndCharacteristics();
      const services = await device.services();
      const characteristic = await services.characteristics();
      const heightBuffer = Buffer.alloc(2);
      heightBuffer.writeUInt16LE(characteristic.value, 0);

      const allCharacteristics =
        await device.writeCharacteristicWithResponseForService(
          services.uuid,
          characteristic.uuid,
          heightBuffer.toString('base64'),
        );

      console.log(allCharacteristics);
    } catch (error) {
      console.log(error);
    }
  }
  getServicesAndCharacteristics();
*/

/*

 async function getCharacteristics() {
    await device.discoverAllServicesAndCharacteristics();
    const services = await device.services();
    services.forEach(async service => {
      const characteristics = await device.characteristicsForService(
        service.uuid,
      );
      console.log(characteristics);
    });
  }

  getCharacteristics();

  */
