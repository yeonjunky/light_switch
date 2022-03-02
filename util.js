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

const addNewVal = (json, name) => {
  json.lastValue++;
  let newVal = {
    id: json.lastValue,
    name: name,
  }
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

export { updateStatus, storeData, deleteElement };