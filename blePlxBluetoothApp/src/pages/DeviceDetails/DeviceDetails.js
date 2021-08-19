import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  SectionList,
  ActivityIndicator,
} from 'react-native';
import styles from './DeviceDetails.styles';
import {useSelector} from 'react-redux';
import {useDebouncedCallback} from 'use-debounce';

import colors from '../../styles/colors';
import SectionListHeaderCard from '../../components/DeviceDetail/SectionListHeaderCard';
import SectionListItemCard from '../../components/DeviceDetail/SectionListItemCard/SectionListItemCard';

export default function DeviceDetailPage() {
  const device = useSelector(d => d.selectedDevice);
  const [serviceAndCharDataResult, setServiceAndCharDataResult] = useState([]);

  const renderCharacteristicItem = ({item}) => (
    <SectionListItemCard uuid={item.uuid.slice(4, 8)} />
  );

  const renderSectionHeader = ({section}) => (
    <SectionListHeaderCard title={section.title.slice(4, 8)} />
  );

  async function getServicesAndCharacteristics() {
    try {
      await device.discoverAllServicesAndCharacteristics();
      const services = await device.services();
      console.log(services);
      await getServices(services);
      console.log('data');
      console.log(serviceAndCharDataResult);
    } catch (error) {
      console.log('Catch :' + error);
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

  // Google > React Native Debug VSCode (React Native Tools)
  async function getServices(services) {
    try {
      for (let index = 0; index < services.length; index++) {
        const service = services[index];
        const characteristic = await getCharacteristics(service.uuid);

        const resolvedService = {
          title: service.uuid,
          data: characteristic,
        };

        console.log(resolvedService);
        addCharAndServiceList(resolvedService);
      }
    } catch (error) {
      console.log('getServiceHata: ' + error);
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

  const loading = () => <ActivityIndicator color={colors.darkgray} />;

  return (
    <SafeAreaView style={styles.container}>
      <SectionList
        sections={serviceAndCharDataResult}
        ListEmptyComponent={loading}
        keyExtractor={(item, index) => item + index}
        renderItem={renderCharacteristicItem}
        renderSectionHeader={renderSectionHeader}
      />
    </SafeAreaView>
  );
}

/*

TypeError: Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.
*/
