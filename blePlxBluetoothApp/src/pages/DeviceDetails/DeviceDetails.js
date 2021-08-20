import React, {useState, useEffect} from 'react';
import {Alert, SafeAreaView, SectionList} from 'react-native';
import {useSelector} from 'react-redux';
import {useDebouncedCallback} from 'use-debounce';

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

  const renderSectionCharacteristicItem = ({item, section}) => (
    <SectionListItemCard
      uuid={item.uuid.slice(4, 8)}
      onPress={() =>
        handleInputToggle(item.uuid.slice(4, 8), section.title.slice(4, 8))
      }
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
    setInputModalVisible(!inputModalVisible);
    setClickedCharacteristicUuid(characteristicUuid);
    setClickedServiceUuid(serviceuuid);
  }

  function handleSendValue(value) {
    console.log(clickedCharacteristicUuid);
    console.log(clickedServiceUuid);
    console.log(value);
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
        charactericticUuid={clickedCharacteristicUuid}
      />
    </SafeAreaView>
  );
}

/*
    
Uınt8 - Uint16 - Uint32 - - Sint8 - Sint16 - Sint32 - Text - Byte Array

    Bunları eklemen bekleniyor comboBox kısmına

    U = Unsigned
    S = Signed

    JS'te ki karşılıklarına bakarsın internetten

*/
