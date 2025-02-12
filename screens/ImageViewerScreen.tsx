import React, { useEffect, useState } from 'react';
import { View, FlatList, Image, StyleSheet, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Button from '../components/Button';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../App';

type ImageViewerNavigationProp = StackNavigationProp<RootStackParamList, 'ImageViewer'>;

type Props = {
  route: { params: { initialIndex: number } };
  navigation: ImageViewerNavigationProp;
};

const ImageViewerScreen: React.FC<Props> = ({ route, navigation }) => {
  const { initialIndex } = route.params;
  const [photos, setPhotos] = useState<{ uri: string }[]>([]);

  useEffect(() => {
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
    loadPhotos();
  }, []);

  const renderItem = ({ item }: { item: { uri: string } }) => (
    <View style={styles.imageContainer}>
      <Image source={{ uri: item.uri }} style={styles.fullImage} resizeMode="contain" />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={photos}
        horizontal
        pagingEnabled
        initialScrollIndex={initialIndex}
        keyExtractor={(_, index) => index.toString()}
        renderItem={renderItem}
        showsHorizontalScrollIndicator={false}
        getItemLayout={(_, index) => ({
          length: Dimensions.get('window').width,
          offset: Dimensions.get('window').width * index,
          index,
        })}
      />
      <Button title="Back to Gallery" onPress={() => navigation.goBack()} containerStyle={styles.buttonSpacing} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#000', 
    justifyContent: 'center' 
  },
  imageContainer: { 
    width: Dimensions.get('window').width, 
    alignItems: 'center', 
    justifyContent: 'center' 
  },
  fullImage: { 
    width: Dimensions.get('window').width, 
    height: Dimensions.get('window').height * 0.7 
  },
  buttonSpacing: { 
    marginVertical: 16, 
    alignSelf: 'center' 
  },
});

export default ImageViewerScreen;
