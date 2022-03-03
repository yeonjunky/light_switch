import { StyleSheet, Text, View, Modal, TextInput, Pressable } from 'react-native';
import { useState } from 'react'; 

export default function AddModal(props) {
  const [ text, setText ] = useState('');

  return (
    <View style={styles.center}>
      <Modal
        animationType='fade'
        transparent={true}
        visible={props.modalVisible}
        onRequestClose={() => props.onRequestClose()}
      >
        <View style={styles.modalView}>
          <View style={styles.modalInput}>
            <TextInput 
              value={text}
              onChangeText={setText}
              placeholder='Name'
            />
          </View>

          {/* <View style={styles.modalInput}>
            <TextInput 
              value={text}
              onChangeText={setText}
              placeholder='Ip'
            />
          </View> */}

          <View style={styles.buttonView}>

            <View style={styles.button}>
              <Pressable onPress={() => {
                props.addData(text)
                props.onRequestClose()
                setText('')
              }}>
                <Text style={styles.text}>
                  Apply
                </Text>
              </Pressable>
            </View>

            <View style={styles.button}>
              <Pressable onPress={() => props.onRequestClose()}>
                <Text style={styles.text}>
                  Cancel
                </Text>
              </Pressable>
            </View>

          </View>  
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  center: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
  },
  modalView: {
      flexDirection: 'column',
      width: '65%',
      alignSelf: 'center',
      marginTop: '40%',
      elevation: 3,
      backgroundColor: '#fff',
  },
  modalInput: {
    borderBottomColor: '#35baf6',
    borderBottomWidth: 1,
    margin: 20,
  },
  buttonView: {
    flexDirection: 'row',
  },
  button: {
    margin: 20,
    marginRight: 5,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 2,
  },
  text: {
    fontSize: 15,
    margin: 10,
  },
})