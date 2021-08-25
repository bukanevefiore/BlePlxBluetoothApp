import React, {useState} from 'react';
import {View, Text, TextInput, Alert} from 'react-native';
import Modal from 'react-native-modal';
import {Buffer} from 'buffer';

import Buton from '../../Button/Button';
import SelectDropdown from '../SelectDropdown';
import styles from './CharateristicUpdateModal.styles';

const CharacteristicUpdateModal = ({
  isVisible,
  onClose,
  onSend,
  clickedCharacteristicUuid,
  loading,
}) => {
  const [text, setText] = useState(null);
  const [selectedFormat, setSelectedFormat] = useState('');

  const heightBuffer = {
    uint8: () => {
      const buffer = Buffer.allocUnsafe(4);
      buffer.writeUInt8(text, 3);
      return buffer.toString('base64');
    },
    uint16: () => {
      const a = Buffer.allocUnsafe(4);
      a.writeUInt16LE(text, 0);
      return a.toString('base64');
    },
    uint32: () => {
      const buffer = Buffer.allocUnsafe(4);
      buffer.writeUInt32LE(text, 0);
      return buffer.toString('base64');
    },
    int8: () => {
      const buffer = Buffer.allocUnsafe(4);
      buffer.writeInt8(text, 0);
      return buffer.toString('base64');
    },
    int16: () => {
      const buffer = Buffer.allocUnsafe(4);
      buffer.writeInt16LE(text, 0);
      return buffer.toString('base64');
    },
    int32: () => {
      const buffer = Buffer.allocUnsafe(4);
      buffer.writeInt32LE(text, 0);
      return buffer.toString('base64');
    },
  };

  function valueFormatter() {
    switch (selectedFormat) {
      case 0:
        return heightBuffer.uint8();
      case 1:
        return heightBuffer.uint16();
      case 2:
        return heightBuffer.uint32();
      case 3:
        return heightBuffer.int8();
      case 4:
        return heightBuffer.int16();
      case 5:
        return heightBuffer.int32();

      default:
        return heightBuffer.uint16();
    }
  }

  function handleSend() {
    if (!text) {
      Alert.alert('Please enter a value...');
      return;
    }

    console.log('Text:' + text);
    console.log('format:' + selectedFormat);
    const b = valueFormatter();
    console.log('height buffer1:' + b);
    onSend(b);
    setText(null);
  }

  return (
    <Modal
      style={styles.modal}
      isVisible={isVisible}
      onBackButtonPress={onClose}
      onBackdropPress={onClose}>
      <View style={styles.container}>
        <View style={styles.title_container}>
          <Text style={styles.left_text}>Characteristic Uuid: </Text>
          <Text style={styles.right_text}>{clickedCharacteristicUuid}</Text>
        </View>
        <View style={styles.input_container}>
          <TextInput placeholder="Enter Value" onChangeText={setText} />
        </View>
        <SelectDropdown clickedDropdown={setSelectedFormat} />
        <Buton text="SEND" onPress={handleSend} loading={loading} />
      </View>
    </Modal>
  );
};

export default CharacteristicUpdateModal;
