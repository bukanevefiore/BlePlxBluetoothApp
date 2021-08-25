import React, {useState, useEffect} from 'react';
import {Alert, SafeAreaView, SectionList} from 'react-native';
import {useSelector} from 'react-redux';
import {useDebouncedCallback} from 'use-debounce';
import {Buffer} from 'buffer';

import styles from './DeviceDetails.styles';
import SectionListHeaderCard from '../../components/DeviceDetail/SectionListHeaderCard';
import SectionListItemCard from '../../components/DeviceDetail/SectionListItemCard/SectionListItemCard';
import Loading from '../../components/Loading/Loading';
import CharateristicUpdateModal from '../../components/DeviceDetail/CharacteristicUpdateModal';

export default function DeviceDetailPage() {
  const device = useSelector(d => d.selectedDevice);

  const [serviceAndCharDataResult, setServiceAndCharDataResult] = useState([]);
  const [inputModalVisible, setInputModalVisible] = useState(false);
  const [selectedCharacteristicUuid, setSelectedCharacteristicUuid] =
    useState('');
  const [selectedServiceUuid, setSelectedServiceUuid] = useState('');
  const [sendButonState, setSendButonState] = useState(false);

  const renderSectionCharacteristicItem = ({item, section}) => (
    <SectionListItemCard
      uuid={item.uuid.slice(4, 8)}
      onPress={() => handleInputToggle(item.uuid, section.title)}
      iconSelected={() => characteristicValueRead(item.uuid, section.title)}
    />
  );

  const renderSectionHeader = ({section}) => (
    <SectionListHeaderCard title={section.title.slice(4, 8)} />
  );

  async function getServicesAndCharacteristics() {
    try {
      await device.discoverAllServicesAndCharacteristics();
      const services = await device.services();

      await getServices(services);
    } catch (error) {
      Alert.alert('Catch :' + error);
    }
  }

  const addCharAndServiceList = useDebouncedCallback(
    resolvedService => {
      setServiceAndCharDataResult([
        ...serviceAndCharDataResult,
        resolvedService,
      ]);
    },
    100,
    {
      maxWait: 1000,
    },
  );

  useEffect(() => {
    getServicesAndCharacteristics();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function getServices(services) {
    try {
      for (let index = 0; index < services.length; index++) {
        const service = services[index];
        const characteristic = await getCharacteristics(service.uuid);

        const resolvedService = {
          title: service.uuid,
          data: characteristic,
        };

        addCharAndServiceList(resolvedService);
      }
    } catch (error) {
      Alert.alert('getServiceHata: ' + error);
    }
  }

  function delay() {
    return new Promise(resolve => setTimeout(resolve, 1000));
  }

  async function getCharacteristics(serviceUuid) {
    await delay();
    const characteristics = await device.characteristicsForService(serviceUuid);

    return characteristics;
  }

  const loading = () => <Loading />;

  function handleInputToggle(characteristicUuid, serviceuuid) {
    setSendButonState(false);
    setInputModalVisible(!inputModalVisible);
    setSelectedCharacteristicUuid(characteristicUuid);
    setSelectedServiceUuid(serviceuuid);
  }

  async function characteristicValueRead(characteristicUuid, serviceuuid) {
    setSelectedCharacteristicUuid(characteristicUuid);
    setSelectedServiceUuid(serviceuuid);

    try {
      const readCharacteristic = await device.readCharacteristicForService(
        selectedServiceUuid,
        selectedCharacteristicUuid,
      );
      const heightInCentimeters = Buffer.from(
        readCharacteristic.value,
        'base64',
      ).readUInt16LE(0);

      Alert.alert(
        'Value :   ' + readCharacteristic.value,
        'ServiseUuid : ' +
          selectedServiceUuid.slice(4, 8) +
          ', CharacteristicUuid : ' +
          selectedCharacteristicUuid.slice(4, 8) +
          '  ReadCharacteristic.value : ' +
          heightInCentimeters,
      );
      console.log('readCharacteristic.value : ' + heightInCentimeters);
    } catch (error) {
      console.log('catchError:' + error);
    }
  }

  async function handleSendValue(heightBuffer) {
    console.log('veriler');
    console.log('clickedCharacteristicUuid:' + selectedCharacteristicUuid);
    console.log('clickedServiceUuid:' + selectedServiceUuid);
    console.log('heightBuffer2:' + heightBuffer);

    try {
      setSendButonState(true);

      console.log('buffer:' + heightBuffer.toString('base64'));

      await device.writeCharacteristicWithResponseForService(
        selectedServiceUuid,
        selectedCharacteristicUuid,
        heightBuffer.toString('base64'),
      );

      setSendButonState(false);
      Alert.alert('Update process successful..');
      console.log('Güncelleme başarılı');
    } catch (error) {
      console.log('catchError: ' + error);
      setSendButonState(false);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <SectionList
        sections={serviceAndCharDataResult}
        ListEmptyComponent={loading}
        keyExtractor={(item, index) => item + index}
        renderItem={renderSectionCharacteristicItem}
        renderSectionHeader={renderSectionHeader}
      />
      <CharateristicUpdateModal
        isVisible={inputModalVisible}
        onClose={handleInputToggle}
        onSend={handleSendValue}
        loading={sendButonState}
      />
    </SafeAreaView>
  );
}

/*

veriler
 LOG  clickedCharacteristicUuid:0000a235-b38d-4985-720e-0f993a68ee41
 LOG  clickedServiceUuid:0000a234-b38d-4985-720e-0f993a68ee41
 LOG  clickedFormat:writeUInt32LE
 LOG  Input Value:5
 LOG  catchError: RangeError: Index out of range
 */

/*
 clickedCharacteristicUuid:0000a235-b38d-4985-720e-0f993a68ee41
 LOG  clickedServiceUuid:0000a234-b38d-4985-720e-0f993a68ee41
 LOG  clickedFormat:writeUInt32LE
 LOG  Input Value:5
 LOG  catchError: {"line":131963,"column":56,
 "sourceURL":"http://localhost:8081/index.bundle?platform=android&dev=true&minify=false&app=com.bleplxbluetoothapp&modulesOnly=false&runModule=true"}
*/

/*
   catchError: BleError: Operation was rejected

    clickedCharacteristicUuid={characteristicUuid.slice(4, 8)}

Uınt8 - Uint16 - Uint32 - - Sint8 - Sint16 - Sint32 - Text - Byte Array

    Bunları eklemen bekleniyor comboBox kısmına

    U = Unsigned
    S = Signed

    JS'te ki karşılıklarına bakarsın internetten

*/
