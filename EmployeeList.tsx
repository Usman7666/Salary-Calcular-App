import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ImageBackground,
  Image,
  TextInput,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';

import database from '@react-native-firebase/database';

export default function EmployeeList(props) {
  const [input, setinput] = useState('');

  const handleemployeedetail = item => {
    props.navigation.navigate('Employee_Details', {item});
  };
  const [list, setlist] = useState(null);
  useEffect(() => {
    EmployeeList();
  }, []);
  const EmployeeList = async () => {
    try {
      const data = await database()
        .ref('EmployeeForm')
        .on('value', tempdata => {
          setlist(tempdata.val());
        });
      console.log(data);
    } catch (error) {
      console.warn(error);
    }
  };
  return (
    <ImageBackground
      source={require('../assets/HR-Tech-startups.png')}
      resizeMode="cover"
      style={styles.backimg}>
      {/* SearchBar */}
      <View style={styles.innerview}>
        <TextInput
          value={input}
          onChangeText={text => setinput(text)}
          style={{fontSize: 20,height:'100%',width:'90%'}}
          placeholder="Search"
        />
        <Image
          style={{height: 25, width: 25}}
          source={require('./Salary/assets/icon.png')}
        />
      </View>

      <View style={{flex: 1}}>
        <FlatList
          data={list}
          renderItem={item => {
            if (item.item !== null) {
              if(input === ''){
              return (
                <TouchableOpacity
                  style={styles.items}
                  onPress={() => handleemployeedetail(item.item)}>
                  <Text style={styles.itemtext}>
                    <Text>ID: {item.item.id} ||</Text>{item.item.name}
                  </Text>
                </TouchableOpacity>
              );
              }
              if(item.item.name.toLowerCase().includes(input.toLowerCase())){
                return(
                <TouchableOpacity
                style={styles.items}
                onPress={() => handleemployeedetail(item.item)}>
                <Text style={styles.itemtext}>
                  <Text>ID: {item.item.id} ||</Text>{item.item.name}
                </Text>
              </TouchableOpacity>
                )
              }
            }
          }}
        />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  items: {
    backgroundColor: 'skyblue',
    height: 60,
    margin: 10,
    borderRadius: 8,
    elevation: 1,
    opacity: 10,
    //flex:1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemtext: {
    //marginLeft: 20,
    fontSize: 25,
    color: 'black',
  },
  backimg: {
    flex: 1,
    justifyContent: 'center',
  },
  innerview: {
    padding: 6,
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 10,
    backgroundColor: '#d9dbda',
    borderRadius: 20,
    alignItems: 'center',
  },
});
