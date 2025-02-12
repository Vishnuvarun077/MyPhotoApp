
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, Image, TouchableOpacity, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Button from '../components/Button';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../App';

type GalleryScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Gallery'>;
type PhotoItem = { uri: string };

type Props = {
  navigation: GalleryScreenNavigationProp;
};

const GalleryScreen: React.FC<Props> = ({ navigation }) => {
  const [photos, setPhotos] = useState<PhotoItem[]>([]);

  const loadPhotos = async () => {
    try {
      const storedPhotos = await AsyncStorage.getItem('photos');
      if (storedPhotos) {
        setPhotos(JSON.parse(storedPhotos));
      }
    } catch (error) {
      console.error('Error loading photos:', error);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', loadPhotos);
    return unsubscribe;
  }, [navigation]);

  // Render thumbnail items in a grid
  const renderItem = ({ item, index }: { item: PhotoItem; index: number }) => (
    <TouchableOpacity onPress={() => navigation.navigate('ImageViewer', { initialIndex: index })}>
      <Image source={{ uri: item.uri }} style={styles.thumbnail} />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={photos}
        keyExtractor={(_, index) => index.toString()}
        renderItem={renderItem}
        numColumns={3}
        contentContainerStyle={styles.grid}
      />
      <Button title="Back to Main Page" onPress={() => navigation.navigate('Camera')} containerStyle={styles.buttonSpacing} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    paddingHorizontal: 8,
    paddingVertical: 16, 
    backgroundColor: '#fff' 
  },
  grid: { paddingBottom: 20 },
  thumbnail: {
    width: Dimensions.get('window').width / 3 - 12,
    height: Dimensions.get('window').width / 3 - 12,
    marginHorizontal: 4,
    marginBottom: 8,
    borderRadius: 8,
    backgroundColor: '#ccc',
  },
  buttonSpacing: { 
    marginVertical: 16, 
    alignSelf: 'center' 
  },
});

export default GalleryScreen;
 