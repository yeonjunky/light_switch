import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { useState, useEffect } from 'react'; 
import DeviceContainer from './components/device_container';
import Header from './components/header';
import AddModal from './components/add_modal';
import EditModal from './components/edit_modal';
import WifiModal from './components/wifi_modal';
import { storeData, deleteElement, getData, makeNewVal } from './util';


export default function App() {

  const [ isSetting, setIsSetting ] = useState(false);
  const [ addModalVisible, setAddModalVisible ] = useState(false);
  const [ modifyVisible, setModifyVisible ] = useState(false);
  const [ wifiVisible, setWifiVisible ] = useState(false);
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

  const initialize = (res) => {
    const json = JSON.parse(res);
    setData(json.value);
    setLastId(json.lastId);
    setIsLoading(false);
  }

  const handleRefresh = () => {
    setIsLoading(false, () => {getData()})
  }

  const addData = (name) => {
    const newVal = makeNewVal(name, lastId);
    const newArr = data;
    newArr.push(newVal);
    setLastId(lastId + 1);
    setData(newArr);
    storeData({lastId: lastId, value: data});
  }

  const handleDelete = (id) => {
    const arr = deleteElement(data, id);
    console.log(arr);
    setData(arr);
    storeData({lastId: lastId, value: arr});
  }

  useEffect(() => {
    getData()
      .then((res) => initialize(res));
  }, [])

  // console.log(data);

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
        
      case "wifi":
        setWifiVisible(previous => !previous);
        break;
      
      case "delete":
        handleDelete(id);
        break;

    }
  }

  const closeModal = (type) => {
    switch (type) {
      case "add":
        setAddModalVisible(false);
        break;

      case "modify":
        setModifyVisible(false);
        break

      case "wifi":
        setWifiVisible(false);
        break;
    }
  }

  return (
    <View style={styles.container}>
      <Header 
        onPress={onPress} 
        isSetting={isSetting} 
      />
      <AddModal 
        modalVisible={addModalVisible} 
        onRequestClose={() => closeModal('add')} 
        addData={addData}
      />
      <EditModal 
        modalVisible={modifyVisible} 
        onRequestClose={() => closeModal('modify')} 
      />
      <WifiModal 
        modalVisible={wifiVisible} 
        onRequestClose={() => closeModal('wifi')} 
      />
      
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
