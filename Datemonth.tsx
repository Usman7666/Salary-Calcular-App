import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import DateTimePicker from 'react-native-modal-datetime-picker';
import database from '@react-native-firebase/database';
const Monthdate = (props) => {

  const handleWeekdate = async()=>{
    try {
    if (selecteddate !== null){
      const response = await database().ref('Week date').set({
        WeekStartDate : selecteddate,
        Endselectdate : Endselectdate
      })
      //console.log(response);
    }
    else{
      console.warn("Fill first");
      
    }
    } catch (error) {
      console.log(error);
      
    }
    props.navigation.navigate(' ')
  }

  const [isdatepickerVisible, setdatepickerVisible] = useState(false);
  const [isEnddatepickerVisible, setEnddatepickerVisible] = useState(false);
  const [selecteddate, setSelectedDate] = useState('');
  const [Endselectdate, setEndSelectDate] = useState('');
  const showdatePicker = () => {
    setdatepickerVisible(true);
  };
  const hideshowdatePicker = () => {
    setdatepickerVisible(false);
  };
  const handleconfirmdate = date => {
    //console.warn('A date has been picked' , date);
    const dt = new Date(date);
    const x = dt.toISOString().split('T');
    const x1 = x[0].split('-');
    //console.log(x1[2]+'/'+x1[1]+'/'+x1[0]);
    setSelectedDate(x1[2]+'/'+x1[1]+'/'+x1[0]);
    hideshowdatePicker();
  };

  //End Date Pickers
  const EndshowdatePicker = () => {
    setEnddatepickerVisible(true);
  };
  const endhideshowdatePicker = () => {
    setEnddatepickerVisible(false);
  };
  const Endhandleconfirmdate = date => {
    //console.warn('A date has been picked' , date);
    const dt = new Date(date);
    const x = dt.toISOString().split('T');
    const x1 = x[0].split('-');
    //console.log(x1[2]+'/'+x1[1]+'/'+x1[0]);
    setEndSelectDate(x1[2]+'/'+x1[1]+'/'+x1[0]);
    endhideshowdatePicker();
  };
  return (
    <View style={styles.main}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Text style={styles.maintext}>Select</Text>
        <Text style={{fontSize: 35, marginLeft: 8, color: 'blue'}}>
          Week Date
        </Text>
      </View>

      <View>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity
            style={styles.opacitystyle}
            onPress={() => showdatePicker()}>
            <Text style={styles.datetext}>Start Date</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.opacitystyle}
            onPress={() => showdatePicker()}>
            <Text style={styles.datetext}>{selecteddate}</Text>
          </TouchableOpacity>
        </View>

        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity
            style={styles.opacitystyle}
            onPress={() => EndshowdatePicker()}>
            <Text style={styles.datetext}>End Date</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.opacitystyle}
            onPress={() => EndshowdatePicker()}>
            <Text style={styles.datetext}>{Endselectdate}</Text>
          </TouchableOpacity>
        </View>
      </View>

      <DateTimePicker
        isVisible={isdatepickerVisible}
        mode="date"
        onConfirm={handleconfirmdate}
        onCancel={hideshowdatePicker}
      />

      <DateTimePicker
        isVisible={isEnddatepickerVisible}
        mode="date"
        onConfirm={Endhandleconfirmdate}
        onCancel={endhideshowdatePicker}
      />

      <View>
        <TouchableOpacity onPress={handleWeekdate}>
          <Image
            source={require('./Salary/assets/nextpageicon.png')}
            style={styles.image}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Monthdate;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  maintext: {
    fontSize: 27,
    fontWeight: 'bold',
    color: 'purple',
  },
  opacitystyle: {
    borderColor: 'purple',
    borderWidth: 2,
    height: 80,
    width: '42%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    margin: 20,
    opacity: 10,
    shadowColor: 'purple',
  },
  datetext: {
    fontSize: 25,
    fontWeight: 'heavy',
    color: 'purple',
  },
  image: {
    height: 60,
    width: 60,
  },
});
