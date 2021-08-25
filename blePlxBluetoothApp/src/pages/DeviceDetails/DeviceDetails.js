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
  const [clickedCharacteristicUuid, setClickedCharacteristicUuid] =
    useState('');
  const [clickedServiceUuid, setClickedServiceUuid] = useState('');
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
    setClickedCharacteristicUuid(characteristicUuid);
    setClickedServiceUuid(serviceuuid);
  }

  async function characteristicValueRead(characteristicUuid, serviceuuid) {
    setClickedCharacteristicUuid(characteristicUuid);
    setClickedServiceUuid(serviceuuid);

    // https://base64.guru/converter/decode/hex  =>  char value yi önce burdan base64 den hex koda çeviriyoruz
    const a = Buffer.from('16000000', 'hex'); // sonra bu işlemi bu yapıyoruz
    console.log(a); // {"data": [22, 0, 0, 0], "type": "Buffer"}
    console.log('16000000 : ' + a[0]); // 22

    try {
      const characteristicValuesRead =
        await device.readCharacteristicForService(
          clickedServiceUuid,
          clickedCharacteristicUuid,
        );
      Alert.alert();
      Alert.alert(
        'Value :   ' + characteristicValuesRead.value,
        'Servise Uuid : ' +
          clickedServiceUuid.slice(4, 8) +
          ' Characteristic Uuid : ' +
          clickedCharacteristicUuid.slice(4, 8),
      );
      console.log(characteristicValuesRead);
    } catch (error) {
      console.log('catchError:' + error);
    }
  }

  async function handleSendValue(heightBuffer) {
    console.log('veriler');
    console.log('clickedCharacteristicUuid:' + clickedCharacteristicUuid);
    console.log('clickedServiceUuid:' + clickedServiceUuid);
    console.log('heightBuffer2:' + heightBuffer);

    try {
      setSendButonState(true);

      console.log('buffer:' + heightBuffer.toString('base64'));

      await device.writeCharacteristicWithResponseForService(
        clickedServiceUuid,
        clickedCharacteristicUuid,
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
