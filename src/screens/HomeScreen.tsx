import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  TouchableOpacity,
  PermissionsAndroid,
  Platform,
  Alert,
  Linking,
} from 'react-native';
import { Colors } from '../theme/GlobalStyles';
import { BellAlertIcon,ArrowLeftIcon } from "react-native-heroicons/solid";
const HomeScreen: React.FC = () => {
 

  return (
      <View style={[{backgroundColor:'white'}]}>
      <View
    style={{
      width: '100%',
      height: 65,
      backgroundColor: Colors.PRIMARY_BLUE,
      paddingHorizontal: 15
    }}
  >
    <View style={{marginTop: 20, flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',}}>
    <TouchableOpacity
      style={{ width: 44, height: '100%', justifyContent: 'center', alignItems: 'flex-start' }}
      activeOpacity={0.7}
    >
      <ArrowLeftIcon size={28} color="white" />
    </TouchableOpacity>

    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ color: 'white', fontSize: 18, fontWeight: '600' }}>Home</Text>
    </View>

    <TouchableOpacity
      style={{ width: 44, height: '100%', justifyContent: 'center', alignItems: 'flex-end' }}
      activeOpacity={0.7}
    >
      <BellAlertIcon size={28} color="white" />
    </TouchableOpacity>
    </View>
  </View>

      
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 20,
  },
  locationText: {
    fontSize: 16,
    marginTop: 10,
  },
});
