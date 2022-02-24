import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, Modal } from 'react-native';
import { useState } from 'react'; 
import DeviceContainer from './components/device_container';
import Header from './components/header';
import AddModal from './components/add_modal';
import EditModal from './components/edit_modal';


const data = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28b2',
    title: 'First Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f61',
    title: 'Second Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d75',
    title: 'Third Item',
  },
]

export default function App() {
  const [ isAdd, setIsAdd ] = useState(false);
  const [ isSetting, setIsSetting ] = useState(false);
  const [ modalVisible, setModalVisible ] = useState(false);

  const renderItem = ({ item }) => (
    <DeviceContainer text={item.title} />
  );


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
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
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
