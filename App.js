import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, NativeModules, NativeEventEmitter, } from 'react-native';
import { useState, useEffect } from 'react'; 
import { stringToBytes } from 'convert-string';
import { Buffer } from 'buffer';
import BleManager from 'react-native-ble-manager';
import DeviceContainer from './components/device_container';
import Header from './components/header';
import AddModal from './components/add_modal';
import EditModal from './components/edit_modal';
import WifiModal from './components/wifi_modal';
import { 
  storeData,
  deleteElement,
  getData,
  makeNewVal,
  editData,
  initData,
} from './util';


const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);

export default function App() {

  const [ isSetting, setIsSetting ] = useState(false);
  const [ addModalVisible, setAddModalVisible ] = useState(false);
  const [ modifyVisible, setModifyVisible ] = useState(false);
  const [ wifiVisible, setWifiVisible ] = useState(false);
  const [ isLoading, setIsLoading ] = useState(true);
  const [ data, setData ] = useState({});
  const [ lastId, setLastId ] = useState(0);
  const [ editVal, setEditVal ] = useState([]);


  const renderItem = ({ item }) => (
    <DeviceContainer 
      text={item.name} 
      id={item.id} 
      isSetting={isSetting} 
      onPress={onPress}
      passEditVal={passEditVal}
    />
  );

  const runApp = (res) => {
    const json = JSON.parse(res);
    if(json === null){
      initData();
    } else {
      setData(json.value);
      setLastId(json.lastId);
    }
    setIsLoading(false);
  }

  const addData = (name) => {
    BleManager.scan(["11da82f8-d97e-4566-a494-4f6b88c8b271"], 5, false)
      .then(() => {
        console.log("Scanning started");
      });

    const newVal = makeNewVal(name, lastId);
    const newArr = data;
    newArr.push(newVal);
    setLastId(lastId + 1);
    setData(newArr);
    storeData({lastId: lastId, value: data});
  }

  const handleEdit = (id, text) => {
    let json = editData(data, id, text, lastId);
    console.log(json);
    setData(json);
  }

  const handleDelete = (id) => {
    const arr = deleteElement(data, id);
    console.log(arr);
    setData(arr);
    storeData({lastId: lastId, value: arr});
  }

  const passEditVal = (arr) => {
    setEditVal(arr);
  }

  const BleEventlistener = () => {
    bleManagerEmitter.addListener("BleManagerStopScan", () => {
      console.log("Scanning stopped");
    });
  }

  useEffect(() => {
    BleManager.start().then(() => {
      console.log("BLE Module initialized");
    });
    BleEventlistener();
    getData()
      .then((res) => runApp(res));
  }, [])


  const onPress = (type, id=undefined) => {
    switch (type){
      case "setting":
        setIsSetting(previous => !previous);
        break;

      case "add":
        setAddModalVisible(true);
        break;

      case "modify":
        setModifyVisible(true);
        break;
        
      case "wifi":
        setWifiVisible(true);
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
        editVal={editVal}
        passEditVal={passEditVal}
        handleEdit={handleEdit}
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
