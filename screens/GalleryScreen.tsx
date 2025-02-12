// // MyPhotoApp/screens/GalleryScreen.tsx
// import React, { useEffect, useState } from 'react';
// import { View, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import Button from '../components/Button';
// import { StackNavigationProp } from '@react-navigation/stack';
// import { RootStackParamList } from '../App';

// type GalleryScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Gallery'>;

// type PhotoItem = {
//   uri: string;
// };

// type Props = {
//   navigation: GalleryScreenNavigationProp;
// };

// const GalleryScreen: React.FC<Props> = ({ navigation }) => {
//   const [photos, setPhotos] = useState<PhotoItem[]>([]);

//   const loadPhotos = async () => {
//     try {
//       const storedPhotos = await AsyncStorage.getItem('photos');
//       if (storedPhotos) {
//         setPhotos(JSON.parse(storedPhotos));
//       }
//     } catch (error) {
//       console.error('Error loading photos', error);
//     }
//   };

//   const renderItem = ({ item }: { item: PhotoItem }) => (
//     <TouchableOpacity onPress={() => navigation.navigate('Preview', { photoUri: item.uri })}>
//       <Image source={{ uri: item.uri }} style={styles.thumbnail} />
//     </TouchableOpacity>
//   );

//   useEffect(() => {
//     loadPhotos();
//   }, []);

//   return (
//     <SafeAreaView style={styles.container}>
//       <FlatList data={photos} keyExtractor={(_, index) => index.toString()} renderItem={renderItem} numColumns={3} />
//       <Button title="Back to Camera" onPress={() => navigation.navigate('Camera')} containerStyle={styles.buttonSpacing} />
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 16 },
//   thumbnail: { width: 100, height: 100, margin: 5, borderRadius: 8 },
//   buttonSpacing: { marginTop: 16 },
// });

// export default GalleryScreen;
// MyPhotoApp/screens/GalleryScreen.tsx
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Button from '../components/Button';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../App';

type GalleryScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Gallery'>;

type PhotoItem = {
  uri: string;
};

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

  const renderItem = ({ item }: { item: PhotoItem }) => (
    <TouchableOpacity onPress={() => navigation.navigate('Preview', { photoUri: item.uri })}>
      <Image source={{ uri: item.uri }} style={styles.thumbnail} />
    </TouchableOpacity>
  );

  useEffect(() => {
    loadPhotos();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList 
        data={photos} 
        keyExtractor={(_, index) => index.toString()} 
        renderItem={renderItem} 
        numColumns={3} 
      />
      <Button title="Back to Camera" onPress={() => navigation.navigate('Camera')} containerStyle={styles.buttonSpacing} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  thumbnail: { width: 100, height: 100, margin: 5, borderRadius: 8 },
  buttonSpacing: { marginTop: 16 },
});

export default GalleryScreen;
