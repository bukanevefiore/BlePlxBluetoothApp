import React, {useState} from 'react';
import {View, Text, TextInput} from 'react-native';
import Modal from 'react-native-modal';

import Buton from '../../Button/Button';
import styles from './CharateristicUpdateModal.styles';

function CharacteristicUpdateModal({
  isVisible,
  onClose,
  onSend,
  charactericticUuid,
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
      swipeDirection="down"
      isVisible={isVisible}
      onSwipeComplete={onClose}
      onBackButtonPress={onClose}
      onBackdropPress={onClose}>
      <View style={styles.container}>
        <View style={styles.title_container}>
          <Text style={styles.left_text}>Characteristic Uuid: </Text>
          <Text style={styles.right_text}> {charactericticUuid}</Text>
        </View>
        <View style={styles.input_container}>
          <TextInput placeholder="Value" onChangeText={setText} />
        </View>
        <Buton text="Gönder" />
        <Buton text="Gönder" onPress={handleSend} />
      </View>
    </Modal>
  );
}

export default CharacteristicUpdateModal;
