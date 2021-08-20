import React from 'react';
import {View, Text} from 'react-native';
import Dropdown from 'react-native-select-dropdown';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './SelectDropdown.styles';
import colors from '../../../styles/colors';

function SelectDropdown({clickedDropdown}) {
  const formats = [
    'UInt8',
    'UInt16',
    'UInt32',
    'SinT8',
    'Sint16',
    'Sint32',
    'Text',
    'Byte Array',
  ];

  function clickedFormat(selectedFormat) {
    // console.log(selectedFormat);
    clickedDropdown(selectedFormat);
  }

  const icon = () => (
    <Icon name="chevron-down" color={colors.lightGray} size={30} />
  );

  return (
    <Dropdown
      buttonStyle={styles.buton_container}
      rowStyle={styles.buton_container}
      dropdownStyle={styles.buton_container}
      data={formats}
      defaultValueByIndex="0"
      dropdownIconPosition="right"
      renderDropdownIcon={icon}
      onSelect={(selectedItem, index) => clickedFormat(index)}
      buttonTextAfterSelection={(selectedItem, index) => {
        // öğe seçildikten sonra temsil edilen metin
        // veri dizisi bir nesne dizisiyse, öğe seçildikten sonra işlemek için selectedItem.property değerini döndür
        return selectedItem;
      }}
      rowTextForSelection={(item, index) => {
        // açılır menüde her öğe için temsil edilen metin
        // veri dizisi bir nesne dizisiyse, açılır menüdeki öğeyi temsil etmek için item.property döndürün
        return item;
      }}
    />
  );
}

export default SelectDropdown;
