import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  Image,
  Platform,
  Alert,
} from 'react-native';
import { launchCamera, CameraOptions, Asset } from 'react-native-image-picker';
import { check, request, PERMISSIONS, RESULTS, openSettings } from 'react-native-permissions';

const ProfileScreen: React.FC = () => {
  const [photo, setPhoto] = useState<string | null>(null);

  const checkCameraPermission = async (): Promise<boolean> => {
    const permission =
      Platform.OS === 'ios'
        ? PERMISSIONS.IOS.CAMERA
        : PERMISSIONS.ANDROID.CAMERA;

    const status = await check(permission);

    switch (status) {
      case RESULTS.GRANTED:
        // ✅ Already allowed → do NOT ask again
        return true;

      case RESULTS.DENIED:
        // ⚠️ First time → ask permission
        const result = await request(permission);
        return result === RESULTS.GRANTED;

      case RESULTS.BLOCKED:
        // ❌ User selected "Don't ask again"
        Alert.alert(
          'Camera Permission Required',
          'Please enable camera access from settings',
          [
            { text: 'Cancel', style: 'cancel' },
        { text: 'Open Settings', onPress: () => openSettings() }
          ]
        );
        return false;

      default:
        return false;
    }
  };

  const openCamera = async () => {
    const allowed = await checkCameraPermission();
    if (!allowed) return;

    const options: CameraOptions = {
      mediaType: 'photo',
      quality: 1,
      saveToPhotos: true,
    };

    launchCamera(options, (response) => {
      if (response.didCancel) return;

      if (response.errorCode) {
        console.log('Camera Error:', response.errorMessage);
        return;
      }

      const asset: Asset | undefined = response.assets?.[0];
      setPhoto(asset?.uri || null);
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>🏠 PROFILE</Text>

      <View style={{ marginTop: 20 }}>
        <Button title="Open Camera" onPress={openCamera} />
      </View>

      {photo && <Image source={{ uri: photo }} style={styles.image} />}
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  image: {
    width: 250,
    height: 250,
    marginTop: 20,
    borderRadius: 15,
  },
});
