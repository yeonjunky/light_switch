import AsyncStorage from '@react-native-async-storage/async-storage';


function updateStatus(arr, index) {
  arr[index] = !arr[index];
  return arr;
}

const storeData = async (value) => {
  try {
    await AsyncStorage.setItem('Devices', JSON.stringify(value))
      .then(() => console.log('data saved!')
    )
  } catch (e) {
    console.log(e);
  }
}

const getData = async () => {
  return AsyncStorage.getItem('Devices');
}

const makeNewVal = (name, lastId) => {
  let newVal = {
    id: lastId + 1,
    name: name,
  }
  return newVal;
}

const deleteElement = (arr, id) => {
  let newArr = [];
  arr.filter((item) => {
    if (item.id !== id) {
      newArr.push(item);
    }
  })
  return newArr;
}

const setWifi = async (ssid, pwd) => {
  const data = {ssid: ssid, pwd: pwd};
  await AsyncStorage.setItem('wifi', JSON.stringify(data))
    .then(() => console.log('data saved!'))
}

const getWifi = async (setSsid, setPwd) => {
  await AsyncStorage.getItem('wifi')
    .then((res) => JSON.parse(res))
    .then((json) => {
      setSsid(json.ssid);
      setPwd(json.pwd);
    })
}

const data = { 
  lastId: 3,
  value: [
    {
      id: '1',
      name: 'First Item',
    },
    {
      id: '2',
      name: 'Second Item',
    },
    {
      id: '3',
      name: 'Third Item',
    },
  ]
}

// storeData(data);

export { updateStatus, storeData, getData, deleteElement, setWifi, getWifi, makeNewVal };