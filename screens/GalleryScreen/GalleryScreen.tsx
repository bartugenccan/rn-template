import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Alert,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import { CustomText } from '@/components';
import { useAppNavigation } from '@/hooks';
import { AppRoutes } from '@/types/navigation/routes';
import { getSavedImages, deleteImage, getFileUri } from '@/utils/storage';
import { verticalScale, scale } from 'react-native-size-matters';

export const GalleryScreen = () => {
  const navigation = useAppNavigation();
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadImages = async () => {
    try {
      const savedImages = await getSavedImages();
      setImages(savedImages);
    } catch (error) {
      Alert.alert('Error', 'Failed to load images');
      console.error(error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      loadImages();
    });

    loadImages();

    return unsubscribe;
  }, [navigation]);

  const handleDelete = (uri: string) => {
    Alert.alert('Delete Image', 'Are you sure you want to delete this image?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          try {
            await deleteImage(uri);
            await loadImages();
          } catch (error) {
            Alert.alert('Error', 'Failed to delete image');
          }
        },
      },
    ]);
  };

  const renderItem = ({ item }: { item: string }) => (
    <View style={styles.imageContainer}>
      <Image source={{ uri: getFileUri(item) }} style={styles.image} />
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => handleDelete(item)}
        activeOpacity={0.7}>
        <CustomText fontFamily="regular" style={styles.deleteButtonText}>
          Delete
        </CustomText>
      </TouchableOpacity>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <CustomText fontFamily="bold" style={styles.title}>
          My Wardrobe
        </CustomText>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate(AppRoutes.CAMERA)}>
          <CustomText fontFamily="regular" style={styles.addButtonText}>
            + Add Item
          </CustomText>
        </TouchableOpacity>
      </View>

      {images.length === 0 ? (
        <View style={styles.emptyContainer}>
          <CustomText fontFamily="regular" style={styles.emptyText}>
            No clothing items yet
          </CustomText>
          <TouchableOpacity
            style={styles.emptyButton}
            onPress={() => navigation.navigate(AppRoutes.CAMERA)}>
            <CustomText fontFamily="regular" style={styles.emptyButtonText}>
              Capture Your First Item
            </CustomText>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={images}
          renderItem={renderItem}
          keyExtractor={(item, index) => `${item}-${index}`}
          numColumns={2}
          contentContainerStyle={styles.listContent}
          columnWrapperStyle={styles.row}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={loadImages} />
          }
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  title: {
    fontSize: 24,
    color: '#000',
  },
  addButton: {
    backgroundColor: '#007AFF',
    paddingVertical: verticalScale(8),
    paddingHorizontal: scale(15),
    borderRadius: 8,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 14,
  },
  listContent: {
    padding: 10,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  imageContainer: {
    width: '48%',
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 10,
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  deleteButton: {
    backgroundColor: '#ff3b30',
    paddingVertical: verticalScale(8),
    alignItems: 'center',
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 12,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyText: {
    fontSize: 18,
    color: '#999',
    marginBottom: 20,
    textAlign: 'center',
  },
  emptyButton: {
    backgroundColor: '#007AFF',
    paddingVertical: verticalScale(15),
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  emptyButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

