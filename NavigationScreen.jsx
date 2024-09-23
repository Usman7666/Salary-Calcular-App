import {View, Text, Image, TouchableOpacity} from 'react-native';
import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AddEmployeeForm from './screens/AddEmployeeForm';
import MainPage from './screens/MainPage';
import EmployeeList from './screens/EmployeeList';
import Employeedetail from './screens/Employeedetail';
import SalaryList from './screens/Salary/Salary';
import Salarycalculator from './screens/Salary/Salarycalculator';
import TotalSalary from './screens/Salary/TotalSalary';
import Login from './screens/LoginPages/Login';
import Signup from './screens/LoginPages/Signup';
import Monthdate from './screens/Datemonth';
import LogoutPage from './screens/LoginPages/Logout';

export default function Navigation() {

  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen name="LoginPage"
        options={{
          headerShown:false
        }} component={Login}/>
       <Stack.Screen
        name="SignUp" component={Signup}
        options={{
          headerShown:false
        }}
        />
        <Stack.Screen
          name=" "
          component={MainPage}
          options={{
            headerShown: true,
            headerRight:()=><LogoutPage/>
           
          }}
        />  
        <Stack.Screen name='Weekdate'  component={Monthdate}/>
        <Stack.Screen name="Employee_Form" component={AddEmployeeForm} />
        <Stack.Screen name="Employee_List" component={EmployeeList} />
        <Stack.Screen name="Employee_Details" component={Employeedetail} />
        <Stack.Screen name="Salary_List" component={SalaryList} />
        <Stack.Screen name="Salary_Calculator" component={Salarycalculator} />
        <Stack.Screen name="Total_Salary" component={TotalSalary} />  
      </Stack.Navigator>
    </NavigationContainer>
  );
}
