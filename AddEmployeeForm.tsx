import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Image
} from 'react-native';
import {StackActions, useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
type DestinationType = {
  code: string;
  name: string;
};

import database from '@react-native-firebase/database';
export default function AddEmployeeForm() {
  //Form Error
  const [nameerror,setnameerror]=useState(false);
  const [iderror,setiderror]=useState(false);
  const [fathernameerror,setfathernameerror]=useState(false);
  const [phoneerror,setphoneerror]=useState(false);

  //Destination Form
  const [openDropdown, setopenDropdown] = useState<boolean>(false);
  const [Destination, setDestination] = useState<DestinationType[]>([
    {code: 'Man', name: 'Manager'},
    {code: 'Sup', name: 'Supervisor'},
    {code: 'QuC', name: 'QualityChecker'},
    {code: 'Empl', name: 'Employee'},
    {code: 'Guar', name: 'Guard'},
  ]);
  const [selectedDestination, setselectedDestination] =
  useState<string>('Select Destination');
  //Destination Form

  const navigation = useNavigation();
  const [name, setname] = useState('');
  const [id, setid] = useState(0);
  const [fname, setfname] = useState('');
  const [age, setage] = useState('');
  const [email, setemail] = useState('');
  const [phone, setphone] = useState(0);
  const [adress, setadress] = useState('');
  const [AdCash, setAdCash] = useState(0);
  const [perdaysal, setperdaysal] = useState(0);
  const [perweeksal, setperweeksal] = useState(0);
  const [permonthsal, setpermonthsal] = useState(0);

  const [selectedradio,setselectedradio]= useState(1)
  const handleAddNewEmp = async () => {
    try {
      if(!name){
        setnameerror(true)
      }
      else{
        setnameerror(false)
      }
      if(!id){
        setiderror(true)
      }else{
        setiderror(false)
      }
      if(!fname){
        setfathernameerror(true)
      }else{
        setfathernameerror(false)
      }
      if(!phone){
        setphoneerror(true)
      }else{
        setphoneerror(false)
      }
      
      if(!name || !id || !fname || !phone){
        return false
      }
      const response = await database().ref(`EmployeeForm/${id}`).set({
        id: id,
        name: name,
        Father_Name: fname,
        age: age,
        email: email,
        Phone_Number: phone,
        Address: adress,
        Occupation: selectedDestination,
        Advance_Cash: AdCash,
        Per_Day_Pay: perdaysal,
        Weekly_Pay: perweeksal,
        Monthly_Pay: permonthsal,
        Gender  : selectedradio
      });

      navigation.dispatch(StackActions.replace('Employee_List'));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ScrollView style={styles.main}>
      <View>
        <Text
          style={{
            textAlign: 'center',
            fontSize: 30,
            fontWeight: 'bold',
            color: 'black',
          }}>
          Employee_Details
        </Text>
      </View>
      <View style={styles.idnameflex}>
      <View style={styles.viewstyle}>
        <Text style={styles.text}>ID</Text>
        <TextInput
          onChangeText={text => setid(text)}
          value={id}
          style={styles.textinput}
          placeholder="Enter ID"
        /> 
         {iderror?<Text style={{color:'red' ,fontSize:15}}> *Enter a valid ID</Text>:null}
      </View>
      <View style={styles.viewstyle}>
        <Text style={styles.text}>Name</Text>
        <TextInput
          onChangeText={text => setname(text)}
          value={name}
          style={styles.textinput}
          placeholder="   EnterName   "
        />
         {nameerror?<Text style={{color:'red',fontSize:15}}> *Enter a valid name</Text>:null}
      </View>
      </View>
      <View style={styles.viewstyle}>
        <Text style={styles.text}>Father_Name</Text>
        <TextInput
          onChangeText={text => setfname(text)}
          value={fname}
          style={styles.textinput}
          placeholder="Enter F_Name"
        />
        {fathernameerror?<Text style={{color:'red' ,fontSize:15}}> *Enter a valid Father_Name</Text>:null}
      </View>
      <View style={{flexDirection:'row'}}>
      <View style={styles.viewstyle}>
        <Text style={styles.text}>Age</Text>
        <TextInput
          onChangeText={text => setage(text)}
          value={age}
          style={styles.textinput}
          placeholder="Enter Age"
        />
      </View>
      {/* Radio Buttons */}
      
       
        <View >
        <Text style={styles.text}>Gender</Text>
      <View style={{flexDirection:'row',flexWrap:'wrap'}}>
      <TouchableOpacity onPress={()=>setselectedradio(1)}>
        <View style={styles.radioWrapper}>
            <View style={styles.radio}>
                {
                    selectedradio ===1 ? <View style={styles.radiobg}></View>:null
                }
            </View>
            <Text style={styles.radiotext}>Male</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={()=>setselectedradio(2)}>
        <View style={styles.radioWrapper}>
            <View style={styles.radio}>
            {
                    selectedradio ===2 ? <View style={styles.radiobg}></View>:null
            }
            </View>
            <Text style={styles.radiotext}>Female</Text>
        </View>
      </TouchableOpacity>
      </View>
    </View>
      </View>
       {/* Radio Buttons */}
      <View style={styles.viewstyle}>
        <Text style={styles.text}>Email</Text>
        <TextInput
          onChangeText={text => setemail(text)}
          value={email}
          style={styles.textinput}
          placeholder="Enter Email"
        />
        
      </View>
      <View style={styles.viewstyle}>
        <Text style={styles.text}>Phone_Number</Text>
        <TextInput
          onChangeText={text => setphone(text)}
          value={phone}
          style={styles.textinput}
          placeholder="Enter Phone_Number"
        />
        {phoneerror?<Text style={{color:'red' ,fontSize:15}}> *Enter a valid Phone_Number</Text>:null}
      </View>
      <View style={styles.viewstyle}>
        <Text style={styles.text}>Address</Text>
        <TextInput
          onChangeText={text => setadress(text)}
          value={adress}
          style={styles.textinput}
          placeholder="Enter Address"
        />
      </View>

      {/*Horizontal Line */}
      <View
        style={{borderBottomColor: 'black', borderWidth: 1, margin: 8}}></View>
      {/*Horizontal Line */}
      <View>
        <Text
          style={{
            textAlign: 'center',
            fontSize: 30,
            fontWeight: 'bold',
            color: 'black',
          }}>
          For_Company_Details
        </Text>
      </View>

      {/* Company Details */}
      {/* Destination Form */}
      <View style={{justifyContent:'center'}}>
        <Text style={styles.text}>Destination</Text>
      <View
        style={{
          width: '100%',
          height: 55,
          borderWidth: 1,
          borderRadius: 10,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingLeft: 15,
          paddingRight: 15,
        }}>
        <Text style={{fontSize: 16}}>{selectedDestination}</Text>
        <TouchableOpacity
          onPress={() => {
            setopenDropdown(!openDropdown);
          }}>
          <Image
            source={require('./Salary/assets/dropdown.png')}
            style={{width: 20, height: 20, tintColor: '#000'}}
          />
        </TouchableOpacity>
      </View>
      {openDropdown && (
        <View
          style={{
            width: '90%',
            height: 200,
            backgroundColor: 'white',
            elevation: 5,
            marginTop: 20,
            borderRadius: 10,
          }}>
          <FlatList
            data={Destination}
            renderItem={({item, index}) => {
              return (
                <TouchableOpacity
                  style={{
                    width: '90%',
                    alignSelf: 'center',
                    height: 40,
                    borderBottomWidth: 0.3,
                    justifyContent: 'center',
                    borderBottomColor: '#9e9e9e',
                  }}
                  onPress={() => {
                    setselectedDestination(item.name);
                    setopenDropdown(false);
                  }}>
                  <Text style={{color: '#000'}}>{item.name}</Text>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      )}
    </View>
      {/* Destination From */}
      <View style={{flexDirection:'row',flexWrap:'wrap',justifyContent:'space-around'}}>
      <View style={styles.viewstyle}>
        <Text style={styles.text}>Advance Cash</Text>
        <TextInput
          onChangeText={text => setAdCash(text)}
          value={AdCash}
          style={styles.textinput}
          placeholder="Enter Advance"
        />
      </View>

      <View style={styles.viewstyle}>
        <Text style={styles.text}>Per_Day_Pay</Text>
        <TextInput
          onChangeText={text => setperdaysal(text)}
          value={perdaysal}
          style={styles.textinput}
          placeholder="Enter Pay"
        />
      </View>
      <View style={styles.viewstyle}>
        <Text style={styles.text}>Weekly_Pay</Text>
        <TextInput
          onChangeText={text => setperweeksal(text)}
          value={perweeksal}
          style={styles.textinput}
          placeholder="Enter Pay"
        />
      </View>
      <View style={styles.viewstyle}>
        <Text style={styles.text}>Monthly_Pay</Text>
        <TextInput
          onChangeText={text => setpermonthsal(text)}
          value={permonthsal}
          style={styles.textinput}
          placeholder="Enter Pay"
        />
      </View>
      </View>
      <View>
        <TouchableOpacity onPress={handleAddNewEmp}>
          <Text style={styles.touchable}>ADD NEW EMPLOYEE</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#ccc',
  },
  idnameflex:{
    flex:1,
    flexDirection:'row',
    justifyContent:'space-around'
  },
  text: {
    color: 'black',
    fontSize: 20,
    fontWeight: '500',
    textAlign:'center'
  },
  textinput: {
    borderWidth: 1,
    borderRadius:10,
    borderColor: 'black',
    color: 'black',
    fontSize: 20,
  },
  viewstyle: {
    padding: 5,
    margin: 5,
  },
  touchable: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#ccc',
    textAlign: 'center',
    margin: 15,
    backgroundColor:'black',
    borderRadius: 30,
    padding: 20,
    elevation: 10,
    opacity: 1,
    shadowColor:'black'
  },
radiotext:{
    fontSize:20
},
radio:{
    height:40,
    width:40,
    borderColor:'black',
    borderWidth:2,
    borderRadius:20,
    margin:10
},
radioWrapper:{
    flexDirection:'row',
    alignItems:'center',
},
radiobg:{
    backgroundColor:'black',
    height:28,
    width:28,
    borderRadius:20,
    margin:4
}
});
