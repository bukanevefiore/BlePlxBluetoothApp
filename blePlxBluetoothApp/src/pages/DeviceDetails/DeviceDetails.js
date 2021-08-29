import React, {useState, useEffect} from 'react';
import {Alert, SafeAreaView, SectionList} from 'react-native';
import {useSelector} from 'react-redux';
import {useDebouncedCallback} from 'use-debounce';
import {Buffer} from 'buffer';
import {showMessage} from 'react-native-flash-message';

import styles from './DeviceDetails.styles';
import SectionListHeaderCard from '../../components/DeviceDetail/SectionListHeaderCard';
import SectionListItemCard from '../../components/DeviceDetail/SectionListItemCard/SectionListItemCard';
import Loading from '../../components/Loading/Loading';
import CharateristicUpdateModal from '../../components/DeviceDetail/CharacteristicUpdateModal';
import ErrorMessageParser from '../../utils/ErrorMessageParser';

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
      showMessage({
        message: ErrorMessageParser(JSON.stringify(error.errorCode)),
        type: 'warning',
      });
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
      showMessage({
        message: ErrorMessageParser(JSON.stringify(error.errorCode)),
        type: 'warning',
      });
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

  function handleInputToggle(characteristicUuid, serviceuuid) {
    setSendButonState(false);
    setInputModalVisible(!inputModalVisible);
    setSelectedCharacteristicUuid(characteristicUuid);
    setSelectedServiceUuid(serviceuuid);
  }

  async function characteristicValueRead(characteristicUuid, serviceuuid) {
    setSelectedCharacteristicUuid('');
    setSelectedServiceUuid('');
    setSelectedCharacteristicUuid(characteristicUuid);
    setSelectedServiceUuid(serviceuuid);

    try {
      const readCharacteristic = await device.readCharacteristicForService(
        selectedServiceUuid,
        selectedCharacteristicUuid,
      );
      const decodedValue = Buffer.from(
        readCharacteristic.value,
        'base64',
      ).toString('ascii'); //.readUInt16LE(0);

      Alert.alert(
        'Value :   ' + readCharacteristic.value,
        'ServiseUuid : ' +
          selectedServiceUuid.slice(4, 8) +
          ', CharacteristicUuid : ' +
          selectedCharacteristicUuid.slice(4, 8) +
          ', isWritableWithResponse : ' +
          readCharacteristic.isWritableWithResponse +
          ', isReadable : ' +
          readCharacteristic.isReadable,
      );
    } catch (error) {
      showMessage({
        message: ErrorMessageParser(JSON.stringify(error.errorCode)),
        type: 'warning',
      });
    }
  }

  async function handleSendValue(value) {
    try {
      setSendButonState(true);

      await device.writeCharacteristicWithResponseForService(
        selectedServiceUuid,
        selectedCharacteristicUuid,
        value,
      );

      Alert.alert('Update process successful..');
    } catch (error) {
      Alert.alert(
        'The operation could not be performed.' +
          ErrorMessageParser(JSON.stringify(error.errorCode)),
      );
    } finally {
      setSendButonState(false);
    }
  }

  const loading = () => <Loading />;

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
