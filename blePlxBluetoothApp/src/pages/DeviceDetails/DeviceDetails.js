import React from 'react';
import {Text, View} from 'react-native';
import styles from './DeviceDetails.styles';
import {useSelector} from 'react-redux';
import {Buffer} from 'buffer';

export default function DeviceDetailPage() {
  const device = useSelector(d => d.selectedDevice);

  const getAll = async () => {
    try {
      await device.discoverAllServicesAndCharacteristics();
      const services = await device.services();
      const characteristic = await getServicesAndCharacteristics(services);
      console.log(characteristic);
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

  /*
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
  return (
    <View style={styles.container}>{device && <Text>{device.id}</Text>}</View>
  );
}
