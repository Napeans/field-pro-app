import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
  PermissionsAndroid,
  Platform,
  ScrollView,
} from 'react-native';
import { launchCamera, launchImageLibrary, CameraOptions, ImageLibraryOptions } from 'react-native-image-picker';
import { Colors } from '../theme/GlobalStyles';

type ImageUploaderProps = {
  images?: string[];
  onChange: (images: string[]) => void;
  maxImages?: number;
  label?: string;
};

const ImageUploader: React.FC<ImageUploaderProps> = ({ images = [], onChange, maxImages = 3, label }) => {
  const remaining = Math.max(0, maxImages - images.length);

  const openLibrary = () => {
    if (remaining <= 0) return;
    const options: ImageLibraryOptions = { mediaType: 'photo', selectionLimit: remaining };
    launchImageLibrary(options, (res) => {
      if (res.didCancel) return;
      if (res.errorCode) {
        Alert.alert('Error', res.errorMessage || 'Unable to select image');
        return;
      }
      const uris = (res.assets || [])
        .map(a => a.uri)
        .filter(Boolean) as string[];
      if (uris.length) onChange([...images, ...uris]);
    });
  };

  const openCamera = async () => {
    if (remaining <= 0) return;
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA);
      if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
        Alert.alert('Permission required', 'Camera permission is required to take photos');
        return;
      }
    }
    const options: CameraOptions = { mediaType: 'photo', quality: 0.8 };
    launchCamera(options, (res) => {
      if (res.didCancel) return;
      if (res.errorCode) {
        Alert.alert('Error', res.errorMessage || 'Unable to take photo');
        return;
      }
      const uris = (res.assets || [])
        .map(a => a.uri)
        .filter(Boolean) as string[];
      if (uris.length) onChange([...images, ...uris]);
    });
  };

  const addImage = () => {
    Alert.alert('Add image', `Add up to ${remaining} more`, [
      { text: 'Camera', onPress: openCamera },
      { text: 'Gallery', onPress: openLibrary },
      { text: 'Cancel', style: 'cancel' },
    ]);
  };

  const removeAt = (index: number) => {
    const next = images.filter((_, i) => i !== index);
    onChange(next);
  };

  return (
    <View style={styles.container}>
      {label ? <Text style={styles.label}>{label}</Text> : null}

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.row}>
        {images.map((uri, i) => (
          <View key={uri + i} style={styles.thumbWrap}>
            <Image source={{ uri }} style={styles.thumb} />
            <TouchableOpacity style={styles.removeBtn} onPress={() => removeAt(i)}>
              <Text style={styles.removeTxt}>✕</Text>
            </TouchableOpacity>
          </View>
        ))}

        {images.length < maxImages && (
          <TouchableOpacity style={styles.addBtn} onPress={addImage}>
            <Text style={styles.addTxt}>＋</Text>
            <Text style={styles.addLabel}>Add</Text>
          </TouchableOpacity>
        )}
      </ScrollView>

      <Text style={styles.hint}>{images.length}/{maxImages} uploaded</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginBottom: 12 },
  label: { fontSize: 14, fontWeight: '600', color: '#111', marginBottom: 8 },
  row: { alignItems: 'center' },
  thumbWrap: { marginRight: 10, position: 'relative' },
  thumb: { width: 90, height: 90, borderRadius: 8, backgroundColor: '#eee' },
  removeBtn: { position: 'absolute', top: -6, right: -6, backgroundColor: '#fff', borderRadius: 12, width: 24, height: 24, justifyContent: 'center', alignItems: 'center', elevation: 2, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 4 },
  removeTxt: { color: '#d32f2f', fontWeight: '700' },
  addBtn: { width: 90, height: 90, borderRadius: 8, borderWidth: 1, borderStyle: 'dashed', borderColor: Colors.PRIMARY_BLUE, justifyContent: 'center', alignItems: 'center', marginRight: 10, backgroundColor: '#f8faf8' },
  addTxt: { fontSize: 28, color: Colors.PRIMARY_BLUE, lineHeight: 28 },
  addLabel: { color: Colors.PRIMARY_BLUE, fontSize: 12, fontWeight: '600' },
  hint: { marginTop: 6, fontSize: 12, color: '#666' },
});

export default ImageUploader;
