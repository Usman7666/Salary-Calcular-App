import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import React, { useState } from 'react';
import auth from '@react-native-firebase/auth';
import { StackActions, useNavigation } from '@react-navigation/native';

const Login = (props) => {
  
  const navigation = useNavigation()
  const [email,setemail] = useState('')
  const [password,setpassword] = useState('')
  const [message, setmessage] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };
  const handleLoginData=async()=>{
    try {
      if(email.length>0 && password.length>0){
      const user = await auth().signInWithEmailAndPassword(
        email,
       password 
     )
    if (await user.user.emailVerified){
      navigation.dispatch(StackActions.replace("Weekdate"))
    }
    else{
      alert("Verify your Email first")
      await auth().currentUser?.sendEmailVerification()
      await auth().signOut();
    }
  }
     else{
      alert("Enter the details first")
     }
    } catch (error) {
      setmessage(error.message)
    }
  
  }
  return (
    <View style={styles.main}>
      <Text style={styles.logintext}>Welcome! Admin</Text>
      <TextInput style={styles.inputs} placeholder="Enter Email or Phone" 
      onChangeText={(text)=>setemail(text)}/>
      <View style={styles.container}>
      <TextInput style={styles.passwordinput} placeholder="Enter password" 
      onChangeText={(text)=>setpassword(text)}
      secureTextEntry={!isPasswordVisible}
      />
       <TouchableOpacity onPress={togglePasswordVisibility} style={styles.toggleButton}>
        <Text>{isPasswordVisible ? 'Hide' : 'Show'}</Text>
      </TouchableOpacity>
    </View>
      <Text>{message}</Text>
      <TouchableOpacity style={styles.opacitiy}
      onPress={handleLoginData}
      >
        <Text style={styles.text}>Login</Text>
      </TouchableOpacity>
      <View style={styles.Signupview}>
        <Text style={styles.acctext}>Don't have an account?</Text>
      <TouchableOpacity onPress={()=>props.navigation.navigate("SignUp")}>
        <Text style={styles.signuptext}>Create an account</Text>
      </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: 'center',
  },
  logintext: {
    marginBottom: 30,
    fontSize: 30,
    textAlign: 'center',
  },
  inputs: {
    margin: 10,
    padding: 10,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius:15,
    backgroundColor:'#d9dbda'
  },
  opacitiy:{
    backgroundColor:'darkblue',
    borderRadius:15,
    padding:10,
    margin:15
  },
  text:{
    color:'white',
    textAlign:'center',
    fontSize:20,
    fontWeight:'bold'
  },
  Signupview:{
    flexDirection:'row',
    justifyContent:'center',
    margin:5
  },
  acctext:{
    fontSize:16
  },
  signuptext:{
    fontSize:16,
    fontWeight:'bold',
    color:'red'
  },
  container:{
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius:15,
    backgroundColor:'#d9dbda',
    margin:10
  },
  passwordinput: {
    flex: 1,
    padding: 10,
  },
  toggleButton: {
    padding: 10,
  },
});
export default Login;
