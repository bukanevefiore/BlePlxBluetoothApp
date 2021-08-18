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
import colors from '../../styles/colors';

export default function DeviceDetailPage() {
  const device = useSelector(d => d.selectedDevice);
  const [dataResult, setDataResult] = useState([]);

  const CharacteristicItem = ({item}) => (
    <View style={styles.item}>
      <Text style={styles.title}>{item}</Text>
    </View>
  );

  const SectionHeaderService = ({section}) => (
    <Text style={styles.header}>{section.title}</Text>
  );

  async function getServicesAndCharacteristics() {
    try {
      await device.discoverAllServicesAndCharacteristics();
      const services = await device.services();
      const sectionDataResult = await getServices(services);
      console.log('data');
      console.log(sectionDataResult);
      setDataResult([...setDataResult, sectionDataResult]);
    } catch (error) {
      console.log('Catch :' + error);
    }
  }

  useEffect(() => {
    getServicesAndCharacteristics();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function getServices(services) {
    try {
      const response = await services.map(async service => {
        const characteristic = await getCharacteristics(service.uuid);
        //console.log(characteristic);
        const resolvedService = {
          title: service.uuid,
          data: characteristic[Object.keys(characteristic)].uuid,
        };
        console.log(resolvedService);
        return resolvedService;
      });
      return response;
    } catch (error) {
      console.log(error);
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

  const MyComponent = () => (
    <ActivityIndicator animating={true} color={colors.koyugri} />
  );

  return (
    <SafeAreaView style={styles.container}>
      <SectionList
        sections={dataResult}
        ListEmptyComponent={MyComponent}
        keyExtractor={(item, index) => item + index}
        renderItem={({item}) => <CharacteristicItem item={item} />}
        renderSectionHeader={SectionHeaderService}
      />
    </SafeAreaView>
  );
}
