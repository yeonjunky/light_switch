import { StyleSheet, Text, View } from 'react-native';
import { FontAwesome, Feather } from '@expo/vector-icons';

export default function Header(props) {
  return (
  <View style={styles.headerContainer}>
    <View style={styles.header}>
      <Feather name='plus' size={40} color='white'></Feather>
      {props.isSetting ? 
        <FontAwesome 
          name='check'
          size={40}
          color='white'
          style={styles.rightIcon}
          onPress={props.onPress}
        /> :
        <FontAwesome 
          name='gear' 
          size={40} 
          color='white' 
          style={styles.rightIcon} 
          onPress={props.onPress}
        />
      }
    </View>
  </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    width: '100%',
    height: 50,
    top: 0,
    backgroundColor: '#0276aa',
    marginBottom: 25,
  },
  header: {
    marginTop: 25,
    width: '100%',
    height: 50,
    top: 0,
    backgroundColor: '#35baf6',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  rightIcon: {
    marginRight: 7,
  },
    
})