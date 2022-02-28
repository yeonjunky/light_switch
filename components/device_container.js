import { StyleSheet, Text, View, Switch } from 'react-native';
import { useState, useEffect } from 'react';
import { FontAwesome } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import { updateStatus } from '../util';

export default function DeviceContainer(props) {
  const [isOn, setIsOn] = useState(false);
  const [ channel, setChannel ] = useState("1");
  const [ status, setStatus ] = useState([false, true, false]);

  useEffect(() => {
    setIsOn(status[parseInt(channel) - 1]);
  }, [channel])

  const toggleSwitch = () => {
    setIsOn(previous => !previous);
    let arr = updateStatus(status, parseInt(channel) - 1);
    setStatus(arr);
  }

  return (
    <View style={styles.DeviceContainer}>
      <Text style={styles.Text}>{props.text}</Text>

      <Picker
        selectedValue={channel}
        onValueChange={(itemValue, itemIndex) => setChannel(itemValue)}
        mode="dropdown"
        style={styles.Picker}
      >
        <Picker.Item label="1" value="1" />
        <Picker.Item label="2" value="2" />
        <Picker.Item label="3" value="3" />
      </Picker>

      {!props.isSetting ? <Switch 
        trackColor={{ false: "#dedede", true: "#35baf6"}}
        thumbColor={"#f4f3f4"}
        value={isOn}
        onValueChange={toggleSwitch}
        /> : 
        <View>
          <FontAwesome name='pencil' size={40} color='black' style={{margin: 10,}}/>
          <FontAwesome name="trash-o" size={40} color="black" style={{margin: 10,}}/>
        </View>
      }
    </View>
  );
}

const styles = StyleSheet.create({
  DeviceContainer: {
    flex: 1,
    flexDirection: "row",
    width: "100%",
    height: 120,
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#f4f3f4"
  },
  Text: {
    marginLeft: 10,
    fontSize: 25,
    textAlignVertical: "center"
  },
  Picker: {
    width: 100,
  }
});