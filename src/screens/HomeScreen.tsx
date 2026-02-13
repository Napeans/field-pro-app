import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  PermissionsAndroid,
  Platform,
  Alert,
  Linking,
} from 'react-native';
import Geolocation from 'react-native-geolocation-service';

const HomeScreen: React.FC = () => {
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);

  // 🔹 Request Permission
  const requestLocationPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Permission',
            message: 'App needs access to your location',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          }
        );

        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          return true;
        }

        if (granted === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
          Alert.alert(
            'Permission Required',
            'Location permission was permanently denied. Please enable it from settings.',
            [
              { text: 'Cancel', style: 'cancel' },
              { text: 'Open Settings', onPress: () => Linking.openSettings() },
            ]
          );
        }

        return false;
      } catch (err) {
        console.warn(err);
        return false;
      }
    }
    return true;
  };

  // 🔹 Get Location
  const handleLocationPress = async () => {
    const hasPermission = await requestLocationPermission();
    if (!hasPermission) return;

    Geolocation.getCurrentPosition(
      (position) => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
      },
      (error) => {
        Alert.alert('Error', error.message);
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 10000,
        forceRequestLocation: true,
        showLocationDialog: true,
      }
    );
  };

  return (
      <View style={[styles.container,{backgroundColor:'white'}]}>
      <Button title="Get Location" onPress={handleLocationPress} />

      <Text style={styles.text}>🏠 Home</Text>

      <Text style={styles.locationText}>
        Latitude: {latitude ?? 'Not Available'}
      </Text>

      <Text style={styles.locationText}>
        Longitude: {longitude ?? 'Not Available'}
      </Text>
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
