import React, {useState} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  SectionList,
  ActivityIndicator,
} from 'react-native';
import styles from './DeviceDetails.styles';
import {useSelector} from 'react-redux';
import {Buffer} from 'buffer';
import colors from '../../styles/colors';

export default function DeviceDetailPage() {
  const abcList = [
    [
      {
        _manager: [Object],
        deviceID: 'EF:D2:7B:5E:7E:74',
        id: 2,
        isIndicatable: false,
        isNotifiable: false,
        isNotifying: false,
        isReadable: true,
        isWritableWithResponse: true,
        isWritableWithoutResponse: false,
        serviceID: 1,
        serviceUUID: '00001800-0000-1000-8000-00805f9b34fb',
        uuid: '00002a00-0000-1000-8000-00805f9b34fb',
        value: null,
      },
      {
        _manager: [Object],
        deviceID: 'EF:D2:7B:5E:7E:74',
        id: 3,
        isIndicatable: false,
        isNotifiable: false,
        isNotifying: false,
        isReadable: true,
        isWritableWithResponse: false,
        isWritableWithoutResponse: false,
        serviceID: 1,
        serviceUUID: '00001800-0000-1000-8000-00805f9b34fb',
        uuid: '00002a01-0000-1000-8000-00805f9b34fb',
        value: null,
      },
      {
        _manager: [Object],
        deviceID: 'EF:D2:7B:5E:7E:74',
        id: 4,
        isIndicatable: false,
        isNotifiable: false,
        isNotifying: false,
        isReadable: true,
        isWritableWithResponse: false,
        isWritableWithoutResponse: false,
        serviceID: 1,
        serviceUUID: '00001800-0000-1000-8000-00805f9b34fb',
        uuid: '00002a04-0000-1000-8000-00805f9b34fb',
        value: null,
      },
      {
        _manager: [Object],
        deviceID: 'EF:D2:7B:5E:7E:74',
        id: 5,
        isIndicatable: false,
        isNotifiable: false,
        isNotifying: false,
        isReadable: true,
        isWritableWithResponse: false,
        isWritableWithoutResponse: false,
        serviceID: 1,
        serviceUUID: '00001800-0000-1000-8000-00805f9b34fb',
        uuid: '00002aa6-0000-1000-8000-00805f9b34fb',
        value: null,
      },
    ],
  ];

  const device = useSelector(d => d.selectedDevice);
  const [characteristicList, setcharacteristicList] = useState([]);

  const CharacteristicItem = ({title}) => (
    <View style={styles.item}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );

  const SectionHeaderService = ({section}) => (
    <Text style={styles.header}>{section.title}</Text>
  );

  async function getServicesAndCharacteristics() {
    try {
      await device.discoverAllServicesAndCharacteristics();
      const services = await device.services();
      //console.log(services);
      const chr = await device.characteristicsForService(services[0].uuid);
      characteristicList.push(chr);
      const chr2 = await device.characteristicsForService(services[1].uuid);
      characteristicList.push(chr2);

      console.log(characteristicList);
    } catch (error) {
      console.log('Catch :' + error);
    }
  }

  const MyComponent = () => (
    <ActivityIndicator animating={true} color={colors.koyugri} />
  );

  getServicesAndCharacteristics();

  <ActivityIndicator animating={false} color={colors.koyugri} />;

  const DATA = [
    {
      title: abcList[Object.keys(abcList)[0]].serviceUUID,
      data: [
        abcList[Object.keys(abcList)[0]].uuid,
        abcList[Object.keys(abcList)[1]].uuid,
        abcList[Object.keys(abcList)[2]].uuid,
        abcList[Object.keys(abcList)[3]].uuid,
      ],
    },
  ];

  /*
    services.forEach(async service => {
      await getCharacteristics(service.uuid)
      });

      async getCharacteristics(serviceUuid) {
        const characteristics = await device.characteristicsForService(
          serviceUuid,
        );
        setcharacteristicList(...characteristicList,characteristics);
      }


  const servicesAndCharacteristics = ({characteristicList}) => {
    const sections = characteristicList.map(serviceAndCharacteristic => ({
      title: serviceAndCharacteristic.serviceUUID,
      data: serviceAndCharacteristic.uuid,
    }));
  };

    
*/

  return (
    <SafeAreaView style={styles.container}>
      <SectionList
        sections={DATA}
        ListEmptyComponent={MyComponent}
        keyExtractor={(item, index) => item + index}
        renderItem={({item}) => <CharacteristicItem title={item} />}
        renderSectionHeader={SectionHeaderService}
      />
    </SafeAreaView>
  );
}

/*          services.forEach(async service => {
        const characteristics = await device.characteristicsForService(
          service.uuid,
        );

        characteristics.forEach(async characteristicsArray => {
          const heightBuffer = Buffer.alloc(2);
          heightBuffer.writeUInt16LE(characteristicsArray.value, 0);

          const characteristic =
            await device.writeCharacteristicWithResponseForService(
              service.uuid,
              characteristicsArray.uuid,
              heightBuffer.toString('base64'),
            );

          //setcharacteristicList([...characteristicList, characteristic]);
          console.log(characteristic);
        });
      });
       characteristicList.forEach(d => {
        console.log(d);
      });  */
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
