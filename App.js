import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, Modal } from 'react-native';
import { useState, useEffect } from 'react'; 
import AsyncStorage from '@react-native-async-storage/async-storage';
import DeviceContainer from './components/device_container';
import Header from './components/header';
import AddModal from './components/add_modal';
import EditModal from './components/edit_modal';
import { storeData, deleteElement } from './util';


export default function App() {

  const [ isSetting, setIsSetting ] = useState(false);
  const [ addModalVisible, setAddModalVisible ] = useState(false);
  const [ modifyVisible, setModifyVisible ] = useState(false);
  const [ isLoading, setIsLoading ] = useState(true);
  const [ data, setData ] = useState({});
  const [ lastId, setLastId ] = useState(0);

  const renderItem = ({ item }) => (
    <DeviceContainer 
      text={item.name} 
      id={item.id} 
      isSetting={isSetting} 
      onPress={onPress}
    />
  );

  const getData = async () => {
    await AsyncStorage.getItem('Devices')
      .then((res) => {
        const json = JSON.parse(res)
        // console.log(json);
        setData(json.value);
        setLastId(json.lastId);
        setIsLoading(false);
      })
  }

  const handleRefresh = () => {
    setIsLoading(false, () => {getData()})
  }

  const handleDelete = (id) => {
    const arr = deleteElement(data, id);
    console.log(arr);
    setData(arr);
    storeData({lastId: lastId, value: arr});
  }

  useEffect(() => {
    getData();
  }, [])

  const onPress = (type, id=undefined) => {
    switch (type){
      case "setting":
        setIsSetting(previous => !previous);
        break;

      case "add":
        setAddModalVisible(previous => !previous);
        break;

      case "modify":
        setModifyVisible(previous => !previous);
        break;

      case "delete":
        handleDelete(id);
        break;
    }
  }

  const closeAdd = () => setAddModalVisible(previous => !previous);
  const closeModify = () => setModifyVisible(previous => !previous)

  return (
    <View style={styles.container}>
      <Header 
        onPress={onPress} 
        isSetting={isSetting} 
      />
      <AddModal modalVisible={addModalVisible} onRequestClose={closeAdd} />
      <EditModal modalVisible={modifyVisible} onRequestClose={closeModify} />
      
      { isLoading ? 
      <Text>Loading...</Text>
      :
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        extraData={data}
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
