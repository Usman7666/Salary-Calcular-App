import {
  View,
  Text,
  ImageBackground,
  StatusBar,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import React from 'react';

export default function MainPage(props) {
  return (
    <ImageBackground
      style={styles.backimg}
      source={require('../assets/Backgroundimg.png')}
      resizeMode="cover">
      <View style={styles.main}>
        <Text style={styles.entname}>Shahzaib Enterprises</Text>

        <View style={{flex:1,justifyContent:'space-evenly'}}>
          <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
            <Image style={{height:130,width:130}} source={require('../assets/employee.png')}/>
            
          </View>
        
        <View style={{flexDirection:'row'}}>
        <View style={styles.listview}>
          <TouchableOpacity
          style={styles.touchable}
            onPress={() => props.navigation.navigate('Employee_List')}>
              <View style={{flexDirection:'row',alignItems:'center'}}> 
                <Image style={{height:60,width:60}} source={require('../assets/users.png')}/>
              <Text style={styles.text}>Details</Text>
              </View>
            
          </TouchableOpacity>
        </View>
        <View style={styles.listview}>
          <TouchableOpacity
          style={styles.touchable}
          onPress={()=>props.navigation.navigate('Salary_List')}>
            <View style={{flexDirection:'row',alignItems:'center'}}> 
                <Image style={{height:60,width:60}} source={require('../assets/salary.png')}/>
              <Text style={styles.text}>Salary</Text>
              </View>
          </TouchableOpacity>
        </View>
        </View>
        </View>
        <View style={styles.addview}>
          <TouchableOpacity
          style={styles.touchable}
            onPress={() => props.navigation.navigate('Employee_Form')}>
            <View style={{flexDirection:'row',alignItems:'center',}}> 
                <Image style={{height:50,width:50,marginRight:10}} source={require('../assets/add_user.png')}/>
              <Text style={styles.text}>New Employee</Text>
              </View>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}
const styles = StyleSheet.create({
  main: {
    marginVertical: 0,
    flex: 1,
  },
  backimg: {
    flex: 1,
    justifyContent: 'center',
  },
  text:{
    color:'white',
    fontSize:25,
  },
  entname: {
    fontSize: 30,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#ccc',
    borderBottomWidth: 5,
    borderColor: '#ccc',
    backgroundColor: '#000000c0',
  },
  touchable: {
    fontSize: 35,
    color: '#fff',
    textAlign: 'center',
    margin: 15,
    backgroundColor: '#000000c0',
    borderRadius: 20,
    padding: 5,
    elevation: 1,
    opacity: 10,
    alignItems:'center'
  },
  listview: {
    flex: 1,
    justifyContent: 'center',
  },
  addview: {
    flex: 1,
    justifyContent: 'flex-end',
  },
});
