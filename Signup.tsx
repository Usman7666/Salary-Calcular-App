import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import React,{useState} from 'react';
import auth from '@react-native-firebase/auth'
const SignUpPage = (props) => {
  const [email,setemail] = useState('')
  const [password,setpassword] = useState('')
  const [message, setmessage] = useState('');
  const handleSignupauth =async()=>{
    try {
      if(email.length>0 && password.length>0 ){
      const response = await auth().createUserWithEmailAndPassword(email,password);
      await auth().currentUser?.sendEmailVerification();
      await auth().signOut();
     alert("Verify Your Email")
    }
    else{
      alert("Plz Enter the details")
    }
  } catch (error) {
      setmessage(error.message)
    }
  }
  return (
    <View style={styles.main}>
      <Text style={styles.logintext}>Register as Admin</Text>
      <TextInput style={styles.inputs} placeholder="Enter Email" 
      onChangeText={(text)=>setemail(text)}/>
      <TextInput style={styles.inputs} placeholder="Enter password" />
      <TextInput style={styles.inputs} placeholder="Confirm Your password" 
      onChangeText={(text)=>setpassword(text)}/>
      <Text>{message}</Text>
      <TouchableOpacity style={styles.opacitiy} 
      onPress={()=>handleSignupauth()}
      >
        <Text style={styles.text}>SignUp</Text>
      </TouchableOpacity>
      <View style={styles.Signupview}>
        <Text style={styles.acctext}>Already have an account?</Text>
      <TouchableOpacity onPress={()=>props.navigation.navigate('LoginPage')}>
        <Text style={styles.signuptext}>Login</Text>
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
  }
});
export default SignUpPage;
