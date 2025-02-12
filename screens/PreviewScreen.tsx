// // MyPhotoApp/screens/PreviewScreen.tsx
// import React from 'react';
// import { View, Image, StyleSheet, Dimensions } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import Button from '../components/Button';
// import { StackNavigationProp } from '@react-navigation/stack';
// import { RootStackParamList } from '../App';

// type PreviewScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Preview'>;

// type Props = {
//   route: { params: { photoUri: string } };
//   navigation: PreviewScreenNavigationProp;
// };

// const PreviewScreen: React.FC<Props> = ({ route, navigation }) => {
//   const { photoUri } = route.params;

//   return (
//     <SafeAreaView style={styles.container}>
//       <Image source={{ uri: photoUri }} style={styles.image} resizeMode="contain" />
//       <Button title="Go to Gallery" onPress={() => navigation.navigate('Gallery')} containerStyle={styles.buttonSpacing} />
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: '#000', justifyContent: 'center', alignItems: 'center' },
//   image: { width: Dimensions.get('window').width, height: Dimensions.get('window').height / 2 },
//   buttonSpacing: { marginTop: 16 },
// });

// export default PreviewScreen;
// MyPhotoApp/screens/PreviewScreen.tsx
import React from 'react';
import { View, Image, StyleSheet, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '../components/Button';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../App';

type PreviewScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Preview'>;

type Props = {
  route: { params: { photoUri: string } };
  navigation: PreviewScreenNavigationProp;
};

const PreviewScreen: React.FC<Props> = ({ route, navigation }) => {
  const { photoUri } = route.params;

  // Function to save the captured photo using AsyncStorage.
  const savePhoto = async () => { 
    try {
      // Retrieve any previously saved photos
      const storedPhotos = await AsyncStorage.getItem('photos');
      const photos = storedPhotos ? JSON.parse(storedPhotos) : [];
      // Append the newly captured/selected photo
      photos.push({ uri: photoUri });
      // Save back the array to AsyncStorage
      await AsyncStorage.setItem('photos', JSON.stringify(photos));
      // Navigate to Gallery after successful saving
      navigation.navigate('Gallery');
    } catch (error) {
      console.error('Error saving photo:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image source={{ uri: photoUri }} style={styles.image} resizeMode="contain" />
      <Button title="Save Photo" onPress={savePhoto} containerStyle={styles.buttonSpacing} />
      <Button title="Go to Gallery" onPress={() => navigation.navigate('Gallery')} containerStyle={styles.buttonSpacing} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000', justifyContent: 'center', alignItems: 'center' },
  image: { width: Dimensions.get('window').width, height: Dimensions.get('window').height / 2 },
  buttonSpacing: { marginTop: 16 },
});

export default PreviewScreen;
