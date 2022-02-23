import { StyleSheet, Text, View, Switch } from 'react-native';
import { useState } from 'react'

export default function DeviceContainer(props) {
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    return (
    <View style={styles.DeviceContainer}>
        <Text style={styles.Text}>{props.text}</Text>
        <Switch 
          trackColor={{ false: "#dedede", true: "#35baf6"}}
          thumbColor={"#f4f3f4"}
          value={isEnabled}
          onValueChange={toggleSwitch}
        />
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

});