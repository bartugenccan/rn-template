import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  Image,
  ScrollView,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { CustomText } from '@/components';
import { useAppNavigation } from '@/hooks';
import { AppRoutes } from '@/types/navigation/routes';
import { saveImage } from '@/utils/storage';
import { verticalScale } from 'react-native-size-matters';

export const CameraScreen = () => {
  const navigation = useAppNavigation();
  const [loading, setLoading] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);

  const requestPermissions = async () => {
    const { status: cameraStatus } = await ImagePicker.requestCameraPermissionsAsync();
    const { status: mediaStatus } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (cameraStatus !== 'granted' || mediaStatus !== 'granted') {
      Alert.alert(
        'Permissions Required',
        'Camera and media library permissions are required to capture photos.',
      );
      return false;
    }
    return true;
  };

  const takePhoto = async () => {
    const hasPermission = await requestPermissions();
    if (!hasPermission) return;

    try {
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        setCapturedImage(result.assets[0].uri);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to take photo');
      console.error(error);
    }
  };

  const pickFromGallery = async () => {
    const hasPermission = await requestPermissions();
    if (!hasPermission) return;

    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        setCapturedImage(result.assets[0].uri);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to pick image');
      console.error(error);
    }
  };

  const savePhoto = async () => {
    if (!capturedImage) return;

    setLoading(true);
    try {
      await saveImage(capturedImage);
      Alert.alert('Success', 'Photo saved to wardrobe!', [
        {
          text: 'OK',
          onPress: () => {
            setCapturedImage(null);
            navigation.navigate(AppRoutes.GALLERY);
          },
        },
      ]);
    } catch (error) {
      Alert.alert('Error', 'Failed to save photo');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.header}>
        <CustomText fontFamily="bold" style={styles.title}>
          Capture Clothing Item
        </CustomText>
      </View>

      {capturedImage ? (
        <View style={styles.previewContainer}>
          <Image source={{ uri: capturedImage }} style={styles.previewImage} />
          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={[styles.button, styles.cancelButton]}
              onPress={() => setCapturedImage(null)}>
              <CustomText fontFamily="regular" style={styles.cancelButtonText}>
                Retake
              </CustomText>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.saveButton]}
              onPress={savePhoto}
              disabled={loading}>
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <CustomText fontFamily="regular" style={styles.saveButtonText}>
                  Save
                </CustomText>
              )}
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View style={styles.captureContainer}>
          <TouchableOpacity style={styles.captureButton} onPress={takePhoto}>
            <CustomText fontFamily="bold" style={styles.captureButtonText}>
              Take Photo
            </CustomText>
          </TouchableOpacity>

          <TouchableOpacity style={styles.galleryButton} onPress={pickFromGallery}>
            <CustomText fontFamily="regular" style={styles.galleryButtonText}>
              Choose from Gallery
            </CustomText>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    padding: 20,
  },
  header: {
    marginBottom: 30,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    color: '#000',
  },
  captureContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: verticalScale(20),
    marginTop: 50,
  },
  captureButton: {
    backgroundColor: '#007AFF',
    paddingVertical: verticalScale(15),
    paddingHorizontal: 40,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
  },
  captureButtonText: {
    color: '#fff',
    fontSize: 18,
  },
  galleryButton: {
    backgroundColor: '#f0f0f0',
    paddingVertical: verticalScale(15),
    paddingHorizontal: 40,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
  },
  galleryButtonText: {
    color: '#000',
    fontSize: 16,
  },
  previewContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  previewImage: {
    width: '100%',
    height: 400,
    borderRadius: 10,
    marginBottom: 20,
    resizeMode: 'contain',
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 15,
    width: '100%',
  },
  button: {
    flex: 1,
    paddingVertical: verticalScale(15),
    borderRadius: 10,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#f0f0f0',
  },
  cancelButtonText: {
    color: '#000',
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: '#007AFF',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

