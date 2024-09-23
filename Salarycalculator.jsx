import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Button,
  ScrollView,
  StyleSheet,
} from 'react-native';
import React, {useState} from 'react';
import database from '@react-native-firebase/database';

const Salarycalculator = props => {
  const [dayswork, setdayswork] = useState(0);
  const [Overtimehours, setOvertimehours] = useState(0);
  const [Latetimehours, setLatetimehours] = useState(0);
  const [previousweekpay, setpreviousweekpay] = useState(0);
  const [Advance, setAdvance] = useState(0);
  const [Kharcha, setKharcha] = useState(0);
  const [Totalsalary, setTotalsalary] = useState(0);
  const [handemployee, sethandemployee] = useState(0);
  const [display, setdisplay] = useState(false);
  const {item} = props.route.params;

  
  const Pay = item.Per_Day_Pay * dayswork;
  const OverTime = 0.1 * Overtimehours * item.Per_Day_Pay;
  const OVERTIME = OverTime.toFixed();
  const After_Over_Time_Add = Pay + OverTime;
  const LateTime = Pay - 0.1 * item.Per_Day_Pay * Latetimehours + OverTime;
  const LATETIME = LateTime.toFixed();
  const After_Deduction_Salary = previousweekpay - Kharcha - Advance;
  const Salary = LateTime + After_Deduction_Salary;
 const SALARY = Salary.toFixed();
  const Total_Advance = handemployee - Totalsalary;
const TOTAL_ADVANCE = Total_Advance.toFixed();
  const Remainig_Pay = Totalsalary - handemployee;
const REMINING_PAY = Remainig_Pay.toFixed();
const TOTAL_SALARY = Totalsalary.toFixed();
  const UploadEmployeeSalary = async () => {
    try {
      const response = await database().ref(`EmployeeForm/${item.id}`).update({
        Days_Work: dayswork,
        Pay: Pay,
        OverTime_Hour: Overtimehours,
        OverTime_Pay: OVERTIME,
        After_OverTime_Add: After_Over_Time_Add,
        Late_Time_Hours: Latetimehours,
        After_Late_Time_Deduction: LATETIME,
        Previous_week_pay: previousweekpay,
        Advance: Advance,
        Kharcha: Kharcha,
        After_Deduction_Salary: SALARY,
        Hand_Employee_Pay: handemployee,
        Total_Salary: TOTAL_SALARY,
        Total_Advance: TOTAL_ADVANCE,
        Remainig_Pay: REMINING_PAY,
      });
      props.navigation.navigate('Salary_List');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ScrollView>
      <View style={style.main}>
        <View style={{flexDirection:'row',flexWrap:'wrap' ,borderColor:'black',justifyContent:'space-evenly'}}>
        <Text style={style.text}>{item.name} </Text>
        <Text style={style.text}>S/O: {item.Father_Name}</Text>
        </View>
        <Text style={{fontSize: 30,color:'green',textAlign:'center'}}>Calculate Pay</Text>
        <Text style={style.text}>Days Work :</Text>
        <TextInput
          placeholder="Days Work"
          value={dayswork}
          onChangeText={text => setdayswork(text)}
          style={style.textinput}
        />
       <Button title='Generate Salary' color={'green'} onPress={()=>setdisplay(true)}/>
        {display ? (
          <Text style={style.paytext}>Pay :{Pay}</Text>
        ) : (
          <Text style={style.paytext}>Pay : {item.Per_Day_Pay}</Text>
        )}

        {/* Calculate OverTime */}
        <Text style={style.text}>Calculate Overtime :</Text>
        <TextInput
          placeholder="OverTime Hours"
          value={Overtimehours}
          onChangeText={text => setOvertimehours(text)}
          style={style.textinput}
        />
        {display ? (
          <Text style={style.paytext}>OverTime Pay:{OVERTIME}</Text>
        ) : (
          <Text style={style.paytext}>OverTime Pay : 0</Text>
        )}

        {/* Calculate LateTime */}
        <Text style={style.text}>Calculate LateTime :</Text>
        <TextInput
          placeholder="LateTime Hours"
          value={Latetimehours}
          onChangeText={text => setLatetimehours(text)}
          style={style.textinput}
        />
        {display ? (
          <Text style={style.paytext}>
            After_LateTime Deduction:{LATETIME}
          </Text>
        ) : (
          <Text style={style.paytext}>
            After_LateTime Deduction : 0
          </Text>
        )}
        {/* Previous Week Pay */}
        <Text style={style.text}>Previous_Week_Pay :</Text>
        <TextInput
          placeholder="Enter Previous_Week_Pay"
          value={previousweekpay}
          onChangeText={text => setpreviousweekpay(text)}
          style={style.textinput}
        />

        {/*Advance*/}
        <Text style={style.text}>Advance :</Text>
        <TextInput
          placeholder="Enter Advance"
          value={Advance}
          onChangeText={text => setAdvance(text)}
          style={style.textinput}
        />
        {/*Kharcha*/}
        <Text style={style.text}>Kharcha :</Text>
        <TextInput
          placeholder="Enter Advance"
          value={Kharcha}
          onChangeText={text => setKharcha(text)}
          style={style.textinput}
        />

        {/* After Deductions Total Salary */}
        {display ? (
          <Text style={style.paytext}>After_Deduction_Salary:{SALARY}</Text>
        ) : (
          <Text style={style.paytext}>After_Deduction_Salary : 0</Text>
        )}
        <Button
        color={'green'}
          title="Calculate Total Salary"
          onPress={() => setTotalsalary(Salary)}
        />
        {Totalsalary > 0 && display ? (
          <Text style={style.paytext}>Total_Salary:{SALARY}</Text>
        ) : (
          <Text style={style.paytext}>Total_Salary : Salary is -</Text>
        )}

        {/* Hand Employee Pay */}
        <Text style={style.text}>Hand Employee pay :</Text>
        <TextInput
          placeholder="Hand Employee"
          value={handemployee}
          onChangeText={text => sethandemployee(text)}
          style={style.textinput}
        />
        {/* Advance */}
        {Totalsalary < handemployee && display ? (
          <Text style={style.advance}>Advance:{TOTAL_ADVANCE}</Text>
        ) : (
          <Text style={style.advance}>Advance is : 0</Text>
        )}

        {/* Remainig Pay */}
        {Totalsalary > handemployee && display ? (
          <Text style={style.remaining}>Remaining Pay:{REMINING_PAY}</Text>
        ) : (
          <Text style={style.remaining}>Remainig Pay : 0</Text>
        )}

        <TouchableOpacity 
        style={style.buttonview} onPress={UploadEmployeeSalary} >
          <Text style={style.button}>Generate Salary</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const style = StyleSheet.create({
  main:{
    backgroundColor:'white',
    flex:1
  },
  text:{
    color:'black',
    fontSize:20,
    
  },
  paytext:{
    color:'green',
    fontSize:23,
    textAlign:'center',
    margin:10,
  },
  textinput:{
    borderColor:'black',
    borderWidth:1,
    fontSize:18,
    margin:10
  },
  advance:{
    color:'red',
    fontSize:25,
  },
  remaining:{
    color:'blue',
    fontSize:25
  },
  button: {
    color: '#fff',
    backgroundColor: 'green',
    fontSize: 25,
    textAlign:'center',
    borderRadius: 50,
    elevation: 5,
    opacity: 1,
  },
  buttonview: {
    margin:20
  },

})
export default Salarycalculator;
