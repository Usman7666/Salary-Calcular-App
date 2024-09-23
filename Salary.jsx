import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ImageBackground,
  Button,
  Image,
  TextInput
} from 'react-native';
import React, {useEffect, useState} from 'react';
import database, {firebase} from '@react-native-firebase/database';
const SalaryList = (props) => {
  const [input, setinput] = useState('');
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

  const handlecalculator = (item)=>{
    props.navigation.navigate('Salary_Calculator',{item})
  }

  const handleSalary = (item)=>{
    props.navigation.navigate('Total_Salary',{item})
  }
  return (
    <ImageBackground
      source={require('../Salary/assets/Salaryback.png')}
      resizeMode="cover"
      style={styles.backimg}>
         {/* SearchBar */}
      <View style={styles.innerview}>
        <TextInput
          value={input}
          onChangeText={text => setinput(text)}
          style={{fontSize: 20, height:'100%',width:'90%'}}
          placeholder="Search"
        />
        <Image
          style={{height: 25, width: 25}}
          source={require('./assets/icon.png')}
        />
      </View>
      <View style={{flex: 1}}>
        <FlatList
          data={list}
          renderItem={item => {
            if (item.item !== null) {
              if(input === ''){
              return (
                <View style={styles.items}>
                  <Text style={styles.itemtext}>{item.item.name}</Text>
                  <TouchableOpacity style={styles.button} onPress={()=>handlecalculator(item.item)}>
                    <Text style={styles.buttontext1}>Calculate</Text>
                  </TouchableOpacity >
                  <TouchableOpacity style={styles.button} onPress={()=>handleSalary(item.item)}>
                    <Text style={styles.buttontext}>Salary</Text>
                  </TouchableOpacity>
                </View>
              );
               }
               if(item.item.name.toLowerCase().includes(input.toLowerCase())){
                return (
                  <View style={styles.items}>
                    <Text style={styles.itemtext}>{item.item.name}</Text>
                    <TouchableOpacity style={styles.button} onPress={()=>handlecalculator(item.item)}>
                      <Text style={styles.buttontext1}>Calculate</Text>
                    </TouchableOpacity >
                    <TouchableOpacity style={styles.button} onPress={()=>handleSalary(item.item)}>
                      <Text style={styles.buttontext}>Salary</Text>
                    </TouchableOpacity>
                  </View>
                );
               }
               }
          }}
        />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  items: {
    backgroundColor: '#000000c0',
    height: 70,
    margin: 5,
    borderRadius: 10,
    elevation: 1,
    opacity: 10,
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  itemtext: {
    marginVertical: 10,
    alignItems: 'center',
    fontSize: 30,
    color: '#fff',
    margin: 10,
  },
  backimg: {
    flex: 1,
    justifyContent: 'center',
  },
  button: {
    borderWidth: 3,
    borderColor: 'green',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
    borderRadius: 10,
  },
  buttontext: {
    color: '#fff',
    fontSize: 15,
  },
  buttontext1: {
    fontSize: 10,
    color: '#fff',
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

export default SalaryList;
