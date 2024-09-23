import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import Auth from '@react-native-firebase/auth';
import {StackActions, useNavigation} from '@react-navigation/native';
import React from 'react';

const LogoutPage = () => {
  const navigation = useNavigation();
  return (
    <View style={{flexDirection: 'row'}}>
      <TouchableOpacity style={styles.createweek}
      onPress={()=>navigation.dispatch(StackActions.replace('Weekdate'))}
      >
        <Text style={{color: 'blue', fontSize: 15}}>Create!</Text>
        <Text style={styles.text}>New Week</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={async () => {
          await Auth().signOut();
          navigation.dispatch(StackActions.replace('LoginPage'));
        }}>
        <Image
          style={{height: 25, width: 25, marginTop: 10}}
          source={require('./assets/logout.png')}
        />
      </TouchableOpacity>
    </View>
  );
};

export default LogoutPage;

const styles = StyleSheet.create({
  createweek: {
    marginRight: 20,
  },
  text: {
    color: 'green',
    fontWeight: 'bold',
    fontSize: 20,
  },
});
