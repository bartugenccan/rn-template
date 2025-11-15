import * as FileSystem from 'expo-file-system/legacy';
import { Platform } from 'react-native';

const CLOTHING_DIR = `${FileSystem.documentDirectory}clothing/`;

/**
 * Initialize storage directory
 */
export const initStorage = async (): Promise<void> => {
  const dirInfo = await FileSystem.getInfoAsync(CLOTHING_DIR);
  if (!dirInfo.exists) {
    await FileSystem.makeDirectoryAsync(CLOTHING_DIR, { intermediates: true });
  }
};

/**
 * Save image to local storage
 */
export const saveImage = async (uri: string, filename?: string): Promise<string> => {
  await initStorage();
  
  const timestamp = Date.now();
  const extension = uri.split('.').pop() || 'jpg';
  const name = filename || `clothing_${timestamp}.${extension}`;
  const destination = `${CLOTHING_DIR}${name}`;
  
  await FileSystem.copyAsync({
    from: uri,
    to: destination,
  });
  
  return destination;
};

/**
 * Get all saved clothing images
 */
export const getSavedImages = async (): Promise<string[]> => {
  await initStorage();
  
  const files = await FileSystem.readDirectoryAsync(CLOTHING_DIR);
  return files
    .filter(file => /\.(jpg|jpeg|png|webp)$/i.test(file))
    .map(file => `${CLOTHING_DIR}${file}`);
};

/**
 * Delete an image
 */
export const deleteImage = async (uri: string): Promise<void> => {
  try {
    const fileInfo = await FileSystem.getInfoAsync(uri);
    if (fileInfo.exists) {
      await FileSystem.deleteAsync(uri);
    }
  } catch (error) {
    console.error('Error deleting image:', error);
  }
};

/**
 * Get file URI for display (handles platform differences)
 */
export const getFileUri = (path: string): string => {
  if (Platform.OS === 'ios') {
    return path.replace('file://', '');
  }
  return path;
};

