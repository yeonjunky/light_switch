import AsyncStorage from '@react-native-async-storage/async-storage';
import { PermissionsAndroid } from 'react-native';


function updateStatus(arr, index) {
  arr[index] = !arr[index];
  return arr;
}

const initData = async () => {
  const firstPair = ['Devices', JSON.stringify({lastId: 0, value: []})];
  const secondPair = ['wifi', JSON.stringify({ssid: '', pwd: ''})]
  await AsyncStorage.multiRemove(['Devices', 'wifi'])
    .then(() => {
      AsyncStorage.multiSet([firstPair, secondPair]);
    })
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

const editData = (value, id, text, lastId) => {
  let newValue = []
  try {
    value.filter((item) => {
      if(item.id === id) {
        item.name = text;
      }
      newValue.push(item);
    })
    console.log(newValue);
    storeData({lastId: lastId, value: newValue});
    return newValue;

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
      if(json === null){

      } else {
        setSsid(json.ssid);
        setPwd(json.pwd);
      }
    })
}

const checkPermission = async () => {
  const chckLocationPermission = PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
    if (chckLocationPermission === PermissionsAndroid.RESULTS.GRANTED) {
        alert("You've access for the location");
    } else {
        try {
            const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                {
                  'title': 'Cool Location App required Location permission',
                  'message': 'We required Location permission in order to get device location ' +
                      'Please grant us.',
                  buttonNeutral: "Ask Me Later",
                  buttonNegative: "Cancel",
                  buttonPositive: "OK"
                }
            )
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                alert("You've access for the location");
            } else {
                alert("You don't have access for the location");
            }
        } catch (err) {
            alert(err)
        }
    }
}

export { 
  updateStatus, 
  initData, 
  storeData, 
  getData, 
  deleteElement, 
  setWifi, 
  getWifi, 
  makeNewVal,
  editData,
  // checkPermission,
 };