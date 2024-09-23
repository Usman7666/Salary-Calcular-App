import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import database from '@react-native-firebase/database';
import React, {useEffect, useState} from 'react';
import {useRoute, useNavigation, StackActions} from '@react-navigation/native';

export default function Employeedetail(props) {
  const route = useRoute();
  const {item} = props.route.params;

  const handledeleteemployee = async () => {
    try {
      const response = await database().ref(`EmployeeForm/${item.id}`).remove();

      props.navigation.navigate('Employee_List');
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <ScrollView style={styles.main}>
      
      <View style={{flexDirection:'row',flexWrap:'wrap',justifyContent:'space-evenly'}}>
      <Text style={styles.text}>ID : {item.id}</Text>
      <Text style={styles.text}>Name : {item.name}</Text>
     
      </View>
      
      <Text style={styles.text}>Age : {item.age}</Text>
      <Text style={styles.text}>Father_Name : {item.Father_Name}</Text>
      <Text style={styles.text}>Email : {item.email}</Text>
      <Text style={styles.text}>Phone_Number : {item.Phone_Number}</Text>
      <Text style={styles.text}>Address : {item.Address}</Text>
      <Text style={styles.text}>Destination : {item.Occupation}</Text>
    
     <Text style={styles.text}>Advance_Cash : {item.Advance_Cash}</Text>
      <Text style={styles.text}>Per_Day_Pay : {item.Per_Day_Pay}</Text>
      <Text style={styles.text}>Weekly_Pay : {item.Weekly_Pay}</Text>
      <Text style={styles.text}>Monthly_Pay : {item.Monthly_Pay}</Text>
   
      
      <View style={styles.buttonview}>
        <TouchableOpacity onPress={() => handledeleteemployee()}>
          <Text style={styles.button}>Delete</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  main: {
    backgroundColor: '#ccc',
  },
  text: {
    color: 'black',
    fontSize: 25,
    margin: 8,
    padding:5,
    borderColor:'black',
    borderWidth:1,
    backgroundColor:'skyblue',
    textAlign:'center'
  },
  button: {
    color: '#fff',
    backgroundColor: 'red',
    fontSize: 30,
    textAlign:'center',
    borderRadius: 50,
    elevation: 5,
    opacity: 1,
  },
  buttonview: {
    margin:20
  },
});
