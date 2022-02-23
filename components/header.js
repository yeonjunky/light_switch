import { StyleSheet, Text, View } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

export default function Header(props) {
  return (
  <View style={styles.headerContainer}>
    <View style={styles.header}>
      <FontAwesome 
        name='gear' 
        size={40} 
        color="white" 
        style={styles.gear} 
        // onPress={}
      />
    </View>
  </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    width: "100%",
    height: 50,
    top: 0,
    backgroundColor: "#0276aa",
    marginBottom: 25,
  },
  header: {
    marginTop: 25,
    width: "100%",
    height: 50,
    top: 0,
    backgroundColor: "#35baf6",
    alignItems: 'center',
    flexDirection: "row-reverse",
  },
  gear: {
    marginRight: 7,
  },
    
})