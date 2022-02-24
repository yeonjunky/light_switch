import { StyleSheet, Text, View, FlatList, Modal, TextInput } from 'react-native';
import { useState } from 'react'; 

export default function AddModal() {
  const [ modalVisible, setModalVisible ] = useState(false);
  const [ text, setText ] = useState('');

  return (
    <Modal
      animationType='slide'
      transparent='true'
      visible={modalVisible}
      onRequestClose={setModalVisible(!modalVisible)}
    >
      <TextInput 
        value={text}
        onChangeText={setText}
        placeholder='Name'
      />
    </Modal>
  );
}