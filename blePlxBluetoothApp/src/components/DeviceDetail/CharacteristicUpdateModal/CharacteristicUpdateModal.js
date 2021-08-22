import React, {useState} from 'react';
import {View, Text, TextInput} from 'react-native';
import Modal from 'react-native-modal';

import Buton from '../../Button/Button';
import SelectDropdown from '../SelectDropdown';
import styles from './CharateristicUpdateModal.styles';

function CharacteristicUpdateModal({
  isVisible,
  onClose,
  onSend,
  charactericticUuid,
  clickedDropdown,
}) {
  const [text, setText] = useState(null);

  function handleSend() {
    if (!text) {
      return;
    }
    onSend(text);
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
          <Text style={styles.right_text}> {charactericticUuid}</Text>
        </View>
        <View style={styles.input_container}>
          <TextInput placeholder="Enter Value" onChangeText={setText} />
        </View>
        <SelectDropdown clickedDropdown={clickedDropdown} />
        <Buton text="SEND" onPress={handleSend} />
      </View>
    </Modal>
  );
}

export default CharacteristicUpdateModal;
