import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, Modal } from 'react-native';
import { useState, useEffect } from 'react'; 
import AsyncStorage from '@react-native-async-storage/async-storage';
import DeviceContainer from './components/device_container';
import Header from './components/header';
import AddModal from './components/add_modal';
import EditModal from './components/edit_modal';
import { storeData, getData } from './util';


export default function App() {

  const [ isSetting, setIsSetting ] = useState(false);
  const [ modalVisible, setModalVisible ] = useState(false);
  const [ isLoading, setIsLoading ] = useState(true);
  const [ data, setData ] = useState(null);

  const renderItem = ({ item }) => {
    <DeviceContainer text={item.name} isSetting={isSetting} />
  };

  useEffect(() => {
    getData()
      .then(res => {setData(res)});
    setIsLoading(false);
  }, [])

  const onPress = (type) => {
    switch (type){
      case "setting":
        setIsSetting(previous => !previous);
        break;

      case "add":
        setModalVisible(previous => !previous);
        break;
    }
  }

  const onRequestClose = () => setModalVisible(previous => !previous)

  return (
    <View style={styles.container}>
      <Header 
        onPress={onPress} 
        isSetting={isSetting} 
      />
      <AddModal modalVisible={modalVisible} onRequestClose={onRequestClose}>
        
      </AddModal>
      { isLoading ? 
      <Text>Loading...</Text>
      :
      <FlatList
        data={data.value}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />}
      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
  },
  flatList: {
    width: "100%",
    height: "100%",
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    backgroundColor: '#dedede',
  }
});
