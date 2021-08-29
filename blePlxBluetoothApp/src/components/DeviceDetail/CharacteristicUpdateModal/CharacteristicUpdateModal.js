import React, {useState} from 'react';
import {View, TextInput, Alert, Text} from 'react-native';
import Modal from 'react-native-modal';
import {Buffer} from 'buffer';

import Buton from '../../Button/Button';
import SelectDropdown from '../SelectDropdown';
import styles from './CharateristicUpdateModal.styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../../../styles/colors';

const CharacteristicUpdateModal = ({isVisible, onClose, onSend, loading}) => {
  const [text, setText] = useState(null);
  const [selectedFormat, setSelectedFormat] = useState('');

  const formatValue = {
    uint8: () => {
      const buffer = Buffer.allocUnsafe(4);
      buffer.writeUInt8(text, 0);
      return buffer.toString('base64');
    },
    uint16: () => {
      const buffer = Buffer.allocUnsafe(4);
      buffer.writeUInt16LE(text, 0);
      return buffer.toString('base64');
    },
    uint32: () => {
      const buffer = Buffer.allocUnsafe(4);
      buffer.writeUInt32LE(text, 0);
      return buffer.toString('base64');
    },
    int8: () => {
      const buffer = Buffer.allocUnsafe(2);
      buffer.writeInt8(text, 0);
      return buffer.toString('base64');
    },
    int16: () => {
      const buffer = Buffer.allocUnsafe(2);
      buffer.writeInt16LE(text, 0);
      return buffer.toString('base64');
    },
    int32: () => {
      const buffer = Buffer.allocUnsafe(4);
      buffer.writeInt32LE(text, 0);
      return buffer.toString('base64');
    },
    text: () => {
      const buffer = Buffer.from(text).toString('base64');
      return buffer;
    },
  };

  function valueFormatter() {
    switch (selectedFormat) {
      case 0:
        return formatValue.uint8();
      case 1:
        return formatValue.uint16();
      case 2:
        return formatValue.uint32();
      case 3:
        return formatValue.int8();
      case 4:
        return formatValue.int16();
      case 5:
        return formatValue.int32();
      case 6:
        return formatValue.text();

      default:
        return formatValue.text();
    }
  }

  function handleSend() {
    if (!text) {
      setText('Connot be blank !');
      return;
    }

    const formattedValue = valueFormatter();

    onSend(formattedValue);
    setText(null);
  }

  return (
    <Modal
      style={styles.modal}
      isVisible={isVisible}
      onBackButtonPress={onClose}
      onBackdropPress={onClose}>
      <View style={styles.container}>
        <View style={styles.input_container}>
          <TextInput
            placeholder="Enter Value"
            onChangeText={setText}
            value={text}
          />
          {!text ? (
            <Icon
              name="exclamation"
              size={23}
              style={styles.icon}
              color={colors.red}
            />
          ) : null}
        </View>
        <SelectDropdown clickedDropdown={setSelectedFormat} />
        <Buton text="SEND" onPress={handleSend} loading={loading} />
      </View>
    </Modal>
  );
};

export default CharacteristicUpdateModal;
