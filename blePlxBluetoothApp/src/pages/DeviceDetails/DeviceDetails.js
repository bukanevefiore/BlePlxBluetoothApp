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
import parseContentData from '../../utils/parseContentData';

export default function DeviceDetailPage() {
  const abcList = [
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
      // const chr = await device.characteristicsForService(services[0].uuid);
      //characteristicList.push(chr);
      getServices(services);
      console.log(characteristicList);

      //setcharacteristicList(...characteristicList, chr);    // BU ŞEKİLDE LİSTEYE ATMIYOR

      console.log(characteristicList);
    } catch (error) {
      console.log('Catch :' + error);
    }
  }

  getServicesAndCharacteristics();

  <ActivityIndicator animating={false} color={colors.koyugri} />;

  // sectionList için veriyi formatlama
  const DATA = [
    {
      title: characteristicList[Object.keys(characteristicList)[0]].serviceUUID,
      data: [
        characteristicList[Object.keys(characteristicList)[0]].uuid,
        characteristicList[Object.keys(characteristicList)[1]].uuid,
        characteristicList[Object.keys(characteristicList)[2]].uuid,
        characteristicList[Object.keys(characteristicList)[3]].uuid,
      ],
    },
  ];

  function delay() {
    return new Promise(resolve => setTimeout(resolve, 1000));
  }

  async function getServices(services) {
    try {
      await Promise.all(
        services.forEach(async service => {
          await delay();
          const characteristics = await device.characteristicsForService(
            service.uuid,
          );

          setcharacteristicList(characteristics);
        }),
      );
    } catch (error) {
      console.log('Hata1:' + error);
    }

    /*services.forEach(function (item, i) {
      asynchronousProcess(function (item) {
        console.log(i);
      });
    });  */
  }

  async function getCharacteristics(serviceUuid) {
    try {
      await delay();
      const characteristics = await device.characteristicsForService(
        serviceUuid,
      );

      //const parsedData = parseContentData(characteristics[0] || {});
      //setcharacteristicList(parsedData);

      setcharacteristicList(characteristics);
    } catch (error) {
      console.log('hata2:' + error);
    }
  }

  const servicesAndCharacteristicsSection = ({characteristicList}) => {
    const sections = characteristicList.map(serviceAndCharacteristic => ({
      title: serviceAndCharacteristic.serviceUUID,
      data: serviceAndCharacteristic.uuid,
    }));
  };

  const MyComponent = () => (
    <ActivityIndicator animating={true} color={colors.koyugri} />
  );

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

/*
const a = [
  {
    _manager: {
      _activePromises: [Object],
      _activeSubscriptions: [Object],
      _errorCodesToMessagesMapping: [Object],
      _eventEmitter: [NativeEventEmitter],
      _scanEventSubscription: [EmitterSubscription],
      _uniqueId: 20,
    },
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
    _manager: {
      _activePromises: [Object],
      _activeSubscriptions: [Object],
      _errorCodesToMessagesMapping: [Object],
      _eventEmitter: [NativeEventEmitter],
      _scanEventSubscription: [EmitterSubscription],
      _uniqueId: 20,
    },
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
    _manager: {
      _activePromises: [Object],
      _activeSubscriptions: [Object],
      _errorCodesToMessagesMapping: [Object],
      _eventEmitter: [NativeEventEmitter],
      _scanEventSubscription: [EmitterSubscription],
      _uniqueId: 20,
    },
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
    _manager: {
      _activePromises: [Object],
      _activeSubscriptions: [Object],
      _errorCodesToMessagesMapping: [Object],
      _eventEmitter: [NativeEventEmitter],
      _scanEventSubscription: [EmitterSubscription],
      _uniqueId: 20,
    },
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
];

*/
